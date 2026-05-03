import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button = ({ variant = 'primary', isLoading, children, className = '', ...props }: ButtonProps) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'bg-danger text-white px-4 py-2 rounded-lg hover:opacity-90 transition';
  
  return (
    <button 
      className={`${variantClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
