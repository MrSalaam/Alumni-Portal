# Deployment Guide for Alumni Portal

This guide will help you deploy the Alumni Portal System to production.

## Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A hosting platform account (Vercel, Netlify, or similar)

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in and create a new project
3. Wait for the project to be created (this may take a few minutes)

### 1.2 Set Up Database

1. In your Supabase project dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema.sql` from this repository
3. Paste it into the SQL Editor and run it
4. Verify that all tables have been created by checking the Table Editor

### 1.3 Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Enable Email auth provider
3. Configure email templates if desired
4. Set up redirect URLs for your production domain

### 1.4 Get API Credentials

1. Go to Settings > API in your Supabase dashboard
2. Copy your project URL
3. Copy your `anon` public key

## Step 2: Configure Environment Variables

### 2.1 Local Development

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.2 Production

Add these environment variables to your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Step 3: Deploy to Hosting Platform

### Option A: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel dashboard

5. Redeploy with production flag:
   ```bash
   vercel --prod
   ```

### Option B: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. Add environment variables in Netlify dashboard

### Option C: Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/Alumni-Portal",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/Alumni-Portal/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Step 4: Post-Deployment Configuration

### 4.1 Update Supabase Redirect URLs

In Supabase dashboard > Authentication > URL Configuration, add:
- `https://your-domain.com`
- `https://your-domain.com/**`

### 4.2 Set Up Row Level Security (RLS)

The SQL schema includes RLS policies, but verify they're active:

1. Go to Table Editor in Supabase
2. For each table, ensure RLS is enabled
3. Review policies in the Policies tab

### 4.3 Create Admin User

1. Register a new user through your deployed app
2. In Supabase, go to Table Editor > profiles
3. Find the newly created user
4. Change their `role` from 'student' to 'admin'

## Step 5: Testing

### Test Core Functionality

- [ ] User registration
- [ ] User login
- [ ] Profile updates
- [ ] Alumni directory search
- [ ] Job posting (as alumni/admin)
- [ ] Event creation (as alumni/admin)
- [ ] Mentorship requests

### Performance Testing

- Test on mobile devices
- Check page load times
- Verify responsive design
- Test with slow network

## Step 6: Monitoring and Maintenance

### Enable Supabase Monitoring

1. Go to Supabase Dashboard > Reports
2. Monitor API usage
3. Set up alerts for errors

### Set Up Error Tracking (Optional)

Consider integrating:
- Sentry for error tracking
- Google Analytics for usage tracking
- LogRocket for session replay

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues

- Verify Supabase URL and key are correct
- Check Supabase project status
- Verify network connectivity

### Authentication Issues

- Check redirect URLs in Supabase
- Verify email templates are configured
- Check browser console for errors

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] RLS policies are enabled
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enabled on production domain
- [ ] CORS is configured properly in Supabase
- [ ] Rate limiting is considered
- [ ] Regular backups are enabled

## Scaling Considerations

### Database

- Monitor query performance in Supabase dashboard
- Add indexes for frequently queried fields
- Consider upgrading Supabase plan as needed

### Frontend

- Enable CDN caching
- Optimize images and assets
- Implement lazy loading for routes
- Use React.memo for expensive components

### Backend

- Monitor Supabase API usage
- Implement pagination for large data sets
- Use database functions for complex queries
- Consider caching strategies

## Support

For issues and questions:
1. Check the main README.md
2. Review Supabase documentation
3. Open an issue on GitHub
4. Contact support

## License

This project is licensed under the MIT License.
