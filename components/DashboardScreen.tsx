import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  BatteryLow,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

// MOCK DATA (Replace with real data later)
const CRISIS_SCENARIOS = [
  "Vuruyor / Fiziksel Saldırganlık",
  "Dinlemiyor / Yok Sayıyor",
  "Öfke Nöbeti / Tantrum",
  "Ekran Bırakmıyor",
  "Uyumak İstemiyor",
  "Yemek Yemiyor"
];

const ROUTINE_TASKS = [
  { id: 1, title: "Ödev Zamanı", status: "active", icon: "📚", timeLeft: "20dk" },
  { id: 2, title: "Ekran Süresi", status: "locked", icon: "🎮", reward: "30dk", prerequisite: 1 },
  { id: 3, title: "Akşam Yemeği", status: "pending", icon: "🍽️", time: "18:30" },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedCrisis, setSelectedCrisis] = useState('');
  const [parentEnergy, setParentEnergy] = useState(calculateParentEnergy(profile.nervousSystem));

  return (
    <div className="h-full bg-[#FAFAF8] flex flex-col relative overflow-hidden">
       {/* Aurora Background (Subtle) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="pt-10 px-6 pb-3 flex justify-between items-center relative z-10 bg-[#FAFAF8]/95 backdrop-blur-sm">
        <div>
          <p className="text-[#A0AEC0] text-[10px] uppercase tracking-wider font-medium">Kontrol Merkezi</p>
          <h1 className="text-xl font-serif text-[#2D3748]">{profile.name} için Bugün</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm relative">
             <Bell size={16} className="text-[#7E9F95]" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-[#E8C3B0] rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 space-y-5 scrollbar-hide relative z-10">
        
        {/* 1. HERO: SOS ACTION (Crisis Management) */}
        <section className="mt-3">
          <div className="bg-gradient-to-br from-[#D68C7F]/10 to-[#E8C3B0]/20 rounded-3xl p-5 border border-[#E8C3B0]/30 shadow-[0_4px_20px_rgba(214,140,127,0.08)] relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D68C7F]/10 rounded-bl-full"></div>
              
              <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-3">
                      <AlertCircle size={16} className="text-[#D68C7F]" />
                      <span className="text-xs text-[#D68C7F] font-bold uppercase tracking-wider">SOS Destek</span>
                  </div>
                  
                  <h3 className="text-lg font-serif text-[#2D3748] leading-tight mb-4">
                    {profile.name} ile şu an zorlanıyor musun?
                  </h3>
                  
                  {/* Crisis Dropdown */}
                  <select 
                    value={selectedCrisis}
                    onChange={(e) => setSelectedCrisis(e.target.value)}
                    className="w-full p-3 mb-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#4A4A4A] outline-none focus:border-[#D68C7F] focus:ring-2 focus:ring-[#D68C7F]/20"
                  >
                      <option value="">Ne oluyor şu an?</option>
                      {CRISIS_SCENARIOS.map((scenario, idx) => (
                          <option key={idx} value={scenario}>{scenario}</option>
                      ))}
                  </select>

                  {/* Get Script Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedCrisis}
                    className={`w-full py-3.5 rounded-2xl flex items-center justify-center font-semibold transition-all
                        ${selectedCrisis 
                            ? 'bg-[#D68C7F] text-white shadow-lg hover:shadow-xl' 
                            : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'}
                    `}
                  >
                      <Zap size={18} className="mr-2" />
                      <span>Hemen Senaryo Oluştur</span>
                  </motion.button>
              </div>
          </div>
        </section>

        {/* 2. PARENT BATTERY (Self-Regulation Widget) */}
        <section>
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {parentEnergy > 50 ? <Battery size={16} className="text-[#7E9F95]" /> : <BatteryLow size={16} className="text-[#D68C7F]" />}
                        <span className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Senin Bataryan</span>
                    </div>
                    <span className="text-sm font-bold text-[#2D3748]">{parentEnergy}%</span>
                </div>

                {/* Energy Bar */}
                <div className="h-3 w-full bg-[#F7FAFC] rounded-full mb-4 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${parentEnergy}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                            parentEnergy > 60 ? 'bg-gradient-to-r from-[#7E9F95] to-[#5F8A7E]' :
                            parentEnergy > 30 ? 'bg-gradient-to-r from-[#E8C3B0] to-[#D68C7F]' :
                            'bg-gradient-to-r from-[#D68C7F] to-[#C76D5E]'
                        }`}
                    ></motion.div>
                </div>

                {/* Message */}
                <p className="text-xs text-[#718096] mb-3 leading-relaxed">
                    {parentEnergy > 60 
                        ? "Harika! Bugün enerji seviyeniz yüksek görünüyor." 
                        : parentEnergy > 30
                        ? "Biraz yorgunsun. Belki kısa bir mola iyi gelir?"
                        : "Enerjin düşük. Kendine 3 dakikalık bir zaman ayır."
                    }
                </p>

                {/* Quick Repair Button */}
                {parentEnergy < 60 && (
                    <button className="w-full py-2.5 bg-[#FAFAF8] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#7E9F95] hover:bg-[#7E9F95]/5 transition-all flex items-center justify-center">
                        <Sparkles size={14} className="mr-2" />
                        <span>Hızlı Şarj Ol (3dk)</span>
                    </button>
                )}
            </div>
        </section>

        {/* 3. GAMIFIED ROUTINES (Horizontal Scroll) */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-serif text-[#2D3748] italic">Bugünkü Görevler</h3>
                <span className="text-[10px] text-[#7E9F95] font-medium">Oyun Gibi →</span>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-4 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide snap-x">
                {ROUTINE_TASKS.map((task) => {
                    const isActive = task.status === 'active';
                    const isLocked = task.status === 'locked';
                    const isPending = task.status === 'pending';

                    return (
                        <motion.div 
                            key={task.id}
                            whileTap={{ scale: isLocked ? 1 : 0.95 }}
                            className={`min-w-[160px] h-44 rounded-3xl p-4 flex flex-col justify-between relative snap-start shadow-[0_4px_15px_rgba(0,0,0,0.04)] border
                                ${isActive ? 'bg-gradient-to-br from-[#7E9F95]/20 to-[#5F8A7E]/10 border-[#7E9F95]/30' : 
                                  isLocked ? 'bg-gradient-to-br from-[#E2E8F0] to-[#F7FAFC] border-[#E2E8F0]' :
                                  'bg-white border-[#E2E8F0]'}
                            `}
                        >
                            {/* Icon */}
                            <div className="flex justify-between items-start">
                                <div className={`text-3xl ${isLocked ? 'opacity-40 grayscale' : ''}`}>
                                    {task.icon}
                                </div>
                                {isLocked && <Lock size={16} className="text-[#A0AEC0]" />}
                                {isActive && <CheckCircle size={16} className="text-[#7E9F95] animate-pulse" />}
                            </div>
                            
                            {/* Content */}
                            <div>
                                <h4 className={`text-sm font-semibold leading-tight mb-1 ${
                                    isActive ? 'text-[#2D3748]' : 
                                    isLocked ? 'text-[#A0AEC0]' : 
                                    'text-[#4A4A4A]'
                                }`}>
                                    {task.title}
                                </h4>
                                
                                {isActive && task.timeLeft && (
                                    <p className="text-[10px] text-[#7E9F95] font-bold">⏱ {task.timeLeft} kaldı</p>
                                )}
                                
                                {isLocked && task.reward && (
                                    <div className="mt-2 px-2 py-1 bg-white/60 rounded-lg inline-block">
                                        <p className="text-[9px] text-[#A0AEC0] font-medium">🎁 Ödül: {task.reward}</p>
                                    </div>
                                )}

                                {isPending && task.time && (
                                    <p className="text-[10px] text-[#A0AEC0]">{task.time}</p>
                                )}
                            </div>

                            {/* Connection Line (Arrow to next card if applicable) */}
                            {isActive && task.id === 1 && (
                                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-[#7E9F95]">
                                    <ChevronRight size={20} className="opacity-40" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>

        {/* 4. BEHAVIOR DECODER (Insight Feed) */}
        <section className="pb-6">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-serif text-[#2D3748] italic">Davranış Çözümleyici</h3>
            </div>

            {/* Daily Insight Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#7E9F95]/30 transition-all cursor-pointer">
                <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8C3B0]/20 flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={18} className="text-[#D68C7F]" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[#2D3748] leading-tight mb-2">
                            {profile.name} bugün neden sözünü kesti?
                        </h4>
                        <p className="text-xs text-[#718096] leading-relaxed mb-3">
                            Dürtüsel DEHB'de beyin, uyarıları filtrelemekte zorlanır. Bu yüzden {profile.name} cümleni bitirmeden cevap veriyor olabilir. Bu kasıtlı değil, nörolojik.
                        </p>
                        <div className="flex items-center text-[#7E9F95] text-xs font-medium">
                            <span>Daha Fazlasını Öğren</span>
                            <ChevronRight size={14} className="ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Insight (Optional) */}
            <div className="mt-3 bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl p-4 flex items-center space-x-3">
                <Sparkles size={16} className="text-[#7E9F95] flex-shrink-0" />
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                    <span className="font-semibold">İpucu:</span> Ekran süresini azaltmak için önce {profile.name}'ye "5 dakika sonra kapatıyoruz" diye hatırlat, sonra sayaç kullan.
                </p>
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

// Helper Function
function calculateParentEnergy(nervousSystem: string): number {
    if (nervousSystem.includes("Güvende") || nervousSystem.includes("Normal")) return 75;
    if (nervousSystem.includes("Suçluluk") || nervousSystem.includes("Tetik")) return 40;
    if (nervousSystem.includes("Donma") || nervousSystem.includes("Tükenmiş")) return 20;
    return 50;
}
