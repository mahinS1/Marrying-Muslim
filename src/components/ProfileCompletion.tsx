import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { ProgressBar } from './ProgressBar';
import { TabNavigation } from './TabNavigation';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ReligiousInfoStep } from './ReligiousInfoStep';
import { FamilyBackgroundStep } from './FamilyBackgroundStep';
import { CareerEducationStep } from './CareerEducationStep';
import { auth, db, realtimeDb } from '../firebase/firebase';
import { ref as dbRef, get as dbGet } from 'firebase/database';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LogoHeader from './LogoHeader';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    aboutMe: string;
    expectations: string;
    healthConditions: string;
  };
  religiousInfo: {
    sunniMuslim: string;
    revertMuslim: string;
    prayerFrequency: string;
    quranReading: string;
    hijab: string;
    beard: string;
  };
  familyBackground: {
    maritalStatus: string;
    children: string;
    wantChildren: string;
    nationality: string;
    motherTongue: string;
    languagesKnown: string;
    country: string;
    city: string;
  };
  careerEducation: {
    education: string;
    occupation: string;
    income: string;
    employmentStatus: string;
  };
}

export const ProfileCompletion: React.FC = () => {
  const [miniToastProgress, setMiniToastProgress] = useState(0);
  // Show mini toast for 1 second with progress bar
  const showMiniToast = (msg: string) => {
    setMiniToast(msg);
    setMiniToastProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setMiniToastProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setMiniToast(null);
      }
    }, 100);
  };
  const [miniToast, setMiniToast] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  // Set default date of birth to 18 years ago
  const getDefaultDOB = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  };
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      aboutMe: '',
      expectations: '',
      healthConditions: '',
    },
    religiousInfo: {
      sunniMuslim: '',
      revertMuslim: '',
      prayerFrequency: '',
      quranReading: '',
      hijab: '',
      beard: '',
    },
    familyBackground: {
      maritalStatus: '',
      children: '',
      wantChildren: '',
      nationality: '',
      motherTongue: '',
      languagesKnown: '',
      country: '',
      city: '',
    },
    careerEducation: {
      education: '',
      occupation: '',
      income: '',
      employmentStatus: '',
    },
  });

  // On mount, retrieve phone from localStorage and store in a ref
  const [signupPhone, setSignupPhone] = useState<string | null>(null);
  useEffect(() => {
    const phone = localStorage.getItem('signupPhone');
    if (phone) setSignupPhone(phone);
  }, []);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Validation functions for each step, return error objects
  const validatePersonalInfo = (data: FormData['personalInfo']) => {
    const errors: any = {};    if (!data.firstName) errors.firstName = 'First Name is Required.';
    if (!data.lastName) errors.lastName = 'Last Name is Required.';
    if (!data.dateOfBirth) errors.dateOfBirth = 'Date Of Birth Is Required.';
    else {
      const dob = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      const day = today.getDate() - dob.getDate();
      let is18 = age > 18 || (age === 18 && (m > 0 || (m === 0 && day >= 0)));
      if (!is18) errors.dateOfBirth = 'You Must Be At Least 18 Years Old.';
      if (dob > today) errors.dateOfBirth = 'Date Of Birth Cannot Be In The Future.';
    }
  if (!data.gender) errors.gender = 'Gender Is Required.';
  if (!data.aboutMe) errors.aboutMe = 'About Me Is Required.';
  if (!data.expectations) errors.expectations = 'Expectations Are Required.';
  if (!data.healthConditions) errors.healthConditions = 'Health Conditions Are Required.';
  // country validation removed
  // phone validation removed
    return errors;
  };
  const validateReligiousInfo = (data: FormData['religiousInfo']) => {
    const errors: any = {};
    if (!data.sunniMuslim) errors.sunniMuslim = 'Required.';
    if (!data.revertMuslim) errors.revertMuslim = 'Required.';
    if (!data.prayerFrequency) errors.prayerFrequency = 'Required.';
    if (!data.quranReading) errors.quranReading = 'Required.';
    if (!data.hijab) errors.hijab = 'Required.';
    if (!data.beard) errors.beard = 'Required.';
    return errors;
  };
  const validateFamilyBackground = (data: FormData['familyBackground']) => {
    const errors: any = {};
    if (!data.maritalStatus) errors.maritalStatus = 'Required.';
    if (!data.children) errors.children = 'Required.';
    if (!data.wantChildren) errors.wantChildren = 'Required.';
    if (!data.nationality) errors.nationality = 'Required.';
    if (!data.motherTongue) errors.motherTongue = 'Required.';
    if (!data.country) errors.country = 'Required.';
    if (!data.city) errors.city = 'Required.';
    return errors;
  };
  const validateCareerEducation = (data: FormData['careerEducation']) => {
  const errors: any = {};
  if (!data.education) errors.education = 'Required.';
  if (!data.occupation) errors.occupation = 'Required.';
  if (!data.income) errors.income = 'Required.';
  // employmentStatus is now optional
  return errors;
  };

  // Error state for each step
  const [stepErrors, setStepErrors] = useState<any>({});
  // Validate and update errors on every change
  const handleStepChange = (section: keyof FormData, data: any) => {
    updateFormData(section, data);
    let errors = {};
    if (section === 'personalInfo') errors = validatePersonalInfo({ ...formData.personalInfo, ...data });
    if (section === 'religiousInfo') errors = validateReligiousInfo({ ...formData.religiousInfo, ...data });
    if (section === 'familyBackground') errors = validateFamilyBackground({ ...formData.familyBackground, ...data });
    if (section === 'careerEducation') errors = validateCareerEducation({ ...formData.careerEducation, ...data });
    setStepErrors(errors);
    // Remove error display if all errors are gone
    if (Object.keys(errors).length === 0) setShowErrors(false);
  };

  const handleNext = () => {
    let errors = {};
    if (currentStep === 1) errors = validatePersonalInfo(formData.personalInfo);
    if (currentStep === 2) errors = validateReligiousInfo(formData.religiousInfo);
    if (currentStep === 3) errors = validateFamilyBackground(formData.familyBackground);
    setStepErrors(errors);
    setShowErrors(Object.keys(errors).length > 0);
    if (Object.keys(errors).length === 0 && currentStep < totalSteps) {
      // Show success toast for step completion
      let stepName = '';
      if (currentStep === 1) stepName = 'Personal Information';
      else if (currentStep === 2) stepName = 'Religious Information';
  else if (currentStep === 3) stepName = 'Family & Background';
      
  showMiniToast(`${stepName} ✓`);
      
      setCurrentStep(currentStep + 1);
      setShowErrors(false);
      setStepErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowErrors(false);
      setStepErrors({});
    } else {
      // On the first step, go back to dashboard
      navigate('/dashboard');
    }
  };

  const handleCompleteProfile = async () => {
    let errors = validatePersonalInfo(formData.personalInfo);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(1);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateReligiousInfo(formData.religiousInfo);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(2);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateFamilyBackground(formData.familyBackground);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(3);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateCareerEducation(formData.careerEducation);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(4);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    setShowErrors(false);
    setStepErrors({});
    const user = auth.currentUser;
    if (!user) {
      toast.error('No authenticated user found. Please log in first.');
      return;
    }
    try {
      setCreatingProfile(true);
      // Try to get phone from Realtime DB if not in localStorage
      let phoneToSave = signupPhone;
      if (!phoneToSave && user) {
        try {
          const snap = await dbGet(dbRef(realtimeDb, 'users/' + user.uid + '/phone'));
          if (snap.exists()) phoneToSave = snap.val();
        } catch (e) {}
      }
      await setDoc(doc(db, 'userProfileData', user.uid), {
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          phone: phoneToSave || '',
        },
        profileCompleted: true,
        profileCompletedAt: new Date().toISOString()
      });
      // Remove phone from localStorage after saving
      localStorage.removeItem('signupPhone');
  showMiniToast('Profile saved ✓');
      setTimeout(() => navigate('/profile'), 1200);
    } catch (error: any) {
      toast.error('Failed to save profile: ' + error.message);
    } finally {
      setCreatingProfile(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => handleStepChange('personalInfo', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 2:
        return (
          <ReligiousInfoStep
            data={formData.religiousInfo}
            onChange={(data) => handleStepChange('religiousInfo', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 3:
        return (
          <FamilyBackgroundStep
            data={formData.familyBackground}
            onChange={(data) => handleStepChange('familyBackground', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 4:
        return (
          <CareerEducationStep
            data={formData.careerEducation}
            onChange={(data) => handleStepChange('careerEducation', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {miniToast && (
        <div style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          background: 'white',
          color: 'black',
          fontSize: '0.85rem',
          borderRadius: '8px',
          padding: '8px 14px 14px 14px',
          zIndex: 9999,
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          minWidth: 'auto',
          maxWidth: '180px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          <div>{miniToast}</div>
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '6px',
            background: 'green',
            borderRadius: '0 0 8px 8px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${miniToastProgress}%`,
              height: '100%',
              background: '#fff',
              transition: 'width 0.1s linear',
            }} />
          </div>
        </div>
      )}
      <LogoHeader/>
      <div className="min-h-screen bg-pink-50 py-4 sm:py-6 px-2 sm:px-4 md:py-8 flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 lg:p-8 w-full md:w-[60%]" style={{margin: '0 auto'}}>
          <div className="flex flex-row items-center justify-between mb-4 sm:mb-6 gap-2" style={{width: '100%'}}>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-0 text-left">Complete Your Profile</h1>
            <div className="flex items-center justify-end w-auto">
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <TabNavigation
            currentStep={currentStep}
            onTabClick={setCurrentStep}
          />
          {renderCurrentStep()}
          <div className="flex flex-row justify-between items-center mt-6 sm:mt-8 gap-3 w-full">
            <button
              onClick={handlePrevious}
              disabled={creatingProfile}
              className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                creatingProfile
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={16} className="sm:w-4 sm:h-4 w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={currentStep === totalSteps ? handleCompleteProfile : handleNext}
              disabled={creatingProfile}
              className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                currentStep === totalSteps
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-[#DC2626] text-white hover:bg-red-700'
              } ${creatingProfile ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {creatingProfile
                ? 'Creating...'
                : currentStep === totalSteps
                  ? (<><Check size={16} className="mr-2 sm:w-5 sm:h-5 w-4 h-4" /><span>Complete Profile</span></>)
                  : (<><span>Next</span> <ChevronRight size={16} className="sm:w-4 sm:h-4 w-4 h-4" /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};