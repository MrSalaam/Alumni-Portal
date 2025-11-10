export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'admin' | 'alumni' | 'student';
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
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: 'admin' | 'alumni' | 'student';
          graduation_year?: number | null;
          major?: string | null;
          current_company?: string | null;
          current_position?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          github_url?: string | null;
          location?: string | null;
          is_mentor?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: 'admin' | 'alumni' | 'student';
          graduation_year?: number | null;
          major?: string | null;
          current_company?: string | null;
          current_position?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          github_url?: string | null;
          location?: string | null;
          is_mentor?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
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
        };
        Insert: {
          id?: string;
          posted_by: string;
          company: string;
          title: string;
          description: string;
          location: string;
          job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
          experience_level: 'entry' | 'mid' | 'senior' | 'lead';
          salary_range?: string | null;
          application_url: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          posted_by?: string;
          company?: string;
          title?: string;
          description?: string;
          location?: string;
          job_type?: 'full-time' | 'part-time' | 'contract' | 'internship';
          experience_level?: 'entry' | 'mid' | 'senior' | 'lead';
          salary_range?: string | null;
          application_url?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
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
        };
        Insert: {
          id?: string;
          created_by: string;
          title: string;
          description: string;
          event_date: string;
          location: string;
          event_type: 'networking' | 'workshop' | 'seminar' | 'social' | 'career-fair';
          max_attendees?: number | null;
          registration_deadline?: string | null;
          is_virtual?: boolean;
          meeting_link?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          created_by?: string;
          title?: string;
          description?: string;
          event_date?: string;
          location?: string;
          event_type?: 'networking' | 'workshop' | 'seminar' | 'social' | 'career-fair';
          max_attendees?: number | null;
          registration_deadline?: string | null;
          is_virtual?: boolean;
          meeting_link?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      mentorship_requests: {
        Row: {
          id: string;
          mentee_id: string;
          mentor_id: string;
          status: 'pending' | 'accepted' | 'rejected' | 'completed';
          message: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mentee_id: string;
          mentor_id: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'completed';
          message: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mentee_id?: string;
          mentor_id?: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'completed';
          message?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
