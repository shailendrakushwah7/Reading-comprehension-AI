/* ============================================
   RC Vocabulary AI - JavaScript
   Production Frontend Logic
   ============================================ */

// Configuration
const CONFIG = {
    // Use same origin as the served page so it works on mobile/production
    API_BASE: '',
    MAX_WORDS: 3000,
};

// State Management
const state = {
    currentPassage: '',
    vocabulary: [],
    stats: null,
    mode: localStorage.getItem('mode') || 'beginner',
    theme: localStorage.getItem('theme') || 'light',
    savedWords: JSON.parse(localStorage.getItem('savedWords')) || [],
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    applyTheme(state.theme);
    applyMode(state.mode);
    renderSavedWords();
});

/* ============================================
   Event Listeners Setup
   ============================================ */

function initializeEventListeners() {
    // Input
    const passageInput = document.getElementById('passageInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const searchInput = document.getElementById('searchInput');

    passageInput.addEventListener('input', (e) => {
        state.currentPassage = e.target.value;
        updateCharCount();
    });

    analyzeBtn.addEventListener('click', analyzePassage);

    // Tabs
    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Theme and Mode
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('modeToggle').addEventListener('click', toggleMode);

    // Actions
    document.getElementById('copyAllBtn').addEventListener('click', copyAllMeanings);
    document.getElementById('generateSummaryBtn').addEventListener('click', generateSummary);
    document.getElementById('generateQuizBtn').addEventListener('click', generateQuiz);
    document.getElementById('clearSavedBtn').addEventListener('click', clearSavedWords);

    // Search
    searchInput.addEventListener('input', (e) => {
        filterVocabulary(e.target.value);
    });

    // Modal
    document.getElementById('wordModal').addEventListener('click', closeModal);
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* ============================================
   Core Functionality
   ============================================ */

async function analyzePassage() {
    const passage = state.currentPassage.trim();

    if (!passage) {
        showToast('Please paste a passage to analyze', 'error');
        return;
    }

    if (passage.length > CONFIG.MAX_WORDS * 5) {
        showToast('Passage is too long. Maximum 15,000 characters.', 'error');
        return;
    }

    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.querySelector('.btn-text').style.display = 'none';
    analyzeBtn.querySelector('.btn-loading').style.display = 'inline-flex';

    try {
        const response = await fetch(`${CONFIG.API_BASE}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                passage,
                mode: state.mode,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to analyze passage');
        }

        const data = await response.json();
        state.vocabulary = data.vocabulary;
        state.stats = data.stats;

        showResults();
        renderVocabularyCards(data.vocabulary);
        renderHighlightedPassage(data.passage, data.vocabulary);
        updateStats(data.stats);

        showToast('Passage analyzed successfully!', 'success');
    } catch (error) {
        console.error('Analysis Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.querySelector('.btn-text').style.display = 'inline';
        analyzeBtn.querySelector('.btn-loading').style.display = 'none';
    }
}

/* ============================================
   Vocabulary Rendering
   ============================================ */

function renderVocabularyCards(vocabulary) {
    const container = document.getElementById('vocabCards');
    container.innerHTML = '';

    if (vocabulary.length === 0) {
        container.innerHTML = '<p class="text-center">No vocabulary words found.</p>';
        return;
    }

    vocabulary.forEach((item, index) => {
        const card = createVocabCard(item);
        container.appendChild(card);
    });

    // Add event listeners to new cards
    document.querySelectorAll('.vocab-card').forEach((card) => {
        card.addEventListener('click', () => {
            const wordData = JSON.parse(card.dataset.word);
            openWordModal(wordData);
        });
    });

    // Add listeners to action buttons
    document.querySelectorAll('.icon-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            const wordData = JSON.parse(btn.dataset.word);

            if (action === 'copy') {
                copyToClipboard(`${wordData.word}: ${wordData.meaning}`);
            } else if (action === 'save') {
                toggleSaveWord(wordData);
            } else if (action === 'pronounce') {
                pronounceWord(wordData.word);
            }
        });
    });
}

function createVocabCard(item) {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.dataset.word = JSON.stringify(item);

    const isSaved = state.savedWords.some(
        (w) => w.word.toLowerCase() === item.word.toLowerCase()
    );

    card.innerHTML = `
        <div class="vocab-card-header">
            <div class="vocab-word">${escapeHtml(item.word)}</div>
            <span class="difficulty-badge ${item.difficulty.toLowerCase()}">
                ${item.difficulty}
            </span>
        </div>
        <p class="vocab-meaning">${escapeHtml(item.meaning)}</p>
        <div class="vocab-actions-card">
            <button class="icon-btn" data-action="pronounce" data-word='${JSON.stringify(item)}' title="Pronounce">
                🔊
            </button>
            <button class="icon-btn ${isSaved ? 'saved' : ''}" data-action="save" data-word='${JSON.stringify(item)}' title="Save word">
                ${isSaved ? '❤️' : '🤍'}
            </button>
            <button class="icon-btn" data-action="copy" data-word='${JSON.stringify(item)}' title="Copy">
                📋
            </button>
        </div>
    `;

    return card;
}

function filterVocabulary(searchTerm) {
    const cards = document.querySelectorAll('.vocab-card');
    const term = searchTerm.toLowerCase();

    cards.forEach((card) => {
        const wordData = JSON.parse(card.dataset.word);
        const matches =
            wordData.word.toLowerCase().includes(term) ||
            wordData.meaning.toLowerCase().includes(term);

        card.style.display = matches ? '' : 'none';
    });
}

/* ============================================
   Highlighted Passage
   ============================================ */

function renderHighlightedPassage(passage, vocabulary) {
    const container = document.getElementById('highlightedPassage');

    let highlightedHtml = passage;
    const words = vocabulary.map((v) => v.word);

    // Sort by length (longest first) to avoid partial matching
    words.sort((a, b) => b.length - a.length);

    words.forEach((word) => {
        const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
        highlightedHtml = highlightedHtml.replace(regex, (match) => {
            return `<span class="highlighted-word" data-word="${escapeHtml(match)}">${match}</span>`;
        });
    });

    container.innerHTML = highlightedHtml;

    // Add click listeners to highlighted words
    document.querySelectorAll('.highlighted-word').forEach((span) => {
        span.addEventListener('click', () => {
            const word = span.dataset.word;
            const wordData = vocabulary.find(
                (v) => v.word.toLowerCase() === word.toLowerCase()
            );
            if (wordData) {
                openWordModal(wordData);
            }
        });
    });
}

/* ============================================
   Statistics
   ============================================ */

function updateStats(stats) {
    document.getElementById('totalWordsCard').textContent = stats.totalWords;
    document.getElementById('wordCountCard').textContent = stats.wordCount;
    document.getElementById('difficultyScoreCard').textContent = stats.difficultyScore;

    document.getElementById('difficultyBreakdown').innerHTML = `
        <span><span class="diff-easy">●</span> ${stats.easyCount}</span>
        <span><span class="diff-medium">●</span> ${stats.mediumCount}</span>
        <span><span class="diff-hard">●</span> ${stats.hardCount}</span>
    `;
}

/* ============================================
   Advanced Features
   ============================================ */

async function generateSummary() {
    const btn = document.getElementById('generateSummaryBtn');
    const summaryBox = document.getElementById('summaryBox');
    const summaryLoading = document.getElementById('summaryLoading');

    btn.style.display = 'none';
    summaryLoading.style.display = 'flex';

    try {
        const response = await fetch(`${CONFIG.API_BASE}/api/summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passage: state.currentPassage }),
        });

        const data = await response.json();

        summaryLoading.style.display = 'none';
        summaryBox.innerHTML = `<p>${escapeHtml(data.summary)}</p>`;
        summaryBox.style.display = 'block';
    } catch (error) {
        console.error('Summary Error:', error);
        showToast('Failed to generate summary', 'error');
        btn.style.display = 'block';
        summaryLoading.style.display = 'none';
    }
}

async function generateQuiz() {
    const btn = document.getElementById('generateQuizBtn');
    const container = document.getElementById('quizContainer');
    const btnLoading = btn.querySelector('.btn-loading');
    const btnText = btn.querySelector('span:first-child');

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';

    try {
        const response = await fetch(`${CONFIG.API_BASE}/api/quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vocabulary: state.vocabulary,
                passage: state.currentPassage,
            }),
        });

        const data = await response.json();
        renderQuiz(data.quiz);
        container.style.display = 'block';
        showToast('Quiz generated successfully!', 'success');
    } catch (error) {
        console.error('Quiz Error:', error);
        showToast('Failed to generate quiz', 'error');
    } finally {
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function renderQuiz(quiz) {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';

    quiz.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';

        questionDiv.innerHTML = `
            <div class="question-text">Question ${index + 1}: ${escapeHtml(q.question)}</div>
            <div class="question-options">
                ${q.options
                    .map(
                        (option, optIdx) => `
                    <button class="option" data-answer="${optIdx}" data-correct="${q.answer}">
                        ${escapeHtml(option)}
                    </button>
                `
                    )
                    .join('')}
            </div>
        `;

        container.appendChild(questionDiv);

        // Add event listeners to options
        questionDiv.querySelectorAll('.option').forEach((btn) => {
            btn.addEventListener('click', () => {
                const isCorrect = parseInt(btn.dataset.answer) === parseInt(btn.dataset.correct);
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');

                // Disable all options after selection
                btn.parentElement.querySelectorAll('.option').forEach((b) => {
                    b.disabled = true;
                });
            });
        });
    });
}

/* ============================================
   Saved Words
   ============================================ */

function toggleSaveWord(wordData) {
    const isSaved = state.savedWords.some(
        (w) => w.word.toLowerCase() === wordData.word.toLowerCase()
    );

    if (isSaved) {
        state.savedWords = state.savedWords.filter(
            (w) => w.word.toLowerCase() !== wordData.word.toLowerCase()
        );
    } else {
        state.savedWords.push(wordData);
    }

    localStorage.setItem('savedWords', JSON.stringify(state.savedWords));
    renderSavedWords();
    renderVocabularyCards(state.vocabulary);

    const message = isSaved ? 'Word removed from saved' : 'Word saved!';
    showToast(message, 'success');
}

function renderSavedWords() {
    const container = document.getElementById('savedWords');
    const savedSection = document.getElementById('savedSection');

    if (state.savedWords.length === 0) {
        savedSection.style.display = 'none';
        return;
    }

    savedSection.style.display = 'block';
    container.innerHTML = '';

    state.savedWords.forEach((word) => {
        const card = document.createElement('div');
        card.className = 'saved-word-card';

        card.innerHTML = `
            <div class="saved-word-info">
                <div class="saved-word-name">${escapeHtml(word.word)}</div>
                <div class="saved-word-meaning">${escapeHtml(word.meaning)}</div>
            </div>
            <button class="icon-btn" data-word='${JSON.stringify(word)}' onclick="event.stopPropagation()">
                ❤️
            </button>
        `;

        card.addEventListener('click', () => openWordModal(word));
        card.querySelector('.icon-btn').addEventListener('click', () => toggleSaveWord(word));

        container.appendChild(card);
    });
}

function clearSavedWords() {
    if (confirm('Are you sure you want to clear all saved words?')) {
        state.savedWords = [];
        localStorage.setItem('savedWords', JSON.stringify(state.savedWords));
        renderSavedWords();
        showToast('Saved words cleared', 'success');
    }
}

/* ============================================
   Modal
   ============================================ */

function openWordModal(wordData) {
    const modal = document.getElementById('wordModal');
    document.getElementById('modalWord').textContent = wordData.word;
    document.getElementById('modalMeaning').textContent = wordData.meaning;

    const exampleDiv = document.getElementById('modalExample');
    exampleDiv.innerHTML = '';

    const isSaved = state.savedWords.some(
        (w) => w.word.toLowerCase() === wordData.word.toLowerCase()
    );

    document.getElementById('saveWordBtn').textContent = isSaved ? '❤️ Saved' : '💾 Save Word';
    document.getElementById('saveWordBtn').onclick = () => {
        toggleSaveWord(wordData);
        modal.classList.remove('active');
    };

    document.getElementById('pronounceBtn').onclick = () => pronounceWord(wordData.word);

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('wordModal');
    modal.classList.remove('active');
}

/* ============================================
   UI Utilities
   ============================================ */

function switchTab(tabName) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.toggle('active', content.dataset.tab === tabName);
    });

    // Initialize tab-specific features
    if (tabName === 'summary') {
        const btn = document.getElementById('generateSummaryBtn');
        btn.style.display = state.vocabulary.length > 0 ? 'block' : 'none';
    } else if (tabName === 'quiz') {
        const btn = document.getElementById('generateQuizBtn');
        btn.style.display = state.vocabulary.length > 0 ? 'block' : 'none';
    }
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    applyTheme(state.theme);
}

function applyTheme(theme) {
    const icon = document.querySelector('.theme-icon');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.textContent = '🌙';
    }
}

function toggleMode() {
    state.mode = state.mode === 'beginner' ? 'advanced' : 'beginner';
    localStorage.setItem('mode', state.mode);
    applyMode(state.mode);

    if (state.vocabulary.length > 0) {
        showToast(`Switched to ${state.mode} mode. Re-analyze for new meanings.`, 'info');
    }
}

function applyMode(mode) {
    const btn = document.getElementById('modeToggle');
    btn.querySelector('.mode-text').textContent = mode === 'beginner' ? 'Beginner' : 'Advanced';
}

function showResults() {
    document.getElementById('statsSection').style.display = 'block';
    document.getElementById('tabsSection').style.display = 'block';
    switchTab('vocabulary');
}

function updateCharCount() {
    const count = state.currentPassage.length;
    document.getElementById('charCount').textContent = count;
}

/* ============================================
   Utilities
   ============================================ */

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    });
}

function copyAllMeanings() {
    const text = state.vocabulary
        .map((v) => `${v.word}: ${v.meaning}`)
        .join('\n');
    copyToClipboard(text);
}

function pronounceWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
        showToast('Pronouncing...', 'info');
    } else {
        showToast('Speech synthesis not supported', 'error');
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ============================================
   Error Handling
   ============================================ */

window.addEventListener('error', (e) => {
    console.error('Global Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
