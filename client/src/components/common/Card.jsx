import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8">
      {children}
    </div>
  );
};

export default Card;