# ⚡ RC Vocabulary AI - Quick Start (2-Minute Setup)

## 🚀 Super Fast Setup

### Step 1: Get Dependencies (1 minute)
```bash
npm install
```

### Step 2: Get Groq API Key (1 minute)
1. Go to https://console.groq.com
2. Sign up if needed
3. Copy your API key
4. Create `.env` file:
```
GROQ_API_KEY=your_key_here
```

### Step 3: Start Server (30 seconds)
```bash
npm start
```

### Step 4: Open App (30 seconds)
Go to: **http://localhost:3000**

**✅ Done! You're ready to use RC Vocabulary AI**

---

## 📖 Quick Usage

1. **Paste a passage** in the text box
2. **Click "Analyze Passage"** button
3. **View vocabulary** with meanings
4. **Try features**: Quiz, Summary, Save Words, Dark Mode

---

## 📚 Test Passage

Paste this to test:
```
The government's unprecedented fiscal stimulus disrupted traditional economic models. 
Their innovative monetary policy precipitated a paradigm shift in macroeconomic theory. 
This transformative approach necessitated comprehensive institutional restructuring and 
policy recalibration across all financial sectors.
```

Expected result: 12-15 vocabulary words extracted with simple meanings

---

## 🎯 5-Minute Feature Tour

### Tab 1: Vocabulary (Auto-selected)
- See all extracted words
- Click word for details
- 💾 Save important words
- 📋 Copy meanings
- 🔊 Hear pronunciation

### Tab 2: Highlighted Passage
- See original passage
- Words are highlighted
- Click highlighted words for quick view

### Tab 3: Summary
- Click "Generate Summary"
- AI creates 2-3 sentence summary
- Understand main points quickly

### Tab 4: Quiz
- Click "Generate Quiz"
- AI creates 5 questions
- Test your knowledge
- Get instant feedback

### Sidebar: Saved Words
- Your personal vocabulary list
- Click to review details
- Remove anytime

---

## 🎮 Try These First

### 1. Pronunciation (10 seconds)
1. Look at any vocabulary card
2. Click 🔊 button
3. Hear the word pronounced

### 2. Copy Meanings (5 seconds)
1. Click 📋 button on any card
2. Meaning copied to clipboard
3. Paste anywhere to study

### 3. Save Words (5 seconds)
1. Click 🤍 (heart) button on card
2. Word appears in "Saved Words"
3. ❤️ changes to indicate it's saved

### 4. Dark Mode (2 seconds)
1. Click 🌙 button (top right)
2. App turns dark
3. Click again to switch back

### 5. Generate Quiz (30 seconds)
1. Go to "Quiz" tab
2. Click "Generate Quiz"
3. Answer the questions
4. Get instant results

---

## ❓ Common Questions

**Q: Where's my data saved?**
A: Saved words only - stored in your browser locally. Passages aren't saved.

**Q: Do I need internet?**
A: Yes - you need internet to use Groq API and AI features.

**Q: Can I use this offline?**
A: Frontend works offline, but analysis needs internet for Groq API.

**Q: How many words can I analyze?**
A: Up to 3000 words (15,000 characters) per passage.

**Q: Is it free?**
A: Yes! Groq API has a free tier. No payment required to start.

**Q: Can I share this with friends?**
A: Yes! Deploy to a server and share the URL. See SETUP_GUIDE.md for details.

**Q: How do I change the AI model?**
A: Edit server.js line ~14, change model name in API call.

**Q: Why is analysis slow?**
A: Groq might be processing heavy requests. Wait a moment and try again.

**Q: Can I use this on my phone?**
A: Yes! It's fully responsive. Works on iOS and Android.

---

## 🔧 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "API key is invalid"
1. Get new key from https://console.groq.com
2. Update .env file
3. Restart server (Ctrl+C, then `npm start`)

### "Connection refused localhost:3000"
```bash
npm start
```

### "CORS error" in browser
- Make sure server running on port 3000
- Browser accessing http://localhost:3000

### App not loading
- Check browser console (F12 → Console)
- Check terminal for errors
- Try hard refresh (Ctrl+Shift+R)

---

## 📁 Project Structure

```
rc-vocabulary-ai/
├── server.js              ← Backend (Node.js)
├── index.html             ← Frontend (HTML)
├── styles.css             ← Styling (CSS)
├── script.js              ← Logic (JavaScript)
├── package.json           ← Dependencies
└── .env                   ← API Key (create this)
```

---

## 🚀 Next Steps

1. **Just Getting Started?**
   - Read SETUP_GUIDE.md for detailed setup

2. **Want to Explore Features?**
   - Read FEATURES_GUIDE.md for all capabilities

3. **Want to Deploy?**
   - See README.md section on "Production Deployment"

4. **Want to Modify Code?**
   - Read ARCHITECTURE.md for technical details

---

## 💡 Pro Tips

1. **Use Beginner Mode first**, then switch to Advanced for deeper learning
2. **Generate quizzes** after analyzing passages to reinforce learning
3. **Save important words** for daily revision
4. **Use different passages** from various sources for better vocabulary
5. **Use dark mode** during night study sessions
6. **Try pronunciation** 3-5 times per word for better retention

---

## 📞 Need Help?

- **Setup Issues**: See SETUP_GUIDE.md
- **Features**: See FEATURES_GUIDE.md  
- **Technical**: See ARCHITECTURE.md
- **Troubleshooting**: See README.md section on "Troubleshooting"

---

## ✅ Verification Checklist

Before you start:
- [ ] Node.js installed
- [ ] npm install completed
- [ ] .env file created with GROQ_API_KEY
- [ ] Server running (npm start)
- [ ] Browser shows app at localhost:3000
- [ ] Can paste text in input box
- [ ] Analyze button is clickable

**All checked? You're ready to learn! 🎉**

---

## 🎓 First Learning Session (10 minutes)

1. **Analyze a passage** (2 min)
   - Find an RC passage online
   - Paste and analyze
   - Review vocabulary

2. **Explore features** (3 min)
   - Try highlighting
   - Generate summary
   - Test pronunciation

3. **Take a quiz** (3 min)
   - Go to quiz tab
   - Generate and answer questions
   - See your score

4. **Save words** (2 min)
   - Save 5 important words
   - Review saved words tab
   - Ready for revision!

---

**Let's go! Start analyzing passages now! 🚀📚**

*Questions? Check the other documentation files or restart the server.*
