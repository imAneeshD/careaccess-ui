import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
      {children}
    </div>
  );
};
