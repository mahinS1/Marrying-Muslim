import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';
import { countriesList } from '../utils/countries.js';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  aboutMe: string;
  expectations: string;
  healthConditions: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: Partial<PersonalInfoData>) => void;
  showErrors?: boolean;
  errors?: any;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange, showErrors, errors = {} }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  React.useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownMenus = document.querySelectorAll('.custom-dropdown-menu');
      let clickedInside = false;
      dropdownMenus.forEach(menu => {
        if (menu.contains(event.target as Node)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);
  
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  // Get "today - 18 years" in yyyy-mm-dd format for max attribute so users must be at least 18
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const maxDobStr = eighteenYearsAgo.toISOString().split('T')[0];

  return (
    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
        <User className="text-red-600" size={18} />
        <div>
          <h2 className="text-base font-bold text-gray-900">Personal Info</h2>
          <p className="text-xs text-gray-600">Tell us about yourself to help us find your perfect match</p>
        </div>
      </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField label="First Name" required error={showErrors ? errors.firstName : undefined}>
      <input
        type="text"
        value={data.firstName}
        onChange={(e) => {
          const value = e.target.value.replace(/\b\w/g, c => c.toUpperCase());
          onChange({ firstName: value });
        }}
        placeholder="Enter First Name"
        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
      />
    </FormField>

    <FormField label="Last Name" required error={showErrors ? errors.lastName : undefined}>
      <input
        type="text"
        value={data.lastName}
        onChange={(e) => {
          const value = e.target.value.replace(/\b\w/g, c => c.toUpperCase());
          onChange({ lastName: value });
        }}
        placeholder="Enter Last Name"
        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
      />
    </FormField>

    <FormField label="Date of Birth" required error={showErrors ? errors.dateOfBirth : undefined}>
      <input
        type="date"
        value={data.dateOfBirth}
        onChange={(e) => onChange({ dateOfBirth: e.target.value })}
        max={maxDobStr}
        placeholder="dd/mm/yyyy"
        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
      />
    </FormField>

  {/* Phone number field removed as per requirements */}

  {/* Country field removed as per requirements */}


    <FormField label="Gender" required error={showErrors ? errors.gender : undefined}>
      <CustomDropdown
        options={genderOptions}
        value={data.gender}
        placeholder="Select Gender"
        onChange={(value) => onChange({ gender: value })}
        isOpen={openDropdown === 'gender'}
        onToggle={(isOpen) => handleDropdownToggle('gender', isOpen)}
      />
    </FormField>
  </div>

      <FormField label="About Me" required error={showErrors ? errors.aboutMe : undefined}>
        <textarea
          value={data.aboutMe}
          onChange={(e) => onChange({ aboutMe: e.target.value })}
          placeholder="We refrain from allowing detailed descriptions of women or men that may create vivid mental imagery. This is to uphold respect, privacy, and modesty. Thank you for your understanding."
          rows={3}
          className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>

      <FormField label="Expectations" required error={showErrors ? errors.expectations : undefined}>
        <textarea
          value={data.expectations}
          onChange={(e) => onChange({ expectations: e.target.value })}
          placeholder="What do you want to find in an ideal partner?"
          rows={3}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>

      <FormField label="Health Conditions" required error={showErrors ? errors.healthConditions : undefined}>
        <textarea
          value={data.healthConditions}
          onChange={(e) => onChange({ healthConditions: e.target.value })}
          placeholder="Can you tell us about your health conditions?"
          rows={3}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>
    </div>
  );
};