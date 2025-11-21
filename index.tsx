
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ToneSelector } from './components/ToneSelector';
import { OnboardingChat } from './components/OnboardingChat';
import { AnalysisScreen } from './components/AnalysisScreen';
import { PaywallScreen } from './components/PaywallScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AppStep, PersonaType, ChildProfile } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [persona, setPersona] = useState<PersonaType>(PersonaType.FRIENDLY);
  const [profile, setProfile] = useState<ChildProfile | null>(null);

  const handleStart = () => {
    setStep(AppStep.TONE_SELECTION);
  };

  const handleToneSelect = (selectedPersona: PersonaType) => {
    setPersona(selectedPersona);
    setStep(AppStep.ONBOARDING);
  };

  // Chat bittiğinde profil verisini al ve Analiz ekranına geç
  const handleOnboardingComplete = (childProfile: ChildProfile) => {
    setProfile(childProfile);
    setStep(AppStep.ANALYSIS);
  };

  // Analiz ekranında "Çözümü Gör" dendiğinde Paywall'a geç
  const handleAnalysisComplete = () => {
    setStep(AppStep.PAYWALL);
  };

  const handleUnlock = () => {
    // Eğer profile yoksa (debug flow), mock data ekle
    if (!profile) {
      setProfile({
        parentName: 'Debug Parent',
        name: 'Can',
        age: '6',
        gender: 'Erkek',
        engine: 'Keşif Enerjisi 🚀',
        brake: 'Zaman Bükücü ⏳',
        rsd: 'Cam Kalp 💎',
        nervousSystem: 'Güvende 🌿',
      });
    }
    setStep(AppStep.DASHBOARD);
  };

  const handleDebugDashboard = () => {
    setProfile({
        parentName: 'Demo Parent',
        name: 'Demo Child',
        age: '6',
        gender: 'Kız',
        engine: 'Dopamin Arayışı',
        brake: 'Dürtü Kontrolü',
        rsd: 'Hassas',
        nervousSystem: 'Regüle',
    });
    setStep(AppStep.DASHBOARD);
  };

  // Debug Navigation Logic
  const handleNextDebug = () => {
      const steps = Object.values(AppStep);
      const currentIndex = steps.indexOf(step);
      if (currentIndex < steps.length - 1) {
          const nextStep = steps[currentIndex + 1];
          
          // Inject Mock Data if moving to screens that require it
          if ((nextStep === AppStep.ANALYSIS || nextStep === AppStep.PAYWALL || nextStep === AppStep.DASHBOARD) && !profile) {
               setProfile({
                parentName: 'Debug Parent',
                name: 'Debug Child',
                age: '5',
                gender: 'Kız',
                engine: 'Keşif Enerjisi 🚀',
                brake: 'Zaman Bükücü ⏳',
                rsd: 'Cam Kalp 💎',
                nervousSystem: 'Güvende 🌿',
            });
          }
          setStep(nextStep);
      }
  };

  const handlePrevDebug = () => {
      const steps = Object.values(AppStep);
      const currentIndex = steps.indexOf(step);
      if (currentIndex > 0) {
          setStep(steps[currentIndex - 1]);
      }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FAFAF8] shadow-2xl overflow-hidden relative font-sans">
      {/* Debug Navigation Overlay */}
      <div className="fixed bottom-24 right-4 z-[100] flex items-center gap-2 bg-black/80 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/20 opacity-80 hover:opacity-100 transition-opacity">
          <button onClick={handlePrevDebug} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-mono text-white font-bold w-20 text-center truncate">
              {step}
          </span>
          <button onClick={handleNextDebug} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
              <ChevronRight size={16} />
          </button>
      </div>

      {step === AppStep.WELCOME && <WelcomeScreen onStart={handleStart} onDebugDashboard={handleDebugDashboard} />}
      
      {step === AppStep.TONE_SELECTION && <ToneSelector onSelect={handleToneSelect} />}
      
      {step === AppStep.ONBOARDING && (
        <OnboardingChat 
          persona={persona} 
          onComplete={handleOnboardingComplete} 
        />
      )}
      
      {/* Ayrı Analiz Sayfası */}
      {step === AppStep.ANALYSIS && profile && (
        <AnalysisScreen 
          profile={profile} 
          onContinue={handleAnalysisComplete} 
        />
      )}
      
      {step === AppStep.PAYWALL && profile && (
        <PaywallScreen profile={profile} onUnlock={handleUnlock} />
      )}

      {step === AppStep.DASHBOARD && profile && (
        <DashboardScreen profile={profile} />
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
