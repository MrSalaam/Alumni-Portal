import { supabase } from '../lib/supabase';
import type { Job, JobFilters, Pagination } from '../types';

export const jobService = {
  async getAllJobs(filters?: JobFilters, page: number = 1, perPage: number = 12) {
    let query = supabase
      .from('jobs')
      .select('*, posted_by(full_name, avatar_url)', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters?.job_type && filters.job_type.length > 0) {
      query = query.in('job_type', filters.job_type);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.company) {
      query = query.ilike('company', `%${filters.company}%`);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Apply pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    const pagination: Pagination = {
      page,
      perPage,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / perPage),
    };

    return { jobs: data as Job[], pagination };
  },

  async getJobById(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, posted_by(full_name, avatar_url, email)')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data as Job;
  },

  async createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'view_count'>) {
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();

    if (error) throw error;

    return data as Job;
  },

  async updateJob(id: string, jobData: Partial<Job>) {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as Job;
  },

  async deleteJob(id: string) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async saveJob(jobId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('saved_jobs')
      .insert([{ user_id: user.id, job_id: jobId }]);

    if (error) throw error;
  },

  async unsaveJob(jobId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', user.id)
      .eq('job_id', jobId);

    if (error) throw error;
  },

  async getSavedJobs(userId: string, page: number = 1, perPage: number = 12) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
      .from('saved_jobs')
      .select('job_id, jobs(*)', { count: 'exact' })
      .eq('user_id', userId)
      .range(from, to);

    if (error) throw error;

    const pagination: Pagination = {
      page,
      perPage,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / perPage),
    };

    const jobsList = data?.map((item: any) => item.jobs).filter(Boolean) || [];
    return { 
      jobs: jobsList as Job[], 
      pagination 
    };
  },

  async incrementJobViews(jobId: string) {
    const { error } = await supabase.rpc('increment_job_views', { job_id: jobId });

    if (error) throw error;
  },

  async getMyJobs(userId: string, page: number = 1, perPage: number = 12) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .eq('posted_by', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const pagination: Pagination = {
      page,
      perPage,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / perPage),
    };

    return { jobs: data as Job[], pagination };
  },
};
