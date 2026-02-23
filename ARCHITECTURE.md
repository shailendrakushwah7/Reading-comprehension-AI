# 🏗️ RC Vocabulary AI - Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Frontend)                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  HTML (index.html)                                   │   │
│  │  - Structure and layout                              │   │
│  │  - Modal templates                                   │   │
│  │  - Responsive containers                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CSS (styles.css)                                    │   │
│  │  - Premium design system                             │   │
│  │  - Dark mode support                                 │   │
│  │  - Responsive components                             │   │
│  │  - CSS Variables for theming                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  JavaScript (script.js)                              │   │
│  │  - Event handling                                    │   │
│  │  - API communication                                 │   │
│  │  - DOM manipulation                                  │   │
│  │  - Local storage management                          │   │
│  │  - User interactions                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕ HTTP                              │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              Node.js Server (Backend)                        │
│              (server.js)                                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express.js - HTTP Server                            │   │
│  │  - API routes (/api/*)                               │   │
│  │  - CORS handling                                      │   │
│  │  - Static file serving                               │   │
│  │  - Middleware                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers                                          │   │
│  │  - analyze() - vocabulary extraction                  │   │
│  │  - quiz() - quiz generation                          │   │
│  │  - summary() - summarization                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Groq API Client (groq-sdk)                          │   │
│  │  - API communication                                 │   │
│  │  - Model: llama-3.3-70b-versatile                    │   │
│  │  - JSON response parsing                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕ API Call                           │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│            Groq Cloud (AI Processing)                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Model: llama-3.3-70b-versatile                      │   │
│  │  - Vocabulary extraction                             │   │
│  │  - Meaning generation                                │   │
│  │  - Quiz creation                                     │   │
│  │  - Summarization                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Vocabulary Analysis Flow
```
User Input (Passage)
         ↓
Validation (length, content)
         ↓
Frontend (script.js)
         ↓
POST /api/analyze (with passage + mode)
         ↓
Backend (server.js)
         ↓
Format System Prompt
         ↓
Groq API Call
         ↓
Parse JSON Response
         ↓
Calculate Statistics
         ↓
Return JSON Response
         ↓
Frontend (script.js)
         ↓
Render Vocabulary Cards
         ↓
Update Statistics
         ↓
Show Results
```

---

## File Structure & Responsibilities

### Backend (server.js)
```javascript
// Core Responsibilities:
- HTTP server setup with Express
- CORS middleware configuration
- Static file serving
- API route handlers
- Groq API integration
- Response formatting
- JSON validation
- Error handling
```

**Key Functions:**
- `app.post('/api/analyze')` - Main vocabulary extraction
- `app.post('/api/quiz')` - Quiz generation
- `app.post('/api/summary')` - Passage summarization
- `calculateDifficultyScore()` - Statistics calculation

---

### Frontend HTML (index.html)
```html
<!-- Core Sections:
- Header with logo and controls
- Input section with textarea
- Statistics dashboard
- Tab navigation
- Vocabulary cards container
- Highlighted passage container
- Summary section
- Quiz container
- Saved words section
- Modal dialogs
- Toast notifications
-->
```

**Key Elements:**
- `#passageInput` - Main textarea for passage input
- `#analyzeBtn` - Analysis trigger button
- `#vocabCards` - Container for vocabulary cards
- `#wordModal` - Word details modal
- `#highlightedPassage` - Highlighted text display
- `#quizContainer` - Quiz questions display

---

### Frontend CSS (styles.css)
```css
/* Structure:
- CSS Variables (theming)
- Dark mode support
- Component styles
- Responsive breakpoints
- Animations and transitions
- Accessibility features
*/
```

**Design System:**
- Color variables: primary, accent, danger, success, etc.
- Spacing scale: xs, sm, md, lg, xl, 2xl
- Typography scale: xs to 3xl
- Shadow system: sm to xl
- Border radius: sm to 2xl
- Transitions: fast (150ms), base (200ms), slow (300ms)

---

### Frontend JavaScript (script.js)
```javascript
/* Core Responsibilities:
- Event listener management
- API communication
- DOM manipulation
- State management
- Local storage handling
- User interaction logic
- Utility functions
- Error handling
*/
```

**Key Functions:**
- `analyzePassage()` - Trigger analysis API call
- `renderVocabularyCards()` - Display vocabulary
- `renderHighlightedPassage()` - Show highlighted text
- `generateQuiz()` - Create quiz from vocabulary
- `generateSummary()` - Summarize passage
- `toggleSaveWord()` - Save/unsave vocabulary
- `switchTab()` - Tab navigation
- `toggleTheme()` - Dark mode toggle
- `toggleMode()` - Beginner/Advanced mode

---

## State Management

### Frontend State (client-side)
```javascript
const state = {
    currentPassage: '',          // Currently pasted passage
    vocabulary: [],              // Extracted vocabulary words
    stats: null,                 // Statistics object
    mode: 'beginner',            // Learning mode
    theme: 'light',              // Color scheme
    savedWords: [],              // User's saved vocabulary
};

// Persistence:
- localStorage for theme, mode, savedWords
- Session memory for currentPassage, vocabulary, stats
```

### Backend State (stateless)
- No persistent state on backend
- Each request processed independently
- Session-less architecture
- Scalable design

---

## API Specifications

### POST /api/analyze
**Purpose**: Analyze passage and extract vocabulary

**Request Body:**
```json
{
    "passage": "string (max 15000 chars)",
    "mode": "beginner|advanced"
}
```

**Response:**
```json
{
    "vocabulary": [
        {
            "word": "string",
            "meaning": "string",
            "difficulty": "Easy|Medium|Hard"
        }
    ],
    "stats": {
        "totalWords": number,
        "wordCount": number,
        "easyCount": number,
        "mediumCount": number,
        "hardCount": number,
        "difficultyScore": number (0-100)
    },
    "passage": "string"
}
```

**Process:**
1. Validate passage length and content
2. Format system prompt with mode instruction
3. Call Groq API with passage
4. Parse JSON response
5. Validate vocabulary array
6. Calculate statistics
7. Return formatted response

---

### POST /api/quiz
**Purpose**: Generate multiple-choice questions

**Request Body:**
```json
{
    "vocabulary": [
        { "word": "string", "meaning": "string", "difficulty": "string" }
    ],
    "passage": "string"
}
```

**Response:**
```json
{
    "quiz": [
        {
            "question": "string",
            "options": ["option1", "option2", "option3", "option4"],
            "answer": 0-3
        }
    ]
}
```

---

### POST /api/summary
**Purpose**: Generate passage summary

**Request Body:**
```json
{
    "passage": "string"
}
```

**Response:**
```json
{
    "summary": "string (2-3 sentences)"
}
```

---

## System Prompt Engineering

### Base Prompt Structure
```
[Role Definition]
"You are an expert English teacher..."

[Task Instructions]
"Your task: Analyze entire passage..."

[Step-by-Step Process]
"Step 1: Analyze..."
"Step 2: Understand..."

[Output Format]
"Return ONLY valid JSON array..."

[Rules & Constraints]
"Rules: Meanings must be extremely simple..."
```

### Mode-Specific Instructions
```
Beginner Mode Addition:
"Mode: BEGINNER - Use only very simple words in meanings"

Advanced Mode Addition:
"Mode: ADVANCED - Can include slightly technical terms"
```

---

## Error Handling Strategy

### Frontend Error Handling
```javascript
try {
    // API call
    const response = await fetch(url);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    // Process response
} catch (error) {
    showToast(`Error: ${error.message}`, 'error');
    console.error('Error:', error);
    // Reset UI state
}
```

### Backend Error Handling
```javascript
- HTTP Status Codes: 400, 500
- Error Messages: User-friendly descriptions
- Logging: Console output for debugging
- JSON Error Response: { error: "message", details: "info" }
```

---

## Performance Optimization

### Frontend Optimization
- Event delegation for card listeners
- Debounced search filtering
- Lazy initialization of features
- CSS animations for smooth transitions
- Minimal DOM reflows

### Backend Optimization
- Temperature: 0.3 (consistent results)
- Max tokens: 2000 (reasonable limit)
- Response parsing: Efficient regex matching
- No database overhead
- Minimal processing

### Network Optimization
- Single API call per analysis
- Reasonable payload sizes
- JSON compression ready
- No redundant requests
- Error retry capability

---

## Security Considerations

### Frontend Security
- HTML escaping for user input
- XSS prevention through text content
- No eval() or dynamic code execution
- Safe localStorage usage
- CORS policy enforcement

### Backend Security
- Input validation (length, type)
- API key not exposed to frontend
- Environment variable protection
- CORS configuration
- No sensitive data logging

### API Key Management
```
!! NEVER COMMIT .env FILE !!
!! KEEP API KEYS PRIVATE !!

Secure Storage:
- Use environment variables
- Store in secrets management
- Never hardcode in source
- Rotate regularly
```

---

## Database Schema (N/A - Stateless Architecture)

This application doesn't use a database. All data is:
- **Temporary**: Analyzed passage and results
- **Local**: User's saved words (browser storage)
- **Configuration**: Mode and theme preferences

If you need persistence:
1. Add MongoDB or PostgreSQL
2. Create user authentication
3. Store saved words in database
4. Sync across devices
5. Track learning progress

---

## Deployment Architecture

### Development Environment
```
Local Machine
├── Node.js server (localhost:3000)
├── Frontend (http://localhost:3000)
├── Hot reload (nodemon)
└── Console logging
```

### Production Environment
```
CDN / Static Host
└── Serve frontend files
    └── Cloudflare/AWS S3

Backend Host (Vercel/Heroku/Railway)
├── Node.js server
├── Environment variables
├── Error logging
└── Performance monitoring
```

---

## Technology Stack Deep Dive

### Frontend Stack
- **HTML5**: Semantic markup, ARIA attributes
- **CSS3**: Custom properties, Grid, Flexbox, Gradients
- **JavaScript ES6+**: Async/await, Fetch API, Event Listeners
- **Web APIs**: LocalStorage, SpeechSynthesis, Clipboard

### Backend Stack
- **Node.js**: Runtime (v16+)
- **Express.js**: HTTP server framework
- **Groq SDK**: AI model integration
- **CORS**: Cross-origin support
- **Dotenv**: Configuration management

### AI Integration
- **Model**: llama-3.3-70b-versatile (Groq)
- **API**: REST endpoints
- **Format**: JSON request/response
- **Processing**: Cloud-based
- **Speed**: < 2 seconds typical

---

## Extension Points

### Adding New Features

#### 1. New Analysis Type
```javascript
// In server.js
app.post('/api/new-feature', async (req, res) => {
    // Your logic here
});

// In script.js
async function newFeature() {
    const response = await fetch(`${CONFIG.API_BASE}/api/new-feature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* data */ })
    });
    // Handle response
}
```

#### 2. New Vocabulary Card Field
```javascript
// In server.js - Update SYSTEM_PROMPT

// In script.js - Update createVocabCard()

// In styles.css - Add new styling
```

#### 3. New Tab/Feature
```javascript
// In index.html - Add tab button and content div

// In script.js - Add tab switching logic

// In styles.css - Add tab-specific styling
```

---

## Testing Strategy (Future)

### Unit Tests
```javascript
// Test individual functions
- parseVocabulary()
- calculateDifficultyScore()
- filterVocabulary()
- escapeHtml()
```

### Integration Tests
```javascript
// Test API endpoints
- POST /api/analyze
- POST /api/quiz
- POST /api/summary
- GET /api/health
```

### End-to-End Tests
```javascript
// Test complete workflows
- Paste passage → Analyze → View results
- Save word → Search → Find saved
- Generate quiz → Answer → Check results
```

---

## Monitoring & Debugging

### Frontend Debugging
- Browser DevTools (F12)
- Console logs for state
- Network tab for API calls
- Application tab for storage
- Performance tab for optimization

### Backend Debugging
- Terminal logs during development
- Error stack traces
- API response format validation
- Input parameter checking

### Production Monitoring
- Error tracking (Sentry)
- Performance monitoring (NewRelic)
- API latency tracking
- User interaction analytics

---

## Scaling Considerations

### Current Architecture Limits
- No user database (can add)
- No authentication (can add)
- No caching mechanism (can add)
- Single server instance (can load balance)

### Scaling Path
1. Add user authentication
2. Implement database (MongoDB/PostgreSQL)
3. Add Redis caching for common passages
4. Implement load balancing
5. Use CDN for static assets
6. Add API rate limiting
7. Implement analytics

---

## Maintenance & Support

### Code Maintenance
- Keep dependencies updated
- Monitor Groq API changes
- Test after updates
- Maintain documentation

### Performance Maintenance
- Monitor API response times
- Track error rates
- Analyze user behavior
- Optimize bottlenecks

### User Support
- Document common issues
- Provide setup tutorials
- Create feature guides
- Maintain FAQ section

---

## Future Roadmap

### Phase 1 (Current)
- ✅ Basic vocabulary extraction
- ✅ Core features implemented
- ✅ Single-user support

### Phase 2 (Next)
- [ ] User accounts
- [ ] Cloud sync
- [ ] Progress tracking
- [ ] Learning recommendations

### Phase 3 (Future)
- [ ] Mobile apps
- [ ] AI-powered tutoring
- [ ] Practice tests
- [ ] Community features

---

**This architecture is designed for simplicity, scalability, and performance. Modify as needed for your use case.** 🚀
