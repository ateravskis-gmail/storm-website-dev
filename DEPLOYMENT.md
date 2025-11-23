# Deployment Guide for Storm Website

## Option 1: Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the best experience.

### Steps:
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"
   - Your site will be live in minutes!

3. **Custom Domain (Optional):**
   - In your Vercel project settings, go to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

### Benefits:
- ✅ Free tier with generous limits
- ✅ Automatic deployments on every push
- ✅ HTTPS by default
- ✅ Global CDN
- ✅ Zero configuration needed

---

## Option 2: Netlify

### Steps:
1. **Push your code to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your GitHub account
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Update next.config.js for Netlify:**
   You may need to add this to your `next.config.js`:
   ```js
   const nextConfig = {
     images: {
       domains: ['images.unsplash.com'],
     },
     // For Netlify
     output: 'standalone',
   }
   ```

---

## Option 3: GitHub Pages (Static Export Only)

⚠️ **Warning:** This only works if you convert your site to static export, which means:
- No server-side rendering
- No API routes
- Limited Next.js features

### Steps:
1. **Update next.config.js:**
   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
       domains: ['images.unsplash.com'],
     },
   }
   ```

2. **Add to package.json:**
   ```json
   "scripts": {
     "export": "next build"
   }
   ```

3. **Create GitHub Actions workflow:**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

4. **Enable GitHub Pages:**
   - Go to your repo Settings → Pages
   - Source: GitHub Actions

---

## Recommended: Vercel

For a Next.js site, **Vercel is the best choice** because:
- Made specifically for Next.js
- Zero configuration
- Free tier is very generous
- Automatic deployments
- Best performance

Just push to GitHub and connect to Vercel - it's that simple!

