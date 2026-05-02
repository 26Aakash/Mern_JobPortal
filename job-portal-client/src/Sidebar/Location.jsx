import React from "react";
import { FiMapPin } from "react-icons/fi";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FiMapPin className="h-4 w-4 text-blue" />
        <h4 className="text-base font-bold text-slate-900">Location</h4>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors group">
          <input
            onChange={handleChange}
            type="radio"
            value=""
            name="location"
            className="w-4 h-4 text-blue bg-slate-100 border-2 border-slate-300 rounded-full cursor-pointer transition-colors focus:ring-2 focus:ring-blue/30 accent-blue"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            All Locations
          </span>
        </label>
        <InputField
          handleChange={handleChange}
          value="london"
          title="London"
          name="location"
        />
        <InputField
          handleChange={handleChange}
          value="seattle"
          title="Seattle"
          name="location"
        />
        <InputField
          handleChange={handleChange}
          value="madrid"
          title="Madrid"
          name="location"
        />
        <InputField
          handleChange={handleChange}
          value="boston"
          title="Boston"
          name="location"
        />
      </div>
    </div>
  );
};

export default Location;
