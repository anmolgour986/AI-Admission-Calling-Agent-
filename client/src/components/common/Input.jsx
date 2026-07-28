import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
  onRightIconClick,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-400 transition">

        {icon && (
          <span className="text-slate-400 mr-3">
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-transparent outline-none text-white w-full placeholder:text-slate-400"
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="text-slate-400 hover:text-cyan-400"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;