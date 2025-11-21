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
  Lightbulb,
  PlayCircle,
  BookOpen,
  Trophy,
  Flame,
  User
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

// Mila Logo Component
const MilaLogo = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="flex-shrink-0">
    <path 
      d="M30 20 Q 20 30, 20 45 Q 20 65, 35 75 Q 45 82, 50 85 Q 45 80, 40 70 Q 35 60, 35 45 Q 35 30, 40 25 Z" 
      fill="none" stroke="#7E9F95" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"
    />
    <path 
      d="M 40 25 Q 50 15, 60 20 Q 70 25, 75 35" 
      fill="none" stroke="#7E9F95" strokeWidth="3.5" strokeLinecap="round" className="opacity-90"
    />
    <path 
      d="M 50 45 Q 55 40, 62 42 Q 68 44, 70 50 Q 72 58, 68 65 Q 64 70, 58 70 Q 52 70, 48 65" 
      fill="none" stroke="#D68C7F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="60" cy="50" r="8" fill="#D68C7F" opacity="0.15" />
    <path 
      d="M 75 35 Q 78 45, 75 55 Q 72 65, 65 72" 
      fill="none" stroke="#D68C7F" strokeWidth="3.5" strokeLinecap="round" className="opacity-85"
    />
  </svg>
);

// MOCK DATA
const CRISIS_SCENARIOS = [
  "Vuruyor / Fiziksel Saldırganlık",
  "Dinlemiyor / Yok Sayıyor",
  "Öfke Nöbeti / Tantrum",
  "Ekran Bırakmıyor",
  "Uyumak İstemiyor",
  "Yemek Yemiyor"
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCrisis, setSelectedCrisis] = useState('');
  
  // Parent Battery State
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [showBatteryAction, setShowBatteryAction] = useState(false);

  // Library Gamification State
  const [streak] = useState(3);
  const [points] = useState(1250);

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="space-y-5 pb-24 pt-2">
         {/* 1. HERO: SOS ACTION */}
         <section>
          <div className="bg-gradient-to-br from-[#D68C7F]/10 to-[#E8C3B0]/20 rounded-3xl p-5 border border-[#E8C3B0]/30 shadow-[0_4px_20px_rgba(214,140,127,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D68C7F]/10 rounded-bl-full"></div>
              <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-3">
                      <AlertCircle size={16} className="text-[#D68C7F]" />
                      <span className="text-xs text-[#D68C7F] font-bold uppercase tracking-wider">SOS Destek</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#2D3748] leading-tight mb-4">
                    {profile.name} ile şu an zorlanıyor musun?
                  </h3>
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

        {/* 2. PARENT BATTERY (Interactive) */}
        <section>
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Battery size={16} className="text-[#7E9F95]" />
                        <span className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Ebeveyn Pili</span>
                    </div>
                </div>

                {!batteryLevel ? (
                    <div className="text-center">
                        <p className="text-sm text-[#2D3748] mb-4 font-medium">Şu an enerjin ne seviyede?</p>
                        <div className="flex justify-between gap-2">
                            {[20, 50, 80].map((level) => (
                                <button 
                                    key={level}
                                    onClick={() => {
                                        setBatteryLevel(level);
                                        setShowBatteryAction(true);
                                    }}
                                    className={`flex-1 py-3 rounded-2xl border transition-all ${
                                        level === 20 ? 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100' :
                                        level === 50 ? 'bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100' :
                                        'bg-green-50 border-green-100 text-green-600 hover:bg-green-100'
                                    }`}
                                >
                                    %{level}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                             <span className="text-sm font-bold text-[#2D3748]">Durumun: %{batteryLevel}</span>
                             <button onClick={() => setBatteryLevel(null)} className="text-xs text-[#A0AEC0] underline">Değiştir</button>
                        </div>
                        <div className="h-2 w-full bg-[#F7FAFC] rounded-full mb-4 overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${
                                    batteryLevel > 60 ? 'bg-[#7E9F95]' : batteryLevel > 40 ? 'bg-[#E8C3B0]' : 'bg-[#D68C7F]'
                                }`} 
                                style={{ width: `${batteryLevel}%` }}
                            ></div>
                        </div>
                        
                        <div className="bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl p-4">
                            <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3">
                                {batteryLevel > 60 
                                    ? "Harikasın! 🌟 Bu enerjiyi Can ile bağ kurmaya harca. İşte 5 dakikalık bir oyun önerisi..." 
                                    : "Önce oksijen maskesi! 😷 Çocuğuna faydalı olmak için önce senin şarj olman lazım."}
                            </p>
                            <button className="w-full py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#7E9F95] shadow-sm">
                                {batteryLevel > 60 ? "Günün Oyununu Gör" : "3dk Nefes Egzersizi Yap"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>

        {/* 3. BEHAVIOR DECODER */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-serif text-[#2D3748] italic">Davranış Çözümleyici</h3>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8C3B0]/20 flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={18} className="text-[#D68C7F]" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[#2D3748] leading-tight mb-2">
                            {profile.name} neden sözünü kesti?
                        </h4>
                        <p className="text-xs text-[#718096] leading-relaxed mb-3">
                            Dürtüsel beyin yapısı, "bekle" komutunu işleyemez. Bu bir saygısızlık değil, nörolojik bir sabırsızlıktır.
                        </p>
                        <div className="flex items-center text-[#7E9F95] text-xs font-medium">
                            <span>Daha Fazlasını Öğren</span>
                            <ChevronRight size={14} className="ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6 pb-24 pt-2">
        {/* Gamification Header */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E9F95]/10 rounded-bl-full -mr-10 -mt-10"></div>
             <div className="flex justify-between items-end relative z-10">
                 <div>
                     <p className="text-xs text-[#A0AEC0] font-bold uppercase tracking-wider mb-1">Bilgelik Puanı</p>
                     <h2 className="text-3xl font-serif text-[#2D3748]">{points}</h2>
                 </div>
                 <div className="flex items-center bg-[#FFF5F5] px-3 py-1.5 rounded-full border border-[#FED7D7]">
                     <Flame size={14} className="text-[#E53E3E] mr-1.5" />
                     <span className="text-xs font-bold text-[#E53E3E]">{streak} Gün Seri 🔥</span>
                 </div>
             </div>
             <p className="text-xs text-[#718096] mt-3">
                 Harika gidiyorsun! Her okuduğun makale, {profile.name} için bir tuğla daha koyuyor.
             </p>
        </div>

        {/* Today's Lesson */}
        <section>
            <h3 className="text-sm font-serif text-[#2D3748] italic mb-3 px-1">Günün Dersi</h3>
            <div className="bg-[#7E9F95] rounded-3xl p-5 text-white relative overflow-hidden shadow-lg shadow-[#7E9F95]/20">
                <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-3 opacity-90">
                        <BookOpen size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">5 Dakikalık Okuma</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Sınır Koyma Sanatı: Hayır Demek</h4>
                    <p className="text-xs opacity-90 leading-relaxed mb-4">
                        Çocuğuna sınır koyarken suçluluk mu hissediyorsun? İşte şefkatli ama kararlı olmanın 3 yolu.
                    </p>
                    <button className="bg-white text-[#7E9F95] px-4 py-2 rounded-xl text-xs font-bold flex items-center">
                        <PlayCircle size={14} className="mr-2" />
                        Derse Başla (+50 Puan)
                    </button>
                </div>
            </div>
        </section>

        {/* Categories */}
        <section>
            <h3 className="text-sm font-serif text-[#2D3748] italic mb-3 px-1">Kütüphane</h3>
            <div className="grid grid-cols-2 gap-3">
                {['Duygu Düzenleme', 'DEHB 101', 'Uyku Rutinleri', 'Beslenme'].map((cat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-[#FAFAF8] flex items-center justify-center mb-2 text-xl">
                            {['🧘‍♀️', '🧠', '🌙', '🥦'][i]}
                        </div>
                        <span className="text-xs font-medium text-[#4A4A4A]">{cat}</span>
                    </div>
                ))}
            </div>
        </section>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 pb-24 pt-2">
        {/* Child Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm text-center relative overflow-hidden">
             <div className="w-20 h-20 bg-[#E8C3B0] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl border-4 border-white shadow-md">
                 🐣
             </div>
             <h2 className="text-xl font-serif text-[#2D3748] mb-1">{profile.name}</h2>
             <p className="text-xs text-[#A0AEC0]">{profile.age} Yaş • {profile.gender}</p>
             
             <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                 <div className="bg-[#FAFAF8] p-3 rounded-2xl">
                     <p className="text-[10px] text-[#A0AEC0] uppercase">Motor (Enerji)</p>
                     <p className="text-xs font-medium text-[#4A4A4A]">{profile.engine}</p>
                 </div>
                 <div className="bg-[#FAFAF8] p-3 rounded-2xl">
                     <p className="text-[10px] text-[#A0AEC0] uppercase">Fren (Dürtü)</p>
                     <p className="text-xs font-medium text-[#4A4A4A]">{profile.brake}</p>
                 </div>
             </div>
        </div>

        {/* Parent Goals */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#2D3748] mb-4">Senin Hedeflerin</h3>
            <div className="space-y-3">
                <div className="flex items-center">
                    <CheckCircle size={16} className="text-[#7E9F95] mr-3" />
                    <span className="text-sm text-[#4A4A4A]">Sabah krizlerini azaltmak</span>
                </div>
                <div className="flex items-center">
                    <CheckCircle size={16} className="text-[#E2E8F0] mr-3" />
                    <span className="text-sm text-[#4A4A4A]">Kendi öfkeni yönetmek</span>
                </div>
            </div>
        </div>
        
        <button className="w-full py-4 text-[#D68C7F] text-sm font-medium">Çıkış Yap</button>
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
          <MilaLogo size={44} />
          <div>
            <p className="text-[#A0AEC0] text-[10px] uppercase tracking-wider font-medium">
                {activeTab === 'home' ? 'Kontrol Merkezi' : 
                 activeTab === 'library' ? 'Ebeveyn Akademisi' : 
                 activeTab === 'profile' ? 'Profil' : 'Mila Koç'}
            </p>
            <h1 className="text-xl font-serif text-[#2D3748]">
                {activeTab === 'home' ? `${profile.name} için Bugün` : 
                 activeTab === 'library' ? 'Kendini Geliştir' : 
                 activeTab === 'profile' ? 'Hesap Detayları' : 'Sohbet Başlat'}
            </h1>
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
          {activeTab === 'chat' && (
              <div className="h-full flex flex-col items-center justify-center opacity-50 pb-20">
                  <Sparkles size={40} className="text-[#7E9F95] mb-4" />
                  <p className="text-sm text-[#4A4A4A]">Sohbet ekranı yükleniyor...</p>
              </div>
          )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-6 py-4 flex justify-around z-20 pb-8">
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
              <IconComponent size={24} className={activeTab === item.id ? 'text-[#7E9F95]' : 'text-[#A0AEC0]'} />
              <span className={`text-[10px] font-medium ${
                activeTab === item.id ? 'text-[#7E9F95]' : 'text-[#A0AEC0]'
              }`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#7E9F95] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
