import React from "react";

export const Button = ({ children, variant = "primary", size = "md", ...props }) => {
  const baseStyle = "px-4 py-2 rounded font-bold";
  const variantStyles = {
    primary: `${baseStyle} bg-blue-600 text-white`,
    outline: `${baseStyle} border border-blue-600 text-blue-600`,
  };
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
