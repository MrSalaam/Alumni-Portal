import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';
import { Search, MapPin, Briefcase, GraduationCap, Linkedin, Github, Mail, Users } from 'lucide-react';

export const Directory = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.current_company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || profile.role === filterRole;
    const matchesYear = filterYear === 'all' || profile.graduation_year?.toString() === filterYear;

    return matchesSearch && matchesRole && matchesYear;
  });

  const uniqueYears = Array.from(
    new Set(profiles.map((p) => p.graduation_year).filter((y) => y !== null))
  ).sort((a, b) => (b || 0) - (a || 0));

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
        <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
        <p className="text-gray-600 mt-2">
          Connect with {profiles.length} alumni from our network
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, major, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year
            </label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="input-field"
            >
              <option value="all">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year?.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredProfiles.length} of {profiles.length} alumni
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {profile.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {profile.full_name}
                </h3>
                <p className="text-sm text-gray-600 capitalize">{profile.role}</p>
                {profile.is_mentor && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                    Available as Mentor
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {profile.current_company && (
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {profile.current_position} at {profile.current_company}
                  </span>
                </div>
              )}
              {profile.graduation_year && (
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Class of {profile.graduation_year}</span>
                  {profile.major && <span className="ml-1">• {profile.major}</span>}
                </div>
              )}
              {profile.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </div>
              )}
            </div>

            {profile.bio && (
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
            )}

            <div className="mt-4 flex space-x-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex-1 btn-secondary text-center text-sm py-2"
              >
                <Mail className="h-4 w-4 inline mr-1" />
                Contact
              </a>
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                </a>
              )}
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Github className="h-4 w-4 text-gray-900" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No alumni found matching your criteria</p>
        </div>
      )}
    </div>
  );
};
