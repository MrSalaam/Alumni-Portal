import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to the
              <span className="block text-primary-600">Alumni Portal</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with fellow alumni, discover job opportunities, attend events, 
              and give back through mentorship. Join our vibrant community today.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-primary-500 text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Connect
                </h3>
                <p className="text-gray-600">
                  Network with alumni from different years and industries
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-primary-500 text-4xl mb-4">💼</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Jobs
                </h3>
                <p className="text-gray-600">
                  Discover exclusive job opportunities from fellow alumni
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-primary-500 text-4xl mb-4">📅</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Events
                </h3>
                <p className="text-gray-600">
                  Attend networking events, workshops, and reunions
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-primary-500 text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mentorship
                </h3>
                <p className="text-gray-600">
                  Get guidance from experienced alumni or mentor students
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Alumni Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
