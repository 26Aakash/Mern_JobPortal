import React from 'react'
import { MdSchool } from 'react-icons/md'

const Education = ({ handleChange }) => {
  const educationOptions = [
    { value: "", label: "All Education Levels" },
    { value: "10th Pass", label: "10th Pass" },
    { value: "12th Pass", label: "12th Pass" },
    { value: "Diploma", label: "Diploma" },
    { value: "Graduate", label: "Graduate" },
    { value: "Postgraduate", label: "Postgraduate" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" }
  ]

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <MdSchool className='h-4 w-4 text-blue' />
        <h4 className='text-sm font-semibold text-slate-900'>Education Level</h4>
      </div>

      <div className='space-y-2'>
        {educationOptions.map((option) => (
          <label key={option.value} className='flex items-center gap-3 cursor-pointer group'>
            <input
              type="radio"
              name="education"
              value={option.value}
              onChange={handleChange}
              className='w-4 h-4 text-blue border-slate-300 focus:ring-blue/20 focus:ring-2'
            />
            <span className='text-sm text-slate-700 group-hover:text-slate-900 transition-colors'>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Education