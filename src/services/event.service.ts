import { supabase } from '../lib/supabase';
import type { Event, EventFilters, EventRegistration, Pagination } from '../types';

export const eventService = {
  async getAllEvents(filters?: EventFilters, page: number = 1, perPage: number = 12) {
    let query = supabase
      .from('events')
      .select('*, created_by(full_name, avatar_url)', { count: 'exact' })
      .eq('is_published', true)
      .order('start_date', { ascending: true });

    // Apply filters
    if (filters?.event_type && filters.event_type.length > 0) {
      query = query.in('event_type', filters.event_type);
    }

    if (filters?.is_virtual !== undefined) {
      query = query.eq('is_virtual', filters.is_virtual);
    }

    if (filters?.upcoming) {
      query = query.gte('start_date', new Date().toISOString());
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

    return { events: data as Event[], pagination };
  },

  async getEventById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*, created_by(full_name, avatar_url, email)')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data as Event;
  },

  async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;

    return data as Event;
  },

  async updateEvent(id: string, eventData: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as Event;
  },

  async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async registerForEvent(eventId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('event_registrations')
      .insert([{ 
        event_id: eventId, 
        user_id: user.id,
        attendance_status: 'registered'
      }]);

    if (error) throw error;
  },

  async cancelRegistration(eventId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('event_registrations')
      .update({ attendance_status: 'cancelled' })
      .eq('event_id', eventId)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, user_id(full_name, email, avatar_url)')
      .eq('event_id', eventId)
      .order('registration_date', { ascending: false });

    if (error) throw error;

    return data as EventRegistration[];
  },

  async getMyEvents(userId: string, page: number = 1, perPage: number = 12) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('created_by', userId)
      .order('start_date', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const pagination: Pagination = {
      page,
      perPage,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / perPage),
    };

    return { events: data as Event[], pagination };
  },

  async getMyRegistrations(userId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, event_id(*)')
      .eq('user_id', userId)
      .eq('attendance_status', 'registered')
      .order('registration_date', { ascending: false });

    if (error) throw error;

    return data?.map(item => item.event_id) as Event[];
  },

  async checkRegistration(eventId: string, userId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return data as EventRegistration | null;
  },
};
