import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card } from '../../components/common';

export const DashboardPage: React.FC = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {profile?.full_name || user?.email}
              </span>
              <Button onClick={signOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Alumni Portal
            </h2>
            <p className="text-gray-600 mb-4">
              This is your dashboard. More features coming soon!
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
                <p><strong>Role:</strong> {profile?.role || 'Not set'}</p>
                <p><strong>Verified:</strong> {profile?.is_verified ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
