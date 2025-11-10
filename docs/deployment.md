# Deployment Guide

This guide covers deploying the Alumni Portal System to production.

## Prerequisites

- Supabase account and project
- GitHub account
- Vercel account (recommended) or other hosting provider

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Note your project URL and anon key

### 1.2 Run Database Migrations

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the SQL from `docs/database-schema.md`
3. Execute the migrations in order:
   - Create tables
   - Enable RLS
   - Create policies
   - Create indexes
   - Create triggers

### 1.3 Set Up Storage Buckets

1. Go to Storage in your Supabase dashboard
2. Create the following buckets:
   - `avatars` (public)
   - `resumes` (private)
   - `event-images` (public)
   - `news-images` (public)

3. Set up storage policies for each bucket (see database-schema.md)

### 1.4 Configure Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Set up redirect URLs for your domain

## Step 2: Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_URL=https://yourdomain.com
VITE_STORAGE_BUCKET=alumni-portal-storage
```

**Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 3: Deploy to Vercel (Recommended)

### 3.1 Connect Repository

1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration

### 3.2 Configure Build Settings

Vercel should automatically detect:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.3 Add Environment Variables

1. Go to Project Settings > Environment Variables
2. Add all variables from your `.env` file
3. Apply to Production, Preview, and Development

### 3.4 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `your-project.vercel.app`

### 3.5 Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `VITE_APP_URL` environment variable

## Step 4: Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Configuration in `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Cloudflare Pages

1. Go to Cloudflare Pages dashboard
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add environment variables
5. Deploy

### Self-Hosted (Docker)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:

```bash
docker build -t alumni-portal .
docker run -p 8080:80 alumni-portal
```

## Step 5: Post-Deployment Setup

### 5.1 Create Admin User

1. Register a new account through the UI
2. In Supabase SQL Editor:

```sql
UPDATE users 
SET role = 'admin', is_verified = true 
WHERE email = 'your-admin@email.com';
```

### 5.2 Test Critical Flows

- [ ] User registration (Alumni & Student)
- [ ] User login
- [ ] Password reset
- [ ] Job posting (Alumni)
- [ ] Event creation (Alumni)
- [ ] Profile editing
- [ ] File uploads

### 5.3 Monitor Performance

1. Set up Vercel Analytics (if using Vercel)
2. Monitor Supabase usage
3. Set up error tracking (e.g., Sentry)

### 5.4 Enable HTTPS

- Vercel/Netlify: Automatic
- Self-hosted: Use Let's Encrypt

## Step 6: CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_APP_URL: ${{ secrets.VITE_APP_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Step 7: Monitoring & Maintenance

### Performance Monitoring

- Use Vercel Analytics or Google Analytics
- Monitor Supabase database performance
- Set up uptime monitoring (e.g., UptimeRobot)

### Error Tracking

Install Sentry:

```bash
npm install @sentry/react
```

Configure in `main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

### Database Backups

1. Go to Supabase Project Settings
2. Enable daily backups
3. Download backups regularly for critical data

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Troubleshooting

### Build Failures

1. Check Node.js version (18+)
2. Clear node_modules and reinstall
3. Check environment variables
4. Review build logs

### Database Connection Issues

1. Verify Supabase URL and key
2. Check RLS policies
3. Verify user roles in database

### Authentication Problems

1. Check Supabase Auth settings
2. Verify redirect URLs
3. Check email templates
4. Review browser console for errors

### Performance Issues

1. Enable caching in Vercel
2. Optimize images
3. Review database queries
4. Check Supabase usage limits

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Find previous successful deployment
3. Click "..." > "Promote to Production"

### Database

1. Download backup from Supabase
2. Restore using SQL Editor

## Support

For deployment issues:
- Check Vercel/Netlify documentation
- Review Supabase status page
- Contact support teams

---

Last updated: 2024
