import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import { FormField } from "./FormField";
import { CustomDropdown } from "./CustomDropdown";

interface CareerEducationData {
  education: string;
  occupation: string;
  income: string;
  employmentStatus: string;
}

interface CareerEducationStepProps {
  data: CareerEducationData;
  onChange: (data: Partial<CareerEducationData>) => void;
  showErrors?: boolean;
  errors?: any;
}

export const CareerEducationStep: React.FC<CareerEducationStepProps> = ({
  data,
  onChange,
  showErrors,
  errors = {},
}) => {
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

  const educationOptions = [
    { value: "High School", label: "High School" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" },
    { value: "Diploma", label: "Diploma" },
    { value: "Other", label: "Other" },
  ];

  const incomeOptions = [
    { value: "Under £30,000", label: "Under £30,000" },
    { value: "£30,000 - £50,000", label: "£30,000 - £50,000" },
    { value: "£50,000 - £75,000", label: "£50,000 - £75,000" },
    { value: "£75,000 - £100,000", label: "£75,000 - £100,000" },
    { value: "Over £100,000", label: "Over £100,000" },
    { value: "Prefer Not To Say", label: "Prefer Not To Say" },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="text-red-600" size={18} />
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Career & Education
          </h2>
          <p className="text-xs text-gray-600">
            Share your professional and educational background
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Education Level"
          required
          error={showErrors ? errors.education : undefined}
        >
          <CustomDropdown
            options={educationOptions}
            value={data.education}
            placeholder="Select Education Level"
            onChange={(value) => onChange({ education: value })}
            isOpen={openDropdown === "education"}
            onToggle={(isOpen) => handleDropdownToggle("education", isOpen)}
          />
        </FormField>

        <FormField
          label="Occupation"
          required
          error={showErrors ? errors.occupation : undefined}
        >
          <input
            type="text"
            value={data.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            placeholder="Enter Your Occupation"
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

       <div className="md:col-span-2">
          <FormField
            label="Annual Income"
            required
            error={showErrors ? errors.income : undefined}
          >
            <CustomDropdown
              options={incomeOptions}
              value={data.income}
              placeholder="Select Income Range"
              onChange={(value) => onChange({ income: value })}
              isOpen={openDropdown === "income"}
              onToggle={(isOpen) => handleDropdownToggle("income", isOpen)}
              className="w-full"
            />
          </FormField>
       </div>

        {/* <FormField
          label="Employment Status"
          required
          error={showErrors ? errors.employmentStatus : undefined}
        >
          <select
            value={data.employmentStatus || ''}
            onChange={e => onChange({ employmentStatus: e.target.value })}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          >
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </select>
        </FormField> */}
      </div>
    </div>
  );
};
