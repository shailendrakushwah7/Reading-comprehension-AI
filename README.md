# RC Vocabulary AI 📚

> **Production-Grade AI Web Application for Reading Comprehension Vocabulary Learning**

An elite educational technology platform designed for students preparing for competitive exams (CAT, GMAT, GRE, UPSC, Bank Exams). Powered by Groq API with llama-3.3-70b-versatile.

## 🎯 Features

### Core Features
- ✅ **Intelligent Vocabulary Extraction** - AI automatically detects important vocabulary words
- ✅ **Context-Aware Meanings** - Simple, student-friendly definitions matched to passage context
- ✅ **Difficulty Classification** - Easy/Medium/Hard difficulty levels
- ✅ **Highlighted Passage** - Visual highlighting of vocabulary words in original passage
- ✅ **Statistics Dashboard** - Word count, difficulty score, breakdown by level

### Advanced Features
- ✅ **Student Mode Toggle** - Beginner/Advanced modes with simplified/technical meanings
- ✅ **Word Pronunciation** - Built-in text-to-speech for all vocabulary words
- ✅ **Quiz Generation** - AI-powered multiple choice quizzes
- ✅ **Passage Summarization** - AI-generated summaries in simple language
- ✅ **Save Words Locally** - Persistent storage of important vocabulary
- ✅ **Dark Mode** - Eye-friendly dark theme
- ✅ **Search & Filter** - Quick vocabulary search
- ✅ **Copy Functionality** - Export vocabulary meanings

### Design Highlights
- 🎨 **Apple-Inspired Design** - Clean, minimal, premium aesthetic
- 📱 **Mobile Responsive** - Perfect experience on all devices
- ⚡ **Smooth Animations** - Modern transitions and interactions
- 🌙 **Dark Mode Support** - Eye-comfortable night mode
- ♿ **Accessibility First** - WCAG compliant

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Groq API Key (Free at https://console.groq.com)

### Installation

1. **Clone/Download the project**
```bash
cd rc-vocabulary-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

4. **Configure Groq API Key**
- Get your free API key from [Groq Console](https://console.groq.com)
- Add it to `.env`:
```
GROQ_API_KEY=your_api_key_here
```

5. **Start the development server**
```bash
npm start
```

6. **Open in browser**
```
http://localhost:3000
```

## 📖 How to Use

### Basic Workflow

1. **Paste RC Passage** - Copy any reading comprehension passage into the text box
2. **Analyze** - Click "Analyze Passage" button
3. **Explore Results** - View vocabulary cards with meanings
4. **Interact** - Copy meanings, save words, generate quizzes
5. **Review** - Switch between vocabulary, highlighted passage, summary, and quiz tabs

### Features Breakdown

#### Vocabulary Extraction
- Automatically identifies 8-15 important vocabulary words
- Ignores common words (the, is, and, etc.)
- Provides context-specific meanings (not generic dictionary definitions)

#### Difficulty Levels
- **Easy** - Important but somewhat familiar words
- **Medium** - Advanced words relevant to competitive exams
- **Hard** - Rare, advanced words

#### Modes
- **Beginner Mode** - Ultra-simple meanings (7-8th grade level)
- **Advanced Mode** - Slightly technical but still accessible

#### Quiz Generation
- AI creates multiple-choice questions from vocabulary
- 4 options per question
- Instant feedback on answers

#### Pronunciation
- Click 🔊 button to pronounce any word
- Helps with verbal preparation for exams

## 🏗️ Project Structure

```
rc-vocabulary-ai/
├── server.js              # Node.js backend with Groq API integration
├── index.html             # Frontend markup
├── styles.css             # Modern, responsive CSS
├── script.js              # Frontend JavaScript logic
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid/Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Web APIs** - Clipboard, Speech Synthesis, Local Storage

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Groq SDK** - AI API integration
- **CORS** - Cross-origin resource sharing

### AI Model
- **Groq API** 
- **Model**: llama-3.3-70b-versatile
- **Response Time**: < 2 seconds typically

## 🔧 Configuration

### Environment Variables
Edit `.env` file:

```env
# Required
GROQ_API_KEY=your_api_key

# Optional
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Customization

#### Change Primary Color
Edit `styles.css`:
```css
--primary: #your-color;
--accent: #your-accent;
```

#### Adjust Model
Edit `server.js` - Change model name in API calls:
```javascript
model: 'llama-3.3-70b-versatile'  // Change this
```

#### Modify System Prompt
Edit `server.js` - `SYSTEM_PROMPT` variable for different behavior

## 📊 Performance

- **Response Time**: < 2 seconds for passages up to 3000 words
- **API Calls**: 1 per analysis, 1 per quiz, 1 per summary
- **Supported Passage Length**: Up to 15,000 characters
- **Max Vocabulary Words**: 15 words per analysis

## 🔐 Security & Privacy

- **Frontend**: All processing logic runs in browser
- **Backend**: No data storage - stateless architecture
- **API**: Groq API handles all AI processing
- **Local Storage**: Saved words stored only in browser
- **CORS**: Configurable for production deployment

## 🎓 Perfect For

- **CAT Preparation** - MBA entrance exam
- **GMAT** - Graduate Management Admission Test
- **GRE** - Graduate Record Examination
- **UPSC** - Union Public Service Commission
- **Bank Exams** - PO, Clerk, SO positions
- **General English** - Academic and competitive exam preparation

## 🚀 Production Deployment

### Prerequisites for Deployment
1. Node.js hosted environment (Vercel, Heroku, AWS, DigitalOcean)
2. Groq API Key stored in environment variables
3. HTTPS enabled

### Deployment Steps
1. Update `CORS_ORIGIN` in `.env` for your production domain
2. Set `NODE_ENV=production`
3. Deploy to your hosting platform
4. Configure environment variables on hosting platform

### Example: Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Example: Heroku Deployment
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variable
heroku config:set GROQ_API_KEY=your_key

# Deploy
git push heroku main
```

## 📈 Future Enhancements

- [ ] User authentication & cloud sync
- [ ] Personalized learning paths
- [ ] Spaced repetition system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] PDF passage upload
- [ ] Export to Anki flashcards
- [ ] Collaborative learning features
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### Issue: "Failed to analyze passage"
**Solution**: Check if Groq API key is valid and not expired

### Issue: CORS error
**Solution**: 
- Make sure server is running on correct port
- Check CORS_ORIGIN in .env matches your frontend URL

### Issue: Slow response
**Solution**: 
- Groq service might be busy
- Try again after few seconds
- Check your internet connection

### Issue: Speech synthesis not working
**Solution**: 
- Browser might not support Web Speech API
- Try Chrome, Firefox, or Safari
- Check if microphone permissions are granted

## 📝 API Endpoints

### POST /api/analyze
Analyzes passage for vocabulary

**Request:**
```json
{
  "passage": "The company's exponential growth disrupted traditional markets...",
  "mode": "beginner"
}
```

**Response:**
```json
{
  "vocabulary": [
    {
      "word": "exponential",
      "meaning": "growing very fast over time",
      "difficulty": "Medium"
    }
  ],
  "stats": {
    "totalWords": 12,
    "wordCount": 250,
    "difficultyScore": 65,
    "easyCount": 5,
    "mediumCount": 5,
    "hardCount": 2
  },
  "passage": "The company's exponential growth..."
}
```

### POST /api/quiz
Generates quiz from vocabulary

**Request:**
```json
{
  "vocabulary": [...],
  "passage": "..."
}
```

### POST /api/summary
Generates passage summary

**Request:**
```json
{
  "passage": "..."
}
```

**Response:**
```json
{
  "summary": "The company experienced rapid growth..."
}
```

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@rcvocabularyai.com

## 🎉 Acknowledgments

Built with:
- ❤️ Inspired by Apple, Duolingo, Notion, ChatGPT
- 🧠 Education technology expertise
- 🤖 Cutting-edge AI from Groq
- 🎨 Modern web technologies

---

**Made for students. By people who understand learning.**

*RC Vocabulary AI - Learn Smart. Score Better.* 📚✨
