import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 h-2 sm:h-3 rounded-full mb-4 sm:mb-6">
      <div 
        className="bg-[#DC2626] h-2 sm:h-3 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};