import React from 'react';

const InputField = ({ handleChange, value, title, name }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors group">
      <input
        onChange={handleChange}
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 text-blue bg-slate-100 border-2 border-slate-300 rounded-full cursor-pointer transition-colors focus:ring-2 focus:ring-blue/30 accent-blue"
      />
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
        {title}
      </span>
    </label>
  );
};

export default InputField;
