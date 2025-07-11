import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}
  >
    {children}
  </div>
);

export default Card;
