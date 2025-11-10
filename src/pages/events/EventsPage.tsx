import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { eventService } from '../../services/event.service';
import type { Event, EventFilters, Pagination as PaginationType } from '../../types';
import { Card, Badge, EmptyState, Loading, Pagination, Button } from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

export const EventsPage: React.FC = () => {
  const { profile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    perPage: 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<EventFilters>({ upcoming: true });

  useEffect(() => {
    fetchEvents();
  }, [pagination.page, filters]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const result = await eventService.getAllEvents(filters, pagination.page, pagination.perPage);
      setEvents(result.events);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeBadgeVariant = (eventType: string) => {
    switch (eventType) {
      case 'networking':
        return 'primary';
      case 'workshop':
        return 'secondary';
      case 'seminar':
        return 'success';
      case 'reunion':
        return 'warning';
      case 'career-fair':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
              <p className="mt-1 text-gray-600">
                Connect with the alumni community at upcoming events
              </p>
            </div>
            {profile?.role === 'alumni' && (
              <Link to="/events/create">
                <Button>Create Event</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({ 
                    ...filters, 
                    event_type: value ? [value as any] : undefined 
                  });
                }}
              >
                <option value="">All Types</option>
                <option value="networking">Networking</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="reunion">Reunion</option>
                <option value="career-fair">Career Fair</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.is_virtual === undefined ? '' : String(filters.is_virtual)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({ 
                    ...filters, 
                    is_virtual: value === '' ? undefined : value === 'true'
                  });
                }}
              >
                <option value="">All Formats</option>
                <option value="false">In-Person</option>
                <option value="true">Virtual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={String(filters.upcoming)}
                onChange={(e) => setFilters({ ...filters, upcoming: e.target.value === 'true' })}
              >
                <option value="true">Upcoming</option>
                <option value="false">Past Events</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <Loading />
        ) : events.length === 0 ? (
          <EmptyState
            icon={<Calendar size={48} />}
            title="No events found"
            description="There are no events matching your criteria. Try adjusting your filters."
            action={
              profile?.role === 'alumni' && (
                <Link to="/events/create">
                  <Button>Create the First Event</Button>
                </Link>
              )
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
                      />
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                      <Badge variant={getEventTypeBadgeVariant(event.event_type)}>
                        {event.event_type}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {format(new Date(event.start_date), 'MMM d, yyyy • h:mm a')}
                      </div>
                      <div className="flex items-center">
                        {event.is_virtual ? (
                          <>
                            <Video size={16} className="mr-2" />
                            Virtual Event
                          </>
                        ) : (
                          <>
                            <MapPin size={16} className="mr-2" />
                            {event.location}
                          </>
                        )}
                      </div>
                      {event.max_attendees && (
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          Max {event.max_attendees} attendees
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3">
                      {event.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(page: number) => setPagination({ ...pagination, page })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
