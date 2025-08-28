import React from 'react';
import { User, Heart, Home, Briefcase } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  currentStep: number;
  onTabClick: (step: number) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ currentStep, onTabClick }) => {
  const tabs: Tab[] = [
    { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
    { id: 'religious', label: 'Religious Info', icon: <Heart size={16} /> },
    { id: 'family', label: 'Family & Background', icon: <Home size={16} /> },
    { id: 'career', label: 'Career & Education', icon: <Briefcase size={16} /> },
  ];

  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex flex-nowrap justify-between gap-2 sm:gap-4 overflow-x-auto">
        {tabs.map((tab, index) => {
          const stepIndex = index + 1;
          const isActive = currentStep === stepIndex;
          const isCompleted = currentStep > stepIndex;
          return (
            <button
              key={tab.id}
              onClick={() => onTabClick(stepIndex)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 flex-shrink-0 sm:flex-row sm:gap-2 ${
                stepIndex > currentStep
                  ? 'opacity-50 cursor-not-allowed'
                  : isActive
                  ? 'text-gray-900'
                  : isCompleted
                  ? 'text-[#DC2626]'
                  : 'text-gray-400'
              }`}
              disabled={stepIndex > currentStep}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                stepIndex > currentStep
                  ? 'bg-gray-100 border-2 border-gray-200 opacity-50'
                  : isActive
                  ? 'bg-white border-2 border-black'
                  : isCompleted
                  ? 'bg-red-100 border-2 border-red-300'
                  : 'bg-gray-100 border-2 border-gray-200'
              }`}>
                <div className={`$${
                  stepIndex > currentStep
                    ? 'text-gray-400'
                    : isActive
                    ? 'text-black'
                    : isCompleted
                    ? 'text-[#DC2626]'
                    : 'text-gray-400'
                }`}>
                  {tab.icon}
                </div>
              </div>
              <span className={`hidden lg:inline text-xs font-medium text-center ${
                stepIndex > currentStep
                  ? 'text-gray-400'
                  : isActive
                  ? 'text-gray-900'
                  : isCompleted
                  ? 'text-[#DC2626]'
                  : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};