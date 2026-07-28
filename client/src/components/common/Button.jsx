import React from "react";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-white py-3 rounded-xl font-semibold"
    >
      {children}
    </button>
  );
};

export default Button;