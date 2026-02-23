const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// System prompt for vocabulary extraction
const SYSTEM_PROMPT = `You are an expert English teacher specializing in vocabulary for competitive exams (CAT, GMAT, GRE, UPSC).

Your task:
1. Analyze the entire passage carefully
2. Understand the theme and context
3. Identify IMPORTANT vocabulary words (ignore: the, is, at, was, and, or, for, in, on, etc. and common words)
4. Provide contextual meanings that match the passage context, NOT generic dictionary meanings
5. For each word, assign difficulty level: Easy (basic but important), Medium, or Hard (advanced/rare)

Return ONLY valid JSON array, nothing else:
[
  {"word": "word1", "meaning": "simple meaning matching passage context", "difficulty": "Easy|Medium|Hard"},
  {"word": "word2", "meaning": "simple meaning matching passage context", "difficulty": "Easy|Medium|Hard"}
]

Rules:
- Meanings must be extremely simple and student-friendly (8th grade level vocabulary)
- Ignore common/basic words
- Extract 8-15 words maximum per passage
- Difficulty based on how advanced/rare the word is
- Preserve original word form as it appears in passage
- Meanings must be 1 sentence maximum`;

/**
 * Analyze passage for vocabulary words
 */
app.post('/api/analyze', async (req, res) => {
  try {
    const { passage, mode } = req.body;

    if (!passage || passage.trim().length === 0) {
      return res.status(400).json({ error: 'Passage cannot be empty' });
    }

    if (passage.length > 3000 * 5) {
      return res.status(400).json({ error: 'Passage too long (max 15000 characters)' });
    }

    // Adjust prompt based on mode
    let modeInstruction = '';
    if (mode === 'beginner') {
      modeInstruction = '\nMode: BEGINNER - Use only very simple words in meanings (suitable for 7-8th grade)';
    } else if (mode === 'advanced') {
      modeInstruction = '\nMode: ADVANCED - Can include slightly technical terms but still keep meanings simple';
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT + modeInstruction,
        },
        {
          role: 'user',
          content: `Analyze this RC passage:\n\n${passage}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse JSON response
    let vocabulary;
    try {
      // Extract JSON from response (handles cases where there's extra text)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }
      vocabulary = JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('JSON Parse Error:', error, 'Content:', content);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: error.message 
      });
    }

    // Validate and clean response
    vocabulary = vocabulary.filter(v => v.word && v.meaning).map(v => ({
      word: v.word.trim(),
      meaning: v.meaning.trim(),
      difficulty: v.difficulty || 'Medium',
    }));

    // Calculate statistics
    const stats = {
      totalWords: vocabulary.length,
      easyCount: vocabulary.filter(v => v.difficulty === 'Easy').length,
      mediumCount: vocabulary.filter(v => v.difficulty === 'Medium').length,
      hardCount: vocabulary.filter(v => v.difficulty === 'Hard').length,
      wordCount: passage.split(/\s+/).length,
      difficultyScore: calculateDifficultyScore(vocabulary),
    };

    res.json({
      vocabulary,
      stats,
      passage,
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze passage',
      details: error.message 
    });
  }
});

/**
 * Generate quiz from vocabulary
 */
app.post('/api/quiz', async (req, res) => {
  try {
    const { vocabulary, passage } = req.body;

    if (!vocabulary || vocabulary.length === 0) {
      return res.status(400).json({ error: 'No vocabulary to create quiz' });
    }

    const vocabList = vocabulary.map(v => `${v.word}: ${v.meaning}`).join('\n');

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are creating a quiz for students learning vocabulary. Create multiple choice questions.
Return ONLY valid JSON array:
[
  {"question": "What does 'word' mean?", "options": ["option1", "option2", "option3", "correct"], "answer": 3}
]
- Each question should have 4 options
- Answer index is 0-3
- Keep questions simple and based on the vocabulary meanings provided`,
        },
        {
          role: 'user',
          content: `Create 5 quiz questions from these vocabulary words:\n${vocabList}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content.trim();
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const quiz = JSON.parse(jsonMatch[0]);

    res.json({ quiz });
  } catch (error) {
    console.error('Quiz Error:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

/**
 * Generate passage summary
 */
app.post('/api/summary', async (req, res) => {
  try {
    const { passage } = req.body;

    if (!passage || passage.trim().length === 0) {
      return res.status(400).json({ error: 'Passage cannot be empty' });
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'Summarize the passage in 2-3 sentences using simple language suitable for students.',
        },
        {
          role: 'user',
          content: `Summarize this passage:\n\n${passage}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const summary = response.choices[0].message.content.trim();
    res.json({ summary });
  } catch (error) {
    console.error('Summary Error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

/**
 * Calculate difficulty score (0-100)
 */
function calculateDifficultyScore(vocabulary) {
  if (vocabulary.length === 0) return 0;
  const weights = { Easy: 1, Medium: 2, Hard: 3 };
  const totalScore = vocabulary.reduce((sum, v) => sum + (weights[v.difficulty] || 2), 0);
  return Math.round((totalScore / (vocabulary.length * 3)) * 100);
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RC Vocabulary AI Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Key configured: ${!!process.env.GROQ_API_KEY}`);
});
