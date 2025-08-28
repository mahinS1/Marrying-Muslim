import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface ReligiousInfoData {
  sunniMuslim: string;
  revertMuslim: string;
  prayerFrequency: string;
  quranReading: string;
  hijab: string;
  beard: string;
}

interface ReligiousInfoStepProps {
  data: ReligiousInfoData;
  onChange: (data: Partial<ReligiousInfoData>) => void;
  showErrors?: boolean;
  errors?: any;
}

export const ReligiousInfoStep: React.FC<ReligiousInfoStepProps> = ({ data, onChange, showErrors, errors = {} }) => {
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
  
  const sunniOptions = [
    { value: 'Yes Sunni', label: 'Yes Sunni' },
  ];

  const revertOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  const prayerOptions = [
    { value: 'Always', label: 'Always' },
    { value: 'Often', label: 'Often' },
    { value: 'Sometimes', label: 'Sometimes' },
    { value: 'Never', label: 'Never' },
  ];

  const quranOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Occasionally', label: 'Occasionally' },
    { value: 'Never', label: 'Never' },
  ];

  const hijabOptions = [
    { value: 'Niqab', label: 'Niqab' },
    { value: 'Hijab', label: 'Hijab' },
    { value: 'None', label: 'None' },
  ];

  const beardOptions = [
    { value: 'Full Beard', label: 'Full Beard' },
    { value: 'Trimmed', label: 'Trimmed' },
    { value: 'Mustache Only', label: 'Mustache Only' },
    { value: 'Clean Shaven', label: 'Clean Shaven' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
  <div className="bg-white p-2 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-red-600" size={18} />
        <div>
          <h2 className="text-base font-bold text-gray-900">Religious Info</h2>
          <p className="text-xs text-gray-600">Share your religious preferences and practices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <FormField label="Are You a Sunni Muslim?" required error={showErrors ? errors.sunniMuslim : undefined}>
          <CustomDropdown
            options={sunniOptions}
            value={data.sunniMuslim}
            placeholder="Select An Option"
            onChange={(value) => onChange({ sunniMuslim: value })}
            isOpen={openDropdown === 'sunni'}
            onToggle={(isOpen) => handleDropdownToggle('sunni', isOpen)}
          />
        </FormField>

  <FormField label="Are You a Revert Muslim?" required error={showErrors ? errors.revertMuslim : undefined}>
          <CustomDropdown
            options={revertOptions}
            value={data.revertMuslim}
            placeholder="Are You a Revert Muslim?"
            onChange={(value) => onChange({ revertMuslim: value })}
            isOpen={openDropdown === 'revert'}
            onToggle={(isOpen) => handleDropdownToggle('revert', isOpen)}
          />
        </FormField>

  <FormField label="Prayer Frequency" required error={showErrors ? errors.prayerFrequency : undefined}>
          <CustomDropdown
            options={prayerOptions}
            value={data.prayerFrequency}
            placeholder="Prayer Frequency"
            onChange={(value) => onChange({ prayerFrequency: value })}
            isOpen={openDropdown === 'prayer'}
            onToggle={(isOpen) => handleDropdownToggle('prayer', isOpen)}
          />
        </FormField>

  <FormField label="Quran Reading" required error={showErrors ? errors.quranReading : undefined}>
          <CustomDropdown
            options={quranOptions}
            value={data.quranReading}
            placeholder="Quran Reading"
            onChange={(value) => onChange({ quranReading: value })}
            isOpen={openDropdown === 'quran'}
            onToggle={(isOpen) => handleDropdownToggle('quran', isOpen)}
          />
        </FormField>

  <FormField label="Hijab" required error={showErrors ? errors.hijab : undefined}>
          <CustomDropdown
            options={hijabOptions}
            value={data.hijab}
            placeholder="Hijab Preference"
            onChange={(value) => onChange({ hijab: value })}
            isOpen={openDropdown === 'hijab'}
            onToggle={(isOpen) => handleDropdownToggle('hijab', isOpen)}
          />
        </FormField>

  <FormField label="Beard" required error={showErrors ? errors.beard : undefined}>
          <CustomDropdown
            options={beardOptions}
            value={data.beard}
            placeholder="Beard Preference"
            onChange={(value) => onChange({ beard: value })}
            isOpen={openDropdown === 'beard'}
            onToggle={(isOpen) => handleDropdownToggle('beard', isOpen)}
          />
        </FormField>
      </div>
    </div>
  );
};