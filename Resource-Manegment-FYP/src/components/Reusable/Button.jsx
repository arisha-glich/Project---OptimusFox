
import React from 'react';

const Button = ({ children, onClick, variant = '', size = 'normal', className = '', ...props }) => {
  const baseClasses = 'rounded transition duration-300 ease-in-out';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    accent: 'bg-red-500 text-white hover:bg-red-600',
    '': 'text-gray-700 border border-gray-300 hover:bg-gray-100',
  };

  const sizeClasses = {
    normal: 'py-2 px-4',
    small: 'py-1 px-2 text-sm',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
