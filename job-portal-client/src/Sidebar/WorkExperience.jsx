import React from 'react'
import { FiBriefcase } from 'react-icons/fi'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FiBriefcase className="h-4 w-4 text-blue" />
        <h4 className="text-base font-bold text-slate-900">Experience</h4>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors group">
          <input onChange={handleChange} type="radio" value="" name="experience" className="w-4 h-4 text-blue bg-slate-100 border-2 border-slate-300 rounded-full cursor-pointer transition-colors focus:ring-2 focus:ring-blue/30 accent-blue" />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Any experience</span>
        </label>
        <InputField
          handleChange={handleChange}
          value="Fresher"
          title="Fresher"
          name="experience"
        />
        <InputField
          handleChange={handleChange}
          value="1-3 years"
          title="1-3 years"
          name="experience"
        />
        <InputField
          handleChange={handleChange}
          value="3-5 years"
          title="3-5 years"
          name="experience"
        />
        <InputField
          handleChange={handleChange}
          value="5+ years"
          title="5+ years"
          name="experience"
        />
      </div>
    </div>
  )
}

export default WorkExperience