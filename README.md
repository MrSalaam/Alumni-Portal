# Alumni Portal System

A complete, production-ready Alumni Portal System built with React, TypeScript, Vite, Tailwind CSS, and Supabase. This full-stack web application connects alumni, current students, and administrators, facilitating networking, mentorship, job opportunities, and event management.

## Features

### 🎓 User Management
- **Multi-role Authentication**: Support for Alumni, Students, and Administrators
- **Profile Management**: Comprehensive user profiles with education and professional information
- **Social Integration**: LinkedIn and GitHub profile links

### 👥 Alumni Directory
- **Advanced Search**: Filter by name, major, company, graduation year, and role
- **Detailed Profiles**: View alumni education, work experience, and contact information
- **Networking**: Connect with alumni via email and social media

### 💼 Job Board
- **Job Listings**: Alumni can post job opportunities
- **Advanced Filtering**: Filter by job type and experience level
- **Direct Applications**: External application links for easy job applications

### 📅 Event Management
- **Event Creation**: Organize networking events, workshops, seminars, and career fairs
- **Virtual & In-Person**: Support for both virtual and physical events
- **Event Registration**: Track attendees and manage capacity
- **Event Filtering**: Browse upcoming or past events by type

### 🤝 Mentorship Program
- **Mentor Discovery**: Find mentors based on expertise and background
- **Mentorship Requests**: Send and manage mentorship connection requests
- **Request Tracking**: Monitor pending, accepted, and completed mentorship relationships

### 📊 Dashboard
- **Activity Overview**: View key statistics and recent activities
- **Quick Actions**: Easy access to common tasks
- **Role-based Views**: Customized dashboards for different user types

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MrSalaam/Alumni-Portal.git
cd Alumni-Portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

#### Create Supabase Tables

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'alumni', 'student')),
  graduation_year INTEGER,
  major TEXT,
  current_company TEXT,
  current_position TEXT,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  location TEXT,
  is_mentor BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  posted_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead')),
  salary_range TEXT,
  application_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('networking', 'workshop', 'seminar', 'social', 'career-fair')),
  max_attendees INTEGER,
  registration_deadline TIMESTAMPTZ,
  is_virtual BOOLEAN DEFAULT false,
  meeting_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship requests table
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can create jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "Users can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = posted_by);

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = created_by);

-- Mentorship requests policies
CREATE POLICY "Users can view their own mentorship requests" ON mentorship_requests FOR SELECT USING (auth.uid() = mentee_id OR auth.uid() = mentor_id);
CREATE POLICY "Users can create mentorship requests" ON mentorship_requests FOR INSERT WITH CHECK (auth.uid() = mentee_id);
CREATE POLICY "Mentors can update requests sent to them" ON mentorship_requests FOR UPDATE USING (auth.uid() = mentor_id);

-- Event registrations policies
CREATE POLICY "Users can view event registrations" ON event_registrations FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registrations" ON event_registrations FOR DELETE USING (auth.uid() = user_id);
```

#### Set up Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components (Login, Register)
│   ├── layout/         # Layout components (Navbar, Layout)
│   └── common/         # Shared components (ProtectedRoute)
├── pages/              # Page components (Dashboard, Directory, Jobs, etc.)
├── hooks/              # Custom React hooks (useAuth)
├── lib/                # Library configurations (Supabase)
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component with routing
└── main.tsx           # Application entry point
```

## User Roles

### Student
- View alumni directory
- Browse jobs and events
- Request mentorship
- Update profile

### Alumni
- All student permissions
- Post jobs
- Create events
- Become a mentor

### Admin
- All alumni permissions
- Manage all users and content
- Access to admin dashboard

## Features in Detail

### Authentication
- Email/password authentication via Supabase Auth
- Protected routes requiring authentication
- Role-based access control

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Optimized for all screen sizes

### Data Management
- Real-time data with Supabase
- Optimistic UI updates
- Error handling and loading states

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)
