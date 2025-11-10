import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, showCharCount, maxLength, className = '', value, ...props }, ref) => {
    const charCount = value ? String(value).length : 0;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-3 py-2 
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-y
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
          {showCharCount && maxLength && (
            <p className="text-sm text-gray-500 ml-2">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
