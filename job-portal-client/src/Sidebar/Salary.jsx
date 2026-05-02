import React from "react";
import { FiDollarSign } from "react-icons/fi";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FiDollarSign className="h-4 w-4 text-blue" />
        <h4 className="text-base font-bold text-slate-900">Salary</h4>
      </div>

      {/* Salary Type Buttons */}
      <div className="mb-5 space-y-2">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-3">
          Salary Type
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClickHandler={handleClick} value="" title="Hourly" />
          <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
          <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-3">
          Range
        </p>
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors group">
          <input
            onChange={handleChange}
            type="radio"
            value=""
            name="salary"
            className="w-4 h-4 text-blue bg-slate-100 border-2 border-slate-300 rounded-full cursor-pointer transition-colors focus:ring-2 focus:ring-blue/30 accent-blue"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            Any Salary
          </span>
        </label>

        <InputField
          handleChange={handleChange}
          value={30}
          title="Less than $30,000"
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={50}
          title="Less than $50,000"
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={80}
          title="Less than $80,000"
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={100}
          title="Less than $100,000"
          name="salary"
        />
      </div>
    </div>
  );
};

export default Salary;
