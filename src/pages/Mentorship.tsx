import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile, MentorshipRequest } from '../types';
import { useAuth } from '../hooks/useAuth';
import { UserCog, Search, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

export const Mentorship = () => {
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { profile } = useAuth();

  useEffect(() => {
    fetchMentors();
    if (profile) {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_mentor', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('mentorship_requests')
        .select('*, mentor:mentor_id(*), mentee:mentee_id(*)')
        .or(`mentee_id.eq.${profile.id},mentor_id.eq.${profile.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.current_company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-600" />,
    accepted: <CheckCircle className="h-5 w-5 text-green-600" />,
    rejected: <XCircle className="h-5 w-5 text-red-600" />,
    completed: <CheckCircle className="h-5 w-5 text-blue-600" />,
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
        <p className="text-gray-600 mt-2">
          Connect with experienced alumni for guidance and support
        </p>
      </div>

      {/* My Requests */}
      {requests.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Mentorship Requests</h2>
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {statusIcons[request.status]}
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile?.id === request.mentee_id 
                        ? `Request to ${request.mentor?.full_name}`
                        : `Request from ${request.mentee?.full_name}`}
                    </p>
                    <p className="text-sm text-gray-600">{request.message}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-full capitalize">
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors by name, major, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                {mentor.avatar_url ? (
                  <img
                    src={mentor.avatar_url}
                    alt={mentor.full_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {mentor.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {mentor.full_name}
                </h3>
                {mentor.current_position && mentor.current_company && (
                  <p className="text-sm text-gray-600 truncate">
                    {mentor.current_position} at {mentor.current_company}
                  </p>
                )}
              </div>
            </div>

            {mentor.major && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Major:</span> {mentor.major}
              </p>
            )}

            {mentor.bio && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{mentor.bio}</p>
            )}

            <button className="w-full btn-primary">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Request Mentorship
            </button>
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <UserCog className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No mentors found matching your criteria</p>
        </div>
      )}
    </div>
  );
};
