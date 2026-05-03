import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input 
        className={`input ${error ? 'border-danger focus:ring-danger' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};
