import React from 'react';

export function Input({ 
  className = '', 
  type = 'text', 
  ...props 
}) {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}