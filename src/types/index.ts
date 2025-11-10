// User Role Types
export type UserRole = 'admin' | 'alumni' | 'student';

// User Types
export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Alumni Profile
export interface AlumniProfile {
  id: string;
  user_id: string;
  graduation_year: number;
  degree: string;
  major: string;
  current_company?: string;
  current_position?: string;
  industry?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  is_mentor: boolean;
  work_experience?: WorkExperience[];
  achievements?: Achievement[];
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
  is_current: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

// Student Profile
export interface StudentProfile {
  id: string;
  user_id: string;
  student_id: string;
  current_year: number;
  major: string;
  expected_graduation: string;
  interests?: string[];
  career_goals?: string;
  gpa?: number;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

// Job Types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface Job {
  id: string;
  posted_by: string;
  title: string;
  company: string;
  location: string;
  job_type: JobType;
  description: string;
  requirements: string;
  salary_range?: string;
  application_url: string;
  application_deadline: string;
  is_active: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Event Types
export type EventType = 'networking' | 'workshop' | 'seminar' | 'reunion' | 'career-fair';
export type AttendanceStatus = 'registered' | 'attended' | 'cancelled';

export interface Event {
  id: string;
  created_by: string;
  title: string;
  description: string;
  event_type: EventType;
  location: string;
  is_virtual: boolean;
  virtual_link?: string;
  start_date: string;
  end_date: string;
  max_attendees?: number;
  registration_deadline: string;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  registration_date: string;
  attendance_status: AttendanceStatus;
  created_at: string;
}

// Mentorship Types
export type MentorshipStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface MentorshipRequest {
  id: string;
  student_id: string;
  mentor_id: string;
  message: string;
  status: MentorshipStatus;
  created_at: string;
  updated_at: string;
}

// News Types
export interface News {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  category: string;
  tags?: string[];
  is_published: boolean;
  published_at?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

// Saved Job
export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
}

// Filter Types
export interface AlumniFilters {
  graduation_year_min?: number;
  graduation_year_max?: number;
  company?: string;
  location?: string;
  industry?: string;
  skills?: string[];
  search?: string;
}

export interface JobFilters {
  job_type?: JobType[];
  location?: string;
  company?: string;
  search?: string;
}

export interface EventFilters {
  event_type?: EventType[];
  is_virtual?: boolean;
  upcoming?: boolean;
  search?: string;
}

// Pagination
export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
