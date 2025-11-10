import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Event } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Video, Plus } from 'lucide-react';
import { format, isPast } from 'date-fns';

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*, creator:created_by(full_name, avatar_url)')
        .eq('is_active', true)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesType = filterType === 'all' || event.event_type === filterType;
    const eventDate = new Date(event.event_date);
    const matchesTimeFilter = showPastEvents ? isPast(eventDate) : !isPast(eventDate);
    return matchesType && matchesTimeFilter;
  });

  const eventTypeLabels: Record<string, string> = {
    networking: 'Networking',
    workshop: 'Workshop',
    seminar: 'Seminar',
    social: 'Social',
    'career-fair': 'Career Fair',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-2">
            Discover and join alumni events and activities
          </p>
        </div>
        {profile?.role !== 'student' && (
          <button className="btn-primary">
            <Plus className="h-5 w-5 inline mr-2" />
            Create Event
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="networking">Networking</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="social">Social</option>
              <option value="career-fair">Career Fair</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPastEvents}
                onChange={(e) => setShowPastEvents(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Show past events</span>
            </label>
          </div>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {eventTypeLabels[event.event_type]}
              </span>
              {event.is_virtual && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center">
                  <Video className="h-3 w-3 mr-1" />
                  Virtual
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                {format(new Date(event.event_date), 'PPP')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                {format(new Date(event.event_date), 'p')}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                {event.location}
              </div>
              {event.max_attendees && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  Max {event.max_attendees} attendees
                </div>
              )}
            </div>

            <p className="text-gray-600 line-clamp-3 mb-4">{event.description}</p>

            <button className="w-full btn-primary">
              Register for Event
            </button>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {showPastEvents 
              ? 'No past events found matching your criteria'
              : 'No upcoming events found matching your criteria'}
          </p>
        </div>
      )}
    </div>
  );
};
