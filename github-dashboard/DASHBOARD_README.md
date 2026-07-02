# GitHub Dashboard

A beautiful Next.js dashboard that displays GitHub repository metrics including build success rates, average build duration, number of failed builds, and test pass rates.

## ✨ Features

- 📊 Real-time GitHub metrics visualization
- 🔧 Build success rate tracking
- ⏱️ Average build duration monitoring
- ❌ Failed builds counter
- 🧪 Automated test pass rate
- 🎨 Modern Tailwind CSS design with gradient cards
- ⚡ Fast and responsive interface

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub API** - Real-time data fetching

## 📋 Prerequisites

Before you start, make sure you have:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A GitHub account (optional, for public repos) or **GitHub Personal Access Token** (for private repos)

## 🚀 Quick Start

### Step 1: Navigate to the project directory

```bash
cd github-dashboard
```

### Step 2: Install dependencies

Dependencies are already installed during project creation. If needed, reinstall with:

```bash
npm install
```

### Step 3: Run the development server

```bash
npm run dev
```

This will start the Next.js development server on **http://localhost:3000**

Output will show:
```
▲ Next.js 16.2.10
  Local:        http://localhost:3000
  Environments: .env.local
```

### Step 4: Open in your browser

Open [http://localhost:3000](http://localhost:3000) in your web browser.

You should see:
- A beautiful dark gradient background
- A "GitHub Dashboard" header
- An input form to select a repository
- Instructions to try the example: owner="facebook" repo="react"

## 📝 How to Use the Dashboard

1. **Enter Repository Details**
   - **Owner**: GitHub username or organization name (e.g., `facebook`)
   - **Repository**: Repository name (e.g., `react`)

2. **Load Metrics** - Click the "Load" button or press Enter

3. **View Metrics** - The dashboard displays four key metrics:
   - **Build Success Rate** (%)
   - **Average Build Duration** (minutes)
   - **Failed Builds** (count)
   - **Test Pass Rate** (%)

### Example Repositories to Try

- `facebook/react` - Popular React library
- `microsoft/vscode` - Visual Studio Code
- `docker/cli` - Docker command-line tool
- `kubernetes/kubernetes` - Kubernetes project
- `nodejs/node` - Node.js runtime

## 🔐 GitHub Personal Access Token (Optional)

For higher API rate limits and access to private repositories, you can use a GitHub Personal Access Token:

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Select `public_repo` scope (and `repo` for private repos)
4. Copy the token

**Note**: The current implementation doesn't use a token, but you can add one to `src/lib/github-api.ts` to increase rate limits.

## 🏗️ Building for Production

### Build the app:

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

Output will show:
```
✓ Compiled successfully in X.Xs
✓ Generating static pages using 5 workers (4/4)
```

### Start production server:

```bash
npm run start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
github-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main dashboard page
│   │   ├── globals.css      # Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   └── DashboardGrid.tsx # Dashboard metric cards
│   └── lib/
│       └── github-api.ts    # GitHub API client
├── public/                  # Static files
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts       # Tailwind configuration
└── README.md
```

## 🔧 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🎨 Customization

### Change Dashboard Metrics

Edit `src/components/DashboardGrid.tsx` to modify metric cards:
- Change colors: `from-green-500 to-green-600`
- Update titles and units
- Add new metrics

### Modify GitHub API

Edit `src/lib/github-api.ts` to:
- Add authentication token
- Change cache duration (currently 5 minutes)
- Fetch additional data from GitHub API

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.ts` to:
- Change colors
- Add custom fonts
- Customize breakpoints

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Click "Deploy"

Vercel will automatically detect it's a Next.js app and deploy it.

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting:
- **Railway**: Easy GitHub integration
- **Heroku**: Traditional PaaS
- **Netlify**: Static export with edge functions
- **Docker**: Containerized deployment

## 🐛 Troubleshooting

### Port 3000 already in use?

Run on a different port:
```bash
npm run dev -- -p 3001
```

### GitHub API rate limit exceeded?

The GitHub API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

Add a Personal Access Token to increase limits (see "GitHub Personal Access Token" section).

### Build fails with TypeScript errors?

Run type checking to see errors:
```bash
npm run type-check
```

### Components not updating?

Make sure you're in development mode with hot reload:
```bash
npm run dev
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

MIT License - feel free to use this project however you like.

## 🤝 Contributing

Feel free to fork, modify, and improve this dashboard!

---

**Happy monitoring! 📊**
