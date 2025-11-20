import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChildProfile } from '../types';
import { NAV_ITEMS } from '../constants';
import { 
  Sparkles, 
  Bell, 
  Search, 
  Lock, 
  Trophy, 
  ChevronRight, 
  PlayCircle, 
  BrainCircuit, 
  BookOpen, 
  Star
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('chat');

  // Mock Data for Discovery Carousel
  const discoveryItems = [
    { 
      id: 1, 
      type: 'test', 
      title: 'Ebeveynlik Stilin Ne?', 
      subtitle: '3 dakikalık test',
      icon: BrainCircuit, 
      color: 'bg-[#E8C3B0]',
      textColor: 'text-[#9C4221]',
      isLocked: false 
    },
    { 
      id: 2, 
      type: 'article', 
      title: '2 Yaş Sendromu Kılavuzu', 
      subtitle: 'Kriz anında ne yapmalı?',
      icon: BookOpen, 
      color: 'bg-[#7E9F95]',
      textColor: 'text-[#2C5248]',
      isLocked: true 
    },
    { 
      id: 3, 
      type: 'course', 
      title: 'Sınır Koyma Sanatı', 
      subtitle: 'Ders 4: Hayır Diyebilmek',
      icon: PlayCircle, 
      color: 'bg-[#D8E2DC]',
      textColor: 'text-[#4A5568]',
      isLocked: true 
    },
  ];

  return (
    <div className="h-full bg-[#FAFAF8] flex flex-col relative overflow-hidden">
       {/* Aurora Background (Subtle) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="pt-12 px-6 pb-2 flex justify-between items-center relative z-10">
        <div>
          <p className="text-[#A0AEC0] text-[10px] uppercase tracking-wider font-medium">İyi ki geldin,</p>
          <h1 className="text-xl font-serif text-[#2D3748]">Merhaba {profile.parentName}</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm relative">
             <Bell size={16} className="text-[#7E9F95]" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-[#E8C3B0] rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 space-y-6 scrollbar-hide relative z-10 pt-2">
        
        {/* 1. GAMIFICATION SECTION (Hero - Retention Hook) */}
        <section>
          <div className="bg-white rounded-3xl p-5 border border-[#F0F0F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
              {/* Progress Header */}
              <div className="flex justify-between items-end mb-3">
                  <div>
                      <div className="flex items-center space-x-2 mb-1">
                          <Trophy size={14} className="text-[#D68C7F]" />
                          <span className="text-[10px] font-bold text-[#D68C7F] uppercase tracking-wider">Seviye 3</span>
                      </div>
                      <h3 className="text-lg font-serif text-[#2D3748] leading-none">Bilinçli Ebeveyn</h3>
                  </div>
                  <div className="text-right">
                      <span className="text-xs font-medium text-[#718096]">%65</span>
                  </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#F7FAFC] rounded-full mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#D68C7F] to-[#E8C3B0] rounded-full"
                  ></motion.div>
              </div>

              {/* Daily Task CTA */}
              <div className="flex items-center justify-between bg-[#FAFAF8] rounded-2xl p-3 border border-[#F0F0F0]">
                  <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#7E9F95]/10 flex items-center justify-center text-[#7E9F95]">
                          <PlayCircle size={16} fill="currentColor" className="text-[#7E9F95]/20" />
                      </div>
                      <div>
                          <p className="text-[10px] text-[#A0AEC0]">Bugünkü Görevin</p>
                          <p className="text-xs font-medium text-[#2D3748]">Ders 4: Sınır Koyma</p>
                      </div>
                  </div>
                  <button className="bg-[#2D3748] text-white rounded-full p-2 shadow-md hover:scale-105 transition-transform">
                      <ChevronRight size={16} />
                  </button>
              </div>
          </div>
        </section>

        {/* 2. Q&A SECTION (Utility - Engagement) */}
        <section>
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-[#A0AEC0]" />
                </div>
                <input 
                    type="text" 
                    placeholder={`Mila, ${profile.name} uyumuyor, ne yapmalıyım?`}
                    className="w-full py-4 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#4A4A4A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7E9F95]/50 placeholder:text-[#A0AEC0] placeholder:font-light"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                    <button className="bg-[#7E9F95] text-white p-2 rounded-xl shadow-sm opacity-0 group-focus-within:opacity-100 transition-opacity">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>

        {/* 3. DISCOVERY CAROUSEL (Discovery - Upsell) */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-serif text-[#2D3748] italic">Günün Keşifleri</h3>
                <span className="text-[10px] text-[#7E9F95] font-medium">Tümünü Gör</span>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
                {discoveryItems.map((item) => (
                    <motion.div 
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        className={`min-w-[150px] h-40 rounded-3xl p-4 flex flex-col justify-between relative snap-start shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-white/50 ${item.color}/20`}
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-full bg-white/60 ${item.textColor}`}>
                                <item.icon size={16} />
                            </div>
                            {item.isLocked && (
                                <div className="bg-white/80 p-1.5 rounded-full">
                                    <Lock size={12} className="text-[#D68C7F]" />
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <h4 className={`text-sm font-semibold leading-tight mb-1 ${item.textColor}`}>
                                {item.title}
                            </h4>
                            <p className={`text-[10px] opacity-80 ${item.textColor}`}>
                                {item.subtitle}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Daily Quote (Reduced Size) */}
        <section className="pb-6">
            <div className="bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl p-4 flex items-start space-x-3">
                <Sparkles size={16} className="text-[#D68C7F] flex-shrink-0 mt-1" />
                <div>
                    <p className="text-xs text-[#4A4A4A] italic leading-relaxed">
                        "Mükemmel ebeveyn yoktur. Sadece onarmayı bilen gerçek ebeveynler vardır."
                    </p>
                    <p className="text-[10px] text-[#A0AEC0] mt-2 text-right">- D. Winnicott</p>
                </div>
            </div>
        </section>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-6 py-4 flex justify-around z-20">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 relative transition-all ${
                activeTab === item.id ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <IconComponent size={22} className={activeTab === item.id ? 'text-[#7E9F95]' : 'text-[#A0AEC0]'} />
              <span className={`text-[9px] font-medium ${
                activeTab === item.id ? 'text-[#7E9F95]' : 'text-[#A0AEC0]'
              }`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#7E9F95] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
