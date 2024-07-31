import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'small', className = '', ...props }) => {
  const baseClasses = 'rounded-full transition duration-300 ease-in-out transform shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-[#00356B] text-white hover:bg-[#00356B] focus:ring-[#00356B]',
    secondary: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-400',
    accent: 'bg-blue-300 text-white hover:bg-blue-400 focus:ring-blue-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    '': 'text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-300',
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
