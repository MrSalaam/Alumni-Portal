import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { User, Briefcase, GraduationCap, MapPin, Github, Linkedin } from 'lucide-react';

export const Profile = () => {
  const { profile, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    graduation_year: '',
    major: '',
    current_company: '',
    current_position: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    is_mentor: false,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        graduation_year: profile.graduation_year?.toString() || '',
        major: profile.major || '',
        current_company: profile.current_company || '',
        current_position: profile.current_position || '',
        location: profile.location || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        is_mentor: profile.is_mentor || false,
      });
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!user?.id) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
          major: formData.major,
          current_company: formData.current_company,
          current_position: formData.current_position,
          location: formData.location,
          linkedin_url: formData.linkedin_url,
          github_url: formData.github_url,
          is_mentor: formData.is_mentor,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className="input-field bg-gray-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input-field"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={formData.graduation_year}
                onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Major
              </label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Professional */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Company
              </label>
              <input
                type="text"
                value={formData.current_company}
                onChange={(e) => setFormData({ ...formData, current_company: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Position
              </label>
              <input
                type="text"
                value={formData.current_position}
                onChange={(e) => setFormData({ ...formData, current_position: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Location & Social */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location & Social Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
                placeholder="City, Country"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="input-field"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="input-field"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_mentor}
              onChange={(e) => setFormData({ ...formData, is_mentor: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-5 w-5"
            />
            <span className="text-sm font-medium text-gray-700">
              I'm available as a mentor to help students and other alumni
            </span>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
