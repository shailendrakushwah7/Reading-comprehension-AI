# 🚀 RC Vocabulary AI - Setup Guide

## Complete Setup Instructions

### Step 1: Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js 16+ installed ([Download](https://nodejs.org))
- ✅ A Groq API Key (Free, [Sign up here](https://console.groq.com))
- ✅ A terminal/command prompt
- ✅ A text editor (VS Code, Sublime, etc.)

### Step 2: Get Your Groq API Key (2 minutes)

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up with email or Google account
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the key (it will look like: `gsk_xxxxxxxxxxxxx`)

**⚠️ IMPORTANT**: Keep this key private! Never share it publicly.

### Step 3: Project Setup

#### On Windows (PowerShell or Command Prompt):
```powershell
# Navigate to project folder
cd "C:\Users\YourUsername\Downloads\rc passage"

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env file (use Notepad or any editor)
notepad .env
```

#### On Mac/Linux (Terminal):
```bash
# Navigate to project folder
cd ~/Downloads/rc\ passage

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
nano .env
```

### Step 4: Configure Environment Variables

Open `.env` file and update:

```env
GROQ_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=development
```

**Example:**
```env
GROQ_API_KEY=gsk_abcdef123456789xyz
PORT=3000
NODE_ENV=development
```

Save the file.

### Step 5: Start the Application

#### Windows (PowerShell):
```powershell
npm start
```

#### Mac/Linux (Terminal):
```bash
npm start
```

**Expected Output:**
```
RC Vocabulary AI Server running on port 3000
Environment: development
API Key configured: true
```

### Step 6: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the RC Vocabulary AI interface

🎉 **You're ready!** Start pasting passages and analyzing vocabulary.

---

## 📱 First Time Usage

### Test the Application

**Example Passage to Test:**
```
The company's exponential growth disrupted traditional market structures. 
Their innovative approach was unprecedented in the industry. 
This paradigm shift necessitated comprehensive restructuring of operations.
```

**Expected Results:**
- Should extract 8-15 words like: exponential, disrupted, traditional, innovative, unprecedented, paradigm, paradigm shift, comprehensive, etc.
- Each word gets a simple meaning and difficulty level
- You can copy, save, and learn these words

### Try Each Feature

1. **Basic Analysis** - Paste a passage and click Analyze
2. **Highlighted Passage** - Switch to "Highlighted Passage" tab
3. **Save Words** - Click heart icon to save important words
4. **Copy Meanings** - Click copy icon on vocabulary cards
5. **Quiz** - Go to Quiz tab and generate a quiz
6. **Summary** - Go to Summary tab and generate summary
7. **Dark Mode** - Click moon icon in header
8. **Beginner Mode** - Click "Beginner" button to switch modes

---

## 🔧 Development Setup (For Developers)

### Install Development Tools

```bash
npm install --save-dev nodemon
```

### Run in Development Mode

```bash
npm run dev
```

This automatically restarts the server when you make code changes.

### File Structure for Development

```
rc-vocabulary-ai/
├── server.js           # Modify API logic here
├── index.html          # Modify HTML structure
├── styles.css          # Modify styles and design
├── script.js           # Modify frontend logic
├── package.json        # Manage dependencies
├── .env                # Store secret keys
└── README.md           # Documentation
```

---

## 📊 Groq API Pricing & Limits

### Free Tier
- ✅ **Cost**: Completely FREE
- ✅ **Requests/Day**: Limited (usually 100-1000 depending on current quota)
- ✅ **Model**: llama-3.3-70b-versatile available
- ✅ **Response Time**: < 2 seconds typically

### To Increase Usage
1. Go to [Groq Console](https://console.groq.com)
2. Go to Settings → Billing
3. Add payment method (optional for higher limits)
4. Request higher quota

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm: command not found"
**Problem**: Node.js not installed
**Solution**: 
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart terminal after installation

### Issue 2: "Cannot find module 'express'"
**Problem**: Dependencies not installed
**Solution**: 
```bash
npm install
```

### Issue 3: "Error: ENOENT: no such file or directory, .env"
**Problem**: .env file doesn't exist
**Solution**:
```bash
cp .env.example .env
```
Then add your Groq API key

### Issue 4: "API key is invalid"
**Problem**: Wrong Groq API key
**Solution**:
1. Get fresh API key from [Groq Console](https://console.groq.com)
2. Update .env file
3. Restart server

### Issue 5: "Connection refused on localhost:3000"
**Problem**: Server not running
**Solution**:
```bash
npm start
```
Check terminal for errors

### Issue 6: "CORS error" in browser console
**Problem**: Frontend and backend URL mismatch
**Solution**: 
- Make sure server is running on port 3000
- Browser is accessing http://localhost:3000
- Check .env CORS_ORIGIN setting

---

## 🚀 Production Deployment

### Option 1: Vercel (Recommended for Beginners)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configure environment variable:
- Vercel Dashboard → Settings → Environment Variables
- Add: `GROQ_API_KEY=your_key`

### Option 2: Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Import from GitHub
4. Add environment variables
5. Deploy

### Option 3: Heroku (Limited Free Tier)

```bash
heroku login
heroku create your-app-name
heroku config:set GROQ_API_KEY=your_key
git push heroku main
```

### Environment Variables for Production

Create a `.env` file on your hosting platform:
```
GROQ_API_KEY=your_actual_key
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
```

---

## 📚 Learning Resources

### For Understanding the Code

1. **Express.js Documentation**: [expressjs.com](https://expressjs.com)
2. **Groq API Docs**: [console.groq.com/docs](https://console.groq.com/docs)
3. **JavaScript Guide**: [javascript.info](https://javascript.info)
4. **Web APIs**: [MDN Web Docs](https://developer.mozilla.org)

### To Modify the Application

- **Change AI Model**: Edit `server.js` line ~14
- **Change Color Scheme**: Edit `styles.css` CSS variables
- **Add New Features**: Edit `server.js` and `script.js`
- **Customize Prompt**: Edit `SYSTEM_PROMPT` in `server.js`

---

## 💡 Tips for Best Results

1. **Use Exam-Level Passages**: Works best with challenging reading material
2. **Keep Passages 100-1500 Words**: Optimal range for accuracy
3. **Use Beginner Mode First**: Then advance to Advanced mode
4. **Save Important Words**: Use the save feature (❤️) for revision
5. **Generate Quizzes**: After analyzing to reinforce learning
6. **Use Different Passages**: Variety helps build vocabulary

---

## ✅ Verification Checklist

Before you start analyzing:

- [ ] Node.js installed (`node --version` shows version)
- [ ] Dependencies installed (`npm list express` shows installed)
- [ ] .env file exists with GROQ_API_KEY
- [ ] Server running (`npm start` shows "running on port 3000")
- [ ] Browser shows app at http://localhost:3000
- [ ] Can paste text in input box
- [ ] Analyze button is clickable

---

## 🎯 Next Steps

1. **Test with Sample Passage**: Use the example in "First Time Usage"
2. **Explore Features**: Try all tabs and buttons
3. **Save Passages**: Use saved words for revision
4. **Share with Friends**: Perfect for exam preparation groups
5. **Deploy to Cloud**: Share with the world!

---

## 📞 Getting Help

If you get stuck:

1. **Check Errors**: Look in browser console (F12 → Console tab)
2. **Check Terminal**: See what the server is reporting
3. **Read README.md**: Full documentation of features
4. **Check .env**: Ensure GROQ_API_KEY is correct
5. **Restart**: Kill server (Ctrl+C) and start again

---

**Ready to revolutionize vocabulary learning? Let's go! 🚀📚**
