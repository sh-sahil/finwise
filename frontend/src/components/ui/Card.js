import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`border rounded-lg shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div 
      className={`border-b pb-3 mb-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 
      className={`text-xl font-semibold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}
