export type UserRole = 'admin' | 'alumni' | 'student';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  graduation_year: number | null;
  major: string | null;
  current_company: string | null;
  current_position: string | null;
  bio: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  location: string | null;
  is_mentor: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  posted_by: string;
  company: string;
  title: string;
  description: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  salary_range: string | null;
  application_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  poster?: Profile;
}

export interface Event {
  id: string;
  created_by: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: 'networking' | 'workshop' | 'seminar' | 'social' | 'career-fair';
  max_attendees: number | null;
  registration_deadline: string | null;
  is_virtual: boolean;
  meeting_link: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  creator?: Profile;
  attendees_count?: number;
}

export interface MentorshipRequest {
  id: string;
  mentee_id: string;
  mentor_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  created_at: string;
  updated_at: string;
  mentee?: Profile;
  mentor?: Profile;
}
