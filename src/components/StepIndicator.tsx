import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center sm:justify-end">
      <span className="bg-white text-[#DC2626] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border-2 border-[#DC2626]">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};