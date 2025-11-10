import { useAuth } from '../hooks/useAuth';
import { Users, Briefcase, Calendar, UserCog, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { profile } = useAuth();

  const stats = [
    {
      title: 'Total Alumni',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-500',
      link: '/directory',
    },
    {
      title: 'Active Jobs',
      value: '45',
      icon: Briefcase,
      color: 'bg-green-500',
      link: '/jobs',
    },
    {
      title: 'Upcoming Events',
      value: '12',
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/events',
    },
    {
      title: 'Active Mentors',
      value: '89',
      icon: UserCog,
      color: 'bg-orange-500',
      link: '/mentorship',
    },
  ];

  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: Users,
      link: '/profile',
    },
    {
      title: 'Browse Jobs',
      description: 'Find your next opportunity',
      icon: Briefcase,
      link: '/jobs',
    },
    {
      title: 'Join Events',
      description: 'Network with fellow alumni',
      icon: Calendar,
      link: '/events',
    },
    {
      title: 'Find a Mentor',
      description: 'Get guidance from experienced alumni',
      icon: UserCog,
      link: '/mentorship',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name || 'User'}!
        </h1>
        <p className="text-primary-100">
          {profile?.role === 'alumni' 
            ? 'Connect with fellow alumni and share your experiences'
            : profile?.role === 'admin'
            ? 'Manage the alumni community and oversee activities'
            : 'Discover opportunities and connect with alumni'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="card hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <action.icon className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 pb-4 border-b border-gray-200">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">New alumni joined the network</p>
              <p className="text-gray-600 text-sm">15 new members this week</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 pb-4 border-b border-gray-200">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">Job postings increased</p>
              <p className="text-gray-600 text-sm">8 new opportunities posted</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">Upcoming networking event</p>
              <p className="text-gray-600 text-sm">Tech Alumni Meetup - Next Friday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
