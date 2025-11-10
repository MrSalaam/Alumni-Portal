# Quick Start Guide

Get the Alumni Portal System up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account (free tier works)

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/MrSalaam/Alumni-Portal.git
cd Alumni-Portal

# Install dependencies
npm install
```

## Step 2: Set Up Supabase (2 minutes)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for setup to complete

2. **Get your credentials:**
   - Go to Project Settings > API
   - Copy the Project URL
   - Copy the anon/public key

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Add your credentials to `.env`:**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_URL=http://localhost:5173
   VITE_STORAGE_BUCKET=alumni-portal-storage
   ```

## Step 3: Set Up Database (1 minute)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor"
3. Copy the SQL from `docs/database-schema.md`
4. Paste and execute the SQL statements

## Step 4: Run the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## First Steps

### 1. Create an Account

- Click "Get Started" or "Register"
- Choose your role (Student or Alumni)
- Fill in your details
- Check your email for verification (optional)

### 2. Explore Features

**As a Student:**
- Browse job board
- Search alumni directory
- Register for events
- Request mentorship

**As an Alumni:**
- Post job opportunities
- Create events
- Update your profile
- Offer mentorship

**As an Admin:**
First create an account, then manually update your role:

```sql
-- In Supabase SQL Editor
UPDATE users 
SET role = 'admin', is_verified = true 
WHERE email = 'your-email@example.com';
```

## Common Tasks

### View Jobs

```
Navigate to: /jobs
```

Browse available job postings with filtering options.

### View Events

```
Navigate to: /events
```

See upcoming and past events with registration options.

### Update Profile

```
Navigate to: /dashboard
Click on your name > Profile
```

### Post a Job (Alumni only)

```
Navigate to: /jobs
Click "Post a Job"
Fill in job details
Submit
```

### Create Event (Alumni only)

```
Navigate to: /events
Click "Create Event"
Fill in event details
Submit
```

## Troubleshooting

### "Supabase credentials are missing"

- Check your `.env` file exists
- Verify credentials are correct
- Restart the dev server

### Database errors

- Ensure you ran all SQL migrations
- Check RLS policies are enabled
- Verify user has correct permissions

### Build errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Port already in use

```bash
# Use a different port
npm run dev -- --port 3000
```

## Next Steps

1. **Customize the app:**
   - Update colors in `tailwind.config.js`
   - Modify homepage in `src/pages/HomePage.tsx`
   - Add your logo and branding

2. **Add test data:**
   - Create sample users
   - Post test jobs
   - Create test events

3. **Deploy to production:**
   - See `docs/deployment.md` for detailed instructions
   - Recommended: Vercel (easiest setup)

## Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom React hooks
│   ├── contexts/      # React contexts
│   └── types/         # TypeScript types
├── docs/              # Documentation
└── public/            # Static assets
```

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🗄️ [Database Schema](./docs/database-schema.md)
- 🚀 [Deployment Guide](./docs/deployment.md)
- 🤝 [Contributing](./CONTRIBUTING.md)
- 💬 [Open an Issue](https://github.com/MrSalaam/Alumni-Portal/issues)

## What's Working

Current features:
- ✅ User authentication (signup, login, logout)
- ✅ Role-based access control
- ✅ Job board with filtering
- ✅ Events listing with filtering
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## Upcoming Features

Coming soon:
- 🔨 Job and event detail pages
- 🔨 Alumni directory
- 🔨 User profiles
- 🔨 Mentorship system
- 🔨 News/blog system
- 🔨 Admin dashboard
- 🔨 Real-time notifications

---

Happy coding! 🎉
