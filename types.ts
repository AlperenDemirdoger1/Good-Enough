
export enum AppStep {
  WELCOME = 'WELCOME',
  TONE_SELECTION = 'TONE_SELECTION',
  ONBOARDING = 'ONBOARDING',
  ANALYSIS = 'ANALYSIS',
  PAYWALL = 'PAYWALL',
  DASHBOARD = 'DASHBOARD'
}

export enum PersonaType {
  FRIENDLY = 'FRIENDLY',
  LOGICAL = 'LOGICAL',
  COACH = 'COACH'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  magicPayload?: MagicPayload;
}

export interface MagicPayload {
  insight: string;
  neuroType: string;
  socialProof: string;
}

export interface ChildProfile {
  parentName: string;
  name: string;
  age: string;
  gender: string;
  
  // Neuro-Profile Deep Dive
  engine: string; // Dopamine Seeking (Motor)
  brake: string;  // Executive Function (Fren)
  rsd: string;    // Rejection Sensitivity (Kalp)
  nervousSystem: string; // Parent's State (Ayna)

  insight?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  icon: any;
}

export interface TestItem {
  id: string;
  title: string;
  description: string;
  questions: number;
}
