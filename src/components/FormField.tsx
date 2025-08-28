import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, required = false, children, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};