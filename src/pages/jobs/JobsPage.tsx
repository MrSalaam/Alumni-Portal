import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, Building2 } from 'lucide-react';
import { jobService } from '../../services/job.service';
import type { Job, JobFilters, Pagination as PaginationType } from '../../types';
import { Card, Badge, EmptyState, Loading, Pagination, Button } from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';

export const JobsPage: React.FC = () => {
  const { profile } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    perPage: 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<JobFilters>({});

  useEffect(() => {
    fetchJobs();
  }, [pagination.page, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const result = await jobService.getAllJobs(filters, pagination.page, pagination.perPage);
      setJobs(result.jobs);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeBadgeVariant = (jobType: string) => {
    switch (jobType) {
      case 'full-time':
        return 'primary';
      case 'part-time':
        return 'secondary';
      case 'contract':
        return 'warning';
      case 'internship':
        return 'success';
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
              <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
              <p className="mt-1 text-gray-600">
                Discover opportunities shared by our alumni network
              </p>
            </div>
            {profile?.role === 'alumni' && (
              <Link to="/jobs/post">
                <Button>Post a Job</Button>
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
                placeholder="Search jobs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({ 
                    ...filters, 
                    job_type: value ? [value as any] : undefined 
                  });
                }}
              >
                <option value="">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.location || ''}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                placeholder="Company..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.company || ''}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <Loading />
        ) : jobs.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={48} />}
            title="No jobs found"
            description="There are no job postings matching your criteria. Try adjusting your filters."
            action={
              profile?.role === 'alumni' && (
                <Link to="/jobs/post">
                  <Button>Post the First Job</Button>
                </Link>
              )
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Link key={job.id} to={`/jobs/${job.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {job.title}
                      </h3>
                      <Badge variant={getJobTypeBadgeVariant(job.job_type)}>
                        {job.job_type}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building2 size={16} className="mr-2" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                      {job.description}
                    </p>

                    {job.salary_range && (
                      <div className="text-sm font-semibold text-primary-600">
                        {job.salary_range}
                      </div>
                    )}
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
