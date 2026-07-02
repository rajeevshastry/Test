# 🚀 GitHub Dashboard - Quick Start Guide

## Copy & Paste Commands

### 1️⃣ Start the Development Server (3 seconds)

```bash
cd D:\Rajeev\GitHubAI\github-dashboard
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.2.10
  ✓ Ready in 1.5s
  Local:        http://localhost:3000
```

### 2️⃣ Open in Browser

Click this link or paste in your browser:
```
http://localhost:3000
```

### 3️⃣ Try a Repository

On the dashboard:
- **Owner**: facebook
- **Repository**: react
- Click "Load"

Done! You're now viewing GitHub metrics for the React repository.

---

## 🔥 For Production

```bash
npm run build
npm run start
```

Then open http://localhost:3000

---

## 📊 What You'll See

Four metric cards showing:
- ✅ Build Success Rate (%)
- ⏱️ Average Build Duration (minutes)  
- ❌ Failed Builds (count)
- 🧪 Test Pass Rate (%)

---

## 🆘 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Want to stop the server?**
Press `Ctrl + C` in the terminal

**Looking for the actual README?**
See `DASHBOARD_README.md` for full documentation

---

**That's it! You now have a working GitHub metrics dashboard! 🎉**
