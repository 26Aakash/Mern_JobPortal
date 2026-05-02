import React, { useState } from 'react'
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'
import Education from './Education'

const Sidebar = ({ handleChange, handleClick }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    salary: true,
    jobType: true,
    experience: true,
    education: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const FilterSection = ({ title, icon: Icon, sectionKey, children }) => (
    <div className='bg-white rounded-xl p-4 border border-slate-100 hover:shadow-sm transition-shadow'>
      <button
        onClick={() => toggleSection(sectionKey)}
        className='w-full flex items-center justify-between mb-4 group'
      >
        <div className='flex items-center gap-2'>
          <Icon className='h-4 w-4 text-blue' />
          <h4 className='text-sm font-semibold text-slate-900'>{title}</h4>
        </div>
        {expandedSections[sectionKey] ? (
          <FiChevronUp className='h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors' />
        ) : (
          <FiChevronDown className='h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors' />
        )}
      </button>

      {expandedSections[sectionKey] && (
        <div className='animate-fade-in'>
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className='space-y-6'>
      {/* Sidebar Header */}
      <div className='flex items-center gap-2'>
        <FiFilter className='h-5 w-5 text-blue' />
        <h3 className='text-xl font-bold text-slate-900'>Filters</h3>
      </div>

      {/* Filter Sections */}
      <div className='divide-y divide-slate-200 space-y-6'>
        <FilterSection title="Location" icon={FiFilter} sectionKey="location">
          <Location handleChange={handleChange} />
        </FilterSection>

        <FilterSection title="Salary Range" icon={FiFilter} sectionKey="salary">
          <Salary handleChange={handleChange} handleClick={handleClick} />
        </FilterSection>

        <FilterSection title="Job Type" icon={FiFilter} sectionKey="jobType">
          <EmploymentType handleChange={handleChange} />
        </FilterSection>

        <FilterSection title="Experience Level" icon={FiFilter} sectionKey="experience">
          <WorkExperience handleChange={handleChange} />
        </FilterSection>

        <FilterSection title="Education" icon={FiFilter} sectionKey="education">
          <Education handleChange={handleChange} />
        </FilterSection>
      </div>
    </div>
  )
}

export default Sidebar