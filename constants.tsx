import React from 'react';
import { LibraryItem, TestItem } from './types';
import { BookOpen, BrainCircuit, HeartHandshake, Zap, Users, MessageCircle, LayoutDashboard, Compass, Home } from 'lucide-react';

export const LIBRARY_ITEMS: LibraryItem[] = [
  { id: '1', title: 'Dopamin Menüsü Nedir?', category: 'Strateji', readTime: '3 dk', icon: <Zap size={20} /> },
  { id: '2', title: 'Duyusal Aşırı Yüklenme (Meltdown)', category: 'Bilgi', readTime: '5 dk', icon: <BrainCircuit size={20} /> },
  { id: '3', title: 'Vücut İkizleme (Body Doubling)', category: 'Teknik', readTime: '2 dk', icon: <HeartHandshake size={20} /> },
];

export const TEST_ITEMS: TestItem[] = [
  { id: '1', title: 'Duyusal Hassasiyet Taraması', description: 'Ses, ışık ve doku hassasiyetlerini keşfet.', questions: 12 },
  { id: '2', title: 'Yürütücü İşlevler Kontrolü', description: 'Planlama ve odaklanma becerileri.', questions: 15 },
];

// Updated Navigation - User Journey Focused
export const NAV_ITEMS = [
  { id: 'home', label: 'Ana Sayfa', icon: LayoutDashboard },
  { id: 'academy', label: 'Akademi', icon: BookOpen },
  { id: 'discover', label: 'Keşfet', icon: Compass },
  { id: 'community', label: 'Topluluk', icon: Users },
  { id: 'myhome', label: 'Evim', icon: Home },
];