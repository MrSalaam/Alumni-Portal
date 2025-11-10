import React from 'react';

export const Loading: React.FC<{ fullScreen?: boolean; size?: 'sm' | 'md' | 'lg' }> = ({ 
  fullScreen = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 border-primary-500 ${sizeClasses[size]}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};
