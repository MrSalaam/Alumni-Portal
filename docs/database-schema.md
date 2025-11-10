# Database Schema

This document describes the database schema for the Alumni Portal System.

## Tables

### 1. users (extends Supabase auth.users)

Stores core user information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'alumni', 'student')) NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 2. alumni_profiles

Alumni-specific profile information.

```sql
CREATE TABLE alumni_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  graduation_year INTEGER NOT NULL,
  degree TEXT NOT NULL,
  major TEXT NOT NULL,
  current_company TEXT,
  current_position TEXT,
  industry TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[],
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  is_mentor BOOLEAN DEFAULT FALSE,
  work_experience JSONB,
  achievements JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Alumni can view their own profile"
  ON alumni_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Alumni can update their own profile"
  ON alumni_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Verified users can view verified alumni profiles"
  ON alumni_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_verified = TRUE
    )
  );
```

### 3. student_profiles

Student-specific profile information.

```sql
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  student_id TEXT UNIQUE NOT NULL,
  current_year INTEGER NOT NULL,
  major TEXT NOT NULL,
  expected_graduation DATE NOT NULL,
  interests TEXT[],
  career_goals TEXT,
  gpa DECIMAL(3, 2),
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Students can view their own profile"
  ON student_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile"
  ON student_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Alumni can view student profiles"
  ON student_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'alumni' AND is_verified = TRUE
    )
  );
```

### 4. jobs

Job postings.

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  posted_by UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary_range TEXT,
  application_url TEXT NOT NULL,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view active jobs"
  ON jobs FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Alumni can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'alumni' AND is_verified = TRUE
    )
  );

CREATE POLICY "Job posters can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = posted_by);
```

### 5. events

Event listings.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT CHECK (event_type IN ('networking', 'workshop', 'seminar', 'reunion', 'career-fair')) NOT NULL,
  location TEXT NOT NULL,
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_link TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  max_attendees INTEGER,
  registration_deadline DATE,
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Alumni can create events"
  ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'alumni' AND is_verified = TRUE
    )
  );

CREATE POLICY "Event creators can update their events"
  ON events FOR UPDATE
  USING (auth.uid() = created_by);
```

### 6. event_registrations

Event attendance tracking.

```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  attendance_status TEXT CHECK (attendance_status IN ('registered', 'attended', 'cancelled')) DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own registrations"
  ON event_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations"
  ON event_registrations FOR DELETE
  USING (auth.uid() = user_id);
```

### 7. mentorship_requests

Mentorship connections between students and alumni.

```sql
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Students can view their sent requests"
  ON mentorship_requests FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Mentors can view their received requests"
  ON mentorship_requests FOR SELECT
  USING (auth.uid() = mentor_id);

CREATE POLICY "Students can create mentorship requests"
  ON mentorship_requests FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Mentors can update request status"
  ON mentorship_requests FOR UPDATE
  USING (auth.uid() = mentor_id);
```

### 8. news

News articles and updates.

```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view published news"
  ON news FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Alumni can create news"
  ON news FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('alumni', 'admin') AND is_verified = TRUE
    )
  );

CREATE POLICY "Authors can update their news"
  ON news FOR UPDATE
  USING (auth.uid() = author_id);
```

### 9. notifications

User notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

### 10. saved_jobs

Bookmarked jobs by users.

```sql
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Enable Row Level Security
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = user_id);
```

## Indexes

For better query performance, create indexes on frequently queried columns:

```sql
-- Users
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

-- Alumni Profiles
CREATE INDEX idx_alumni_graduation_year ON alumni_profiles(graduation_year);
CREATE INDEX idx_alumni_company ON alumni_profiles(current_company);
CREATE INDEX idx_alumni_location ON alumni_profiles(location);
CREATE INDEX idx_alumni_is_mentor ON alumni_profiles(is_mentor);

-- Jobs
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- Events
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_is_published ON events(is_published);
CREATE INDEX idx_events_start_date ON events(start_date);

-- News
CREATE INDEX idx_news_author_id ON news(author_id);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_is_published ON news(is_published);
CREATE INDEX idx_news_published_at ON news(published_at DESC);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

## Triggers

Create triggers for automatic timestamp updates:

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_profiles_updated_at BEFORE UPDATE ON alumni_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentorship_requests_updated_at BEFORE UPDATE ON mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Storage Buckets

Create storage buckets in Supabase for file uploads:

1. **avatars**: User profile pictures
2. **resumes**: Student resumes
3. **event-images**: Event featured images
4. **news-images**: News article images

### Storage Policies

```sql
-- Avatars bucket
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public avatar access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

## Setup Instructions

1. Create a new Supabase project
2. Run the SQL migrations in order:
   - Create tables
   - Enable RLS on all tables
   - Create policies
   - Create indexes
   - Create triggers
   - Set up storage buckets
3. Configure environment variables in your `.env` file
4. Test the database connection

## Notes

- All timestamps use `TIMESTAMPTZ` for timezone awareness
- Row Level Security (RLS) is enabled on all tables for data security
- Foreign keys include `ON DELETE CASCADE` for automatic cleanup
- Indexes are created on frequently queried columns for performance
- Triggers automatically update `updated_at` timestamps
