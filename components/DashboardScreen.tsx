import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChildProfile } from '../types';
import { NAV_ITEMS } from '../constants';
import { 
  Sparkles, 
  Bell, 
  Zap,
  Lock,
  CheckCircle,
  ChevronRight,
  Battery,
  AlertCircle,
  Lightbulb,
  PlayCircle,
  BookOpen,
  Flame,
  Headphones,
  MessageCircle,
  Settings,
  BarChart2
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

// --- ASSETS & MOCK DATA ---

const MilaLogo = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="flex-shrink-0">
    <path d="M30 20 Q 20 30, 20 45 Q 20 65, 35 75 Q 45 82, 50 85 Q 45 80, 40 70 Q 35 60, 35 45 Q 35 30, 40 25 Z" fill="none" stroke="#7E9F95" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90" />
    <path d="M 40 25 Q 50 15, 60 20 Q 70 25, 75 35" fill="none" stroke="#7E9F95" strokeWidth="3.5" strokeLinecap="round" className="opacity-90" />
    <path d="M 50 45 Q 55 40, 62 42 Q 68 44, 70 50 Q 72 58, 68 65 Q 64 70, 58 70 Q 52 70, 48 65" fill="none" stroke="#D68C7F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="60" cy="50" r="8" fill="#D68C7F" opacity="0.15" />
    <path d="M 75 35 Q 78 45, 75 55 Q 72 65, 65 72" fill="none" stroke="#D68C7F" strokeWidth="3.5" strokeLinecap="round" className="opacity-85" />
  </svg>
);

const SOS_ACTIONS = [
  { id: 'hitting', label: '😡 Vurma / Şiddet', color: 'bg-[#FED7D7] text-[#C53030] border-[#FEB2B2]' },
  { id: 'tantrum', label: '📢 Kriz / Çığlık', color: 'bg-[#FEEBC8] text-[#C05621] border-[#FBD38D]' },
  { id: 'screen', label: '📵 Ekran Kavgası', color: 'bg-[#E2E8F0] text-[#4A5568] border-[#CBD5E0]' },
  { id: 'sleep', label: '🌙 Uyumuyor', color: 'bg-[#E9D8FD] text-[#6B46C1] border-[#D6BCFA]' },
  { id: 'food', label: '🥦 Yemiyor', color: 'bg-[#C6F6D5] text-[#2F855A] border-[#9AE6B4]' },
];

const DAILY_QUESTS = [
  { id: 1, title: "Sabah Rutini", status: "completed", reward: "10 Puan" },
  { id: 2, title: "Ödev Saati", status: "active", reward: "20 Puan" },
  { id: 3, title: "Akşam Kitabı", status: "locked", reward: "50 Puan" },
];

const LIBRARY_CONTENT = [
    { id: 1, title: "Sınır Koyma Sanatı", type: "audio", locked: false, duration: "5dk" },
    { id: 2, title: "DEHB ve Dopamin", type: "read", locked: true, duration: "3dk" },
    { id: 3, title: "Öfke Yönetimi 101", type: "audio", locked: true, duration: "10dk" },
    { id: 4, title: "Uyku Öncesi Sakinleşme", type: "read", locked: false, duration: "4dk" },
];

const CHAT_STARTERS = [
    "Çocuğum ödev yapmak istemiyor, ne yapmalıyım?",
    "Şu an çok tükenmiş hissediyorum.",
    "Sürekli 'Hayır' demekten yoruldum.",
    "Uyku saatleri her gün bir savaş."
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [batteryValue, setBatteryValue] = useState(50);
  const [isBatteryInteracting, setIsBatteryInteracting] = useState(false);
  const [activeCrisis, setActiveCrisis] = useState<string | null>(null);

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="space-y-6 pb-24 pt-2">
         {/* 1. HERO: SOS ACTION CHIPS (Horizontal Scroll) */}
         <section>
            <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center space-x-2">
                    <AlertCircle size={16} className="text-[#D68C7F] animate-pulse" />
                    <span className="text-xs font-bold text-[#D68C7F] uppercase tracking-wider">SOS: Şu an ne oluyor?</span>
                </div>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide snap-x">
                {SOS_ACTIONS.map((action) => (
                    <motion.button
                        key={action.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCrisis(action.id)}
                        className={`flex-shrink-0 px-5 py-4 rounded-2xl border-2 font-bold text-sm whitespace-nowrap shadow-sm transition-all snap-start ${
                            activeCrisis === action.id 
                            ? 'ring-4 ring-[#D68C7F]/20 scale-105' 
                            : ''
                        } ${action.color}`}
                    >
                        {action.label}
                    </motion.button>
                ))}
            </div>
            {activeCrisis && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-[#D68C7F] text-white p-4 rounded-2xl shadow-lg shadow-[#D68C7F]/30 flex justify-between items-center mx-1"
                >
                    <span className="font-medium text-sm">Mila senaryoyu hazırlıyor...</span>
                    <button className="bg-white text-[#D68C7F] px-4 py-2 rounded-xl text-xs font-bold">
                        Çözümü Gör →
                    </button>
                </motion.div>
            )}
        </section>

        {/* 2. PARENT BATTERY (Interactive Slider) */}
        <section>
            <div className="bg-white rounded-[32px] p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <Battery size={18} className={batteryValue < 30 ? "text-[#E53E3E]" : "text-[#7E9F95]"} />
                        <span className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Senin Enerjin</span>
                    </div>
                    <span className={`text-lg font-bold ${batteryValue < 30 ? "text-[#E53E3E]" : "text-[#2D3748]"}`}>
                        %{batteryValue}
                    </span>
                </div>

                {/* Interactive Slider */}
                <div className="relative h-12 flex items-center">
                    <div className="absolute w-full h-4 bg-[#F7FAFC] rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                                batteryValue < 30 ? 'bg-[#E53E3E]' : batteryValue < 60 ? 'bg-[#E8C3B0]' : 'bg-[#7E9F95]'
                            }`}
                            style={{ width: `${batteryValue}%` }}
                        />
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={batteryValue}
                        onChange={(e) => {
                            setBatteryValue(parseInt(e.target.value));
                            setIsBatteryInteracting(true);
                        }}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div 
                        className="absolute w-8 h-8 bg-white border-2 border-[#E2E8F0] rounded-full shadow-md pointer-events-none transition-all duration-100 z-10 flex items-center justify-center text-xs"
                        style={{ left: `calc(${batteryValue}% - 16px)` }}
                    >
                        ⚡️
                    </div>
                </div>

                {/* Conditional Action */}
                <AnimatePresence>
                    {isBatteryInteracting && batteryValue < 40 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                        >
                            <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-[#C53030] text-xs font-bold mb-1">⚠️ Pil Seviyesi Düşük</p>
                                    <p className="text-[#E53E3E] text-[10px]">Önce kendinize maske takın.</p>
                                </div>
                                <button className="bg-white text-[#C53030] px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-[#FEB2B2]">
                                    3dk Nefes 🧘‍♀️
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>

        {/* 3. DAILY QUESTS (Gamification Rail) */}
        <section>
             <h3 className="text-sm font-serif text-[#2D3748] italic mb-3 px-1">Bugünün Görevleri</h3>
             <div className="flex space-x-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide snap-x">
                 {DAILY_QUESTS.map((quest) => {
                     const isLocked = quest.status === 'locked';
                     const isCompleted = quest.status === 'completed';
                     
                     return (
                         <div key={quest.id} className={`
                            min-w-[140px] h-36 rounded-[24px] p-4 flex flex-col justify-between relative snap-start border
                            ${isCompleted ? 'bg-[#F0FFF4] border-[#C6F6D5]' : 
                              isLocked ? 'bg-[#FAFAF8] border-[#EDF2F7] opacity-70' : 
                              'bg-white border-[#E2E8F0] shadow-sm'}
                         `}>
                             <div className="flex justify-between items-start">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg
                                     ${isCompleted ? 'bg-[#C6F6D5]' : isLocked ? 'bg-[#EDF2F7]' : 'bg-[#E8C3B0]/20'}
                                 `}>
                                     {isCompleted ? '✅' : isLocked ? '🔒' : '🎯'}
                                 </div>
                             </div>
                             <div>
                                 <p className={`text-xs font-bold mb-1 ${isCompleted ? 'text-[#2F855A]' : 'text-[#4A4A4A]'}`}>
                                     {quest.title}
                                 </p>
                                 <p className="text-[10px] text-[#A0AEC0] font-medium">{quest.reward}</p>
                             </div>
                         </div>
                     )
                 })}
             </div>
        </section>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6 pb-24 pt-2">
        {/* Massive Streak Header */}
        <div className="text-center py-6">
             <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FFF5F5] rounded-full border-4 border-[#FFF5F5] shadow-inner mb-4 relative">
                 <Flame size={48} className="text-[#E53E3E] animate-pulse" />
                 <div className="absolute bottom-0 right-0 bg-[#E53E3E] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                     🔥 3 Gün
                 </div>
             </div>
             <h2 className="text-2xl font-serif text-[#2D3748] mb-1">Harika Gidiyorsun!</h2>
             <p className="text-xs text-[#718096]">Her gün %1 daha iyiye.</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-4">
            {LIBRARY_CONTENT.map((item) => (
                <motion.div 
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                        item.locked ? 'bg-[#FAFAF8] border-[#EDF2F7] opacity-80' : 'bg-white border-[#E2E8F0] shadow-sm'
                    }`}
                >
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                            ${item.type === 'audio' ? 'bg-[#E9D8FD] text-[#6B46C1]' : 'bg-[#E6FFFA] text-[#319795]'}
                        `}>
                            {item.type === 'audio' ? <Headphones size={18} /> : <BookOpen size={18} />}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#2D3748]">{item.title}</h4>
                            <p className="text-[10px] text-[#A0AEC0]">{item.duration} • {item.type === 'audio' ? 'Dinle' : 'Oku'}</p>
                        </div>
                    </div>
                    {item.locked ? <Lock size={16} className="text-[#CBD5E0]" /> : <PlayCircle size={20} className="text-[#7E9F95]" />}
                </motion.div>
            ))}
        </div>
    </div>
  );

  const renderChat = () => (
      <div className="h-full flex flex-col pb-24 pt-2">
          {/* Zero State */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <div className="w-16 h-16 bg-[#7E9F95]/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={32} className="text-[#7E9F95]" />
              </div>
              <h2 className="text-xl font-serif text-[#2D3748] mb-2">Merhaba, ben Mila.</h2>
              <p className="text-sm text-[#718096] mb-8 max-w-xs">
                  Seni yargılamadan dinlemek ve çözüm üretmek için buradayım. Nereden başlayalım?
              </p>
              
              {/* Conversation Starters */}
              <div className="w-full space-y-3">
                  {CHAT_STARTERS.map((starter, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#4A4A4A] text-left shadow-sm hover:border-[#7E9F95] transition-all"
                      >
                          {starter}
                      </motion.button>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 pb-24 pt-2">
        <div className="bg-white rounded-[32px] p-6 border border-[#E2E8F0] shadow-sm text-center">
             <div className="w-20 h-20 bg-[#E8C3B0] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl border-4 border-white shadow-md">
                 🐣
             </div>
             <h2 className="text-xl font-serif text-[#2D3748] mb-1">{profile.name}</h2>
             <p className="text-xs text-[#A0AEC0]">{profile.age} Yaş • {profile.gender}</p>
        </div>

        <div className="bg-[#FAFAF8] rounded-2xl p-1">
            <button className="w-full p-4 flex items-center justify-between bg-white rounded-xl shadow-sm mb-1">
                <div className="flex items-center space-x-3">
                    <BarChart2 size={18} className="text-[#7E9F95]" />
                    <span className="text-sm font-medium text-[#2D3748]">Gelişim Raporu</span>
                </div>
                <ChevronRight size={16} className="text-[#CBD5E0]" />
            </button>
            <button className="w-full p-4 flex items-center justify-between bg-white rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                    <Settings size={18} className="text-[#7E9F95]" />
                    <span className="text-sm font-medium text-[#2D3748]">Üyelik Ayarları</span>
                </div>
                <ChevronRight size={16} className="text-[#CBD5E0]" />
            </button>
        </div>
    </div>
  );

  return (
    <div className="h-full bg-[#FAFAF8] flex flex-col relative overflow-hidden">
       {/* Aurora Background */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="pt-8 px-6 pb-3 flex justify-between items-center relative z-10 bg-[#FAFAF8]/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <MilaLogo size={40} />
        <div>
             {activeTab === 'home' && <h1 className="text-lg font-serif text-[#2D3748]">İyi günler, {profile.parentName}</h1>}
             {activeTab === 'library' && <h1 className="text-lg font-serif text-[#2D3748]">Ebeveyn Akademisi</h1>}
             {activeTab === 'chat' && <h1 className="text-lg font-serif text-[#2D3748]">Mila Asistan</h1>}
             {activeTab === 'profile' && <h1 className="text-lg font-serif text-[#2D3748]">Hesap</h1>}
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm relative">
             <Bell size={16} className="text-[#7E9F95]" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-[#E8C3B0] rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 scrollbar-hide relative z-10">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'library' && renderLibrary()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'chat' && renderChat()}
                  </div>
                  
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-6 py-4 flex justify-around z-20 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 relative transition-all duration-300 ${
                isActive ? 'scale-110' : 'opacity-50 scale-100'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-[#7E9F95]/10' : 'bg-transparent'}`}>
                  <IconComponent 
                    size={24} 
                    className={`transition-colors ${isActive ? 'text-[#7E9F95]' : 'text-[#A0AEC0]'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
              </div>
              {isActive && (
                <motion.div
                  layoutId="navGlow"
                  className="absolute inset-0 bg-[#7E9F95]/5 rounded-xl blur-md -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
