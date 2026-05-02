import React from "react";
import { FiClock } from "react-icons/fi";
import InputField from "../components/InputField";

const JobPostingData = ({ handleChange }) => {
  const now = new Date(); 
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000); 
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000); 
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000); 

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10); 
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10); 
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10); 

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FiClock className="h-4 w-4 text-blue" />
        <h4 className="text-base font-bold text-slate-900">Date Posted</h4>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors group">
          <input onChange={handleChange} type="radio" value="" name="posting-date" className="w-4 h-4 text-blue bg-slate-100 border-2 border-slate-300 rounded-full cursor-pointer transition-colors focus:ring-2 focus:ring-blue/30 accent-blue" />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">All time</span>
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="posting-date"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title="Last 7 days"
          name="posting-date"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDaysAgoDate}
          title="Last 30 days"
          name="posting-date"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
