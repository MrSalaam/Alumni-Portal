-- Alumni Portal Database Schema
-- Run this SQL in your Supabase SQL editor

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

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_mentor ON profiles(is_mentor);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_mentorship_mentee ON mentorship_requests(mentee_id);
CREATE INDEX idx_mentorship_mentor ON mentorship_requests(mentor_id);
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
