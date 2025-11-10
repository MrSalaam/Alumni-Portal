# Quick Start Guide

Get the Alumni Portal up and running in 5 minutes!

## 1. Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A Supabase account (free tier works)

## 2. Clone & Install

```bash
git clone https://github.com/MrSalaam/Alumni-Portal.git
cd Alumni-Portal
npm install
```

## 3. Set Up Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for initialization (2-3 minutes)

### Set Up Database
1. Go to SQL Editor in your Supabase dashboard
2. Copy all content from `supabase/schema.sql`
3. Paste and execute in SQL Editor

### Get Credentials
1. Go to Settings > API
2. Copy your Project URL
3. Copy your `anon` public key

## 4. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Run the App

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## 6. Create Your First Account

1. Click "Create a new account"
2. Fill in your details
3. Check your email for verification (if enabled)
4. Start exploring!

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter

# Deployment
npm run build        # Build first
# Then deploy the 'dist' folder to your hosting service
```

## Default User Roles

- **Student**: Can browse directory, jobs, events, request mentorship
- **Alumni**: All student features + post jobs, create events, be a mentor
- **Admin**: All features + user management

To make yourself an admin:
1. Register an account
2. Go to Supabase > Table Editor > profiles
3. Find your user and change role to 'admin'

## Need Help?

- 📖 Full documentation: [README.md](README.md)
- 🚀 Deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🤝 Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Report issues: [GitHub Issues](https://github.com/MrSalaam/Alumni-Portal/issues)

## Features Overview

### 🎓 For Students
- Search alumni directory
- Find job opportunities
- Register for events
- Request mentorship from alumni

### 👨‍🎓 For Alumni
- Update professional profile
- Post job opportunities
- Create networking events
- Mentor current students

### 👨‍💼 For Admins
- Manage all users
- Oversee all content
- Create announcements
- Monitor platform activity

## Architecture

```
Frontend: React + TypeScript + Vite
Styling: Tailwind CSS
Backend: Supabase (PostgreSQL + Auth + Storage)
Routing: React Router
State: React Context + Hooks
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── auth/        # Login, Register
│   ├── layout/      # Navbar, Layout
│   └── common/      # Shared components
├── pages/           # Main pages
│   ├── Dashboard.tsx
│   ├── Directory.tsx
│   ├── Jobs.tsx
│   ├── Events.tsx
│   ├── Mentorship.tsx
│   └── Profile.tsx
├── hooks/           # Custom hooks (useAuth)
├── lib/             # Library configs (Supabase)
└── types/           # TypeScript types
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Build Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Can't Connect to Supabase
- Check your .env file has correct values
- Verify Supabase project is active
- Check network connection

## Next Steps

1. ✅ Set up your profile
2. ✅ Explore the alumni directory
3. ✅ Check out job listings
4. ✅ Register for an event
5. ✅ Update your professional info

Happy networking! 🎉
