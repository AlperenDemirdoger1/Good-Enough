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
  BarChart2,
  Heart,
  Star
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

// --- MILA LOGO COMPONENT ---
const MilaLogo = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="flex-shrink-0">
    <path 
      d="M30 20 Q 20 30, 20 45 Q 20 65, 35 75 Q 45 82, 50 85 Q 45 80, 40 70 Q 35 60, 35 45 Q 35 30, 40 25 Z" 
      fill="none" 
      stroke="#7E9F95" 
      strokeWidth="3.5" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-90"
    />
    <path 
      d="M 40 25 Q 50 15, 60 20 Q 70 25, 75 35" 
      fill="none" 
      stroke="#7E9F95" 
      strokeWidth="3.5" 
      strokeLinecap="round"
      className="opacity-90"
    />
    <path 
      d="M 50 45 Q 55 40, 62 42 Q 68 44, 70 50 Q 72 58, 68 65 Q 64 70, 58 70 Q 52 70, 48 65" 
      fill="none" 
      stroke="#D68C7F" 
      strokeWidth="3.5" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="60" cy="50" r="8" fill="#D68C7F" opacity="0.15" />
    <path 
      d="M 75 35 Q 78 45, 75 55 Q 72 65, 65 72" 
      fill="none" 
      stroke="#D68C7F" 
      strokeWidth="3.5" 
      strokeLinecap="round"
      className="opacity-85"
    />
  </svg>
);

// --- MOCK DATA ---

const SOS_ACTIONS = [
  { id: 'hitting', label: 'Vurma', emoji: '😡', color: 'from-red-50 to-white border-red-100 hover:border-red-300 text-red-600' },
  { id: 'tantrum', label: 'Kriz', emoji: '📢', color: 'from-orange-50 to-white border-orange-100 hover:border-orange-300 text-orange-600' },
  { id: 'screen', label: 'Ekran', emoji: '📵', color: 'from-blue-50 to-white border-blue-100 hover:border-blue-300 text-blue-600' },
  { id: 'sleep', label: 'Uyku', emoji: '🌙', color: 'from-indigo-50 to-white border-indigo-100 hover:border-indigo-300 text-indigo-600' },
];

const DAILY_QUESTS = [
  { id: 1, title: "Sabah Rutini", status: "completed", reward: "10 Puan", icon: "☀️" },
  { id: 2, title: "Ödev Saati", status: "active", reward: "20 Puan", icon: "📚" },
  { id: 3, title: "Akşam Kitabı", status: "locked", reward: "50 Puan", icon: "📖" },
];

const LIBRARY_CONTENT = [
    { id: 1, title: "Sınır Koyma Sanatı", type: "audio", locked: false, duration: "5dk", color: "bg-orange-100 text-orange-600" },
    { id: 2, title: "DEHB ve Dopamin", type: "read", locked: true, duration: "3dk", color: "bg-blue-100 text-blue-600" },
    { id: 3, title: "Öfke Yönetimi 101", type: "audio", locked: true, duration: "10dk", color: "bg-red-100 text-red-600" },
];

const CHAT_STARTERS = [
    "Çocuğum ödev yapmak istemiyor 📚",
    "Şu an çok tükenmişim 🔋",
    "Sürekli 'Hayır' diyorum 🛑",
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [batteryValue, setBatteryValue] = useState(50);
  const [isBatteryInteracting, setIsBatteryInteracting] = useState(false);
  const [activeCrisis, setActiveCrisis] = useState<string | null>(null);

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="space-y-8 pb-32 pt-4">
         {/* 1. HERO: SOS ZONE (Gradient & Grid) */}
         <section className="relative">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-100 rounded-full animate-pulse">
                        <AlertCircle size={18} className="text-red-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Acil Durum (SOS)</h2>
                </div>
            </div>
            
            {/* 2x2 Grid of Chunky Buttons */}
            <div className="grid grid-cols-2 gap-3">
                {SOS_ACTIONS.map((action) => (
                    <motion.button
                        key={action.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCrisis(action.id)}
                        className={`h-28 flex flex-col items-center justify-center rounded-3xl border-2 transition-all shadow-sm hover:shadow-md bg-gradient-to-br ${action.color} ${
                            activeCrisis === action.id ? 'ring-4 ring-offset-2 ring-red-200 scale-95 border-transparent' : ''
                        }`}
                    >
                        <span className="text-4xl mb-2 filter drop-shadow-sm">{action.emoji}</span>
                        <span className="font-bold text-sm tracking-wide">{action.label}</span>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeCrisis && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mt-4 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl shadow-slate-900/20 flex justify-between items-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 z-0"></div>
                        <div className="relative z-10 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <Sparkles size={20} className="text-yellow-300" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Senaryo Hazır</p>
                                <p className="text-xs text-slate-400">Mila çözüm öneriyor...</p>
                            </div>
                        </div>
                        <button className="relative z-10 bg-white text-slate-900 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-lg">
                            Görüntüle
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>

        {/* 2. PARENT BATTERY (Custom Slider) */}
        <section>
            <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${batteryValue < 30 ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                            <Battery size={20} className="fill-current" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-800">Ebeveyn Pili</h3>
                            <p className="text-xs text-slate-500 font-medium">Kendi enerjini kontrol et</p>
                        </div>
                    </div>
                    <span className="text-2xl font-black text-slate-800 tracking-tight">%{batteryValue}</span>
                </div>

                {/* Custom Track */}
                <div className="relative h-12 flex items-center px-1">
                    {/* Track Background */}
                    <div className="absolute left-0 right-0 h-5 bg-slate-100 rounded-full overflow-hidden">
                        {/* Gradient Fill */}
                        <div 
                            className={`h-full transition-all duration-300 rounded-full ${
                                batteryValue < 30 ? 'bg-gradient-to-r from-red-400 to-orange-400' : 
                                batteryValue < 60 ? 'bg-gradient-to-r from-orange-400 to-yellow-400' : 
                                'bg-gradient-to-r from-green-400 to-emerald-500'
                            }`}
                            style={{ width: `${batteryValue}%` }}
                        />
                    </div>

                    {/* Input Range (Invisible but clickable) */}
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={batteryValue}
                        onChange={(e) => {
                            setBatteryValue(parseInt(e.target.value));
                            setIsBatteryInteracting(true);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    {/* Emoji Thumb (Visual only) */}
                    <div 
                        className="absolute w-10 h-10 bg-white border-4 border-white shadow-lg rounded-full flex items-center justify-center text-lg transition-all pointer-events-none z-10"
                        style={{ left: `calc(${batteryValue}% - 20px)` }}
                    >
                        {batteryValue < 30 ? '😫' : batteryValue < 70 ? '😐' : '⚡️'}
                    </div>
                </div>

                {/* Action Box */}
                <AnimatePresence>
                    {batteryValue < 40 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        >
                            <button className="w-full bg-red-50 border-2 border-red-100 rounded-2xl p-4 flex items-center justify-between hover:bg-red-100 transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Headphones size={18} className="text-red-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-red-800">Acil Şarj Gerekli</p>
                                        <p className="text-[10px] text-red-600 font-medium">3dk Nefes Egzersizi</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <PlayCircle size={16} className="text-red-500 fill-red-500" />
                                </div>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>

        {/* 3. DAILY QUESTS (Snapping Carousel) */}
        <section>
             <div className="flex items-center justify-between mb-4 px-2">
                 <h3 className="text-lg font-bold text-slate-800 tracking-tight">Bugünün Görevleri</h3>
                 <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">2/3</span>
             </div>
             
             <div className="flex space-x-4 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                 {DAILY_QUESTS.map((quest) => {
                     const isCompleted = quest.status === 'completed';
                     const isLocked = quest.status === 'locked';
                     
                     return (
                         <motion.div 
                            key={quest.id}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                min-w-[140px] h-40 rounded-[28px] p-5 flex flex-col items-center justify-center text-center relative snap-start transition-all
                                ${isCompleted 
                                    ? 'bg-green-50 border-2 border-green-200 shadow-green-100' 
                                    : isLocked 
                                    ? 'bg-slate-50 border-2 border-slate-100 opacity-60' 
                                    : 'bg-white border-2 border-slate-100 shadow-[0_8px_20px_rgb(0,0,0,0.04)]'
                                }
                            `}
                         >
                             <div className={`text-4xl mb-3 filter ${isLocked ? 'grayscale opacity-50' : 'drop-shadow-sm'}`}>
                                 {isCompleted ? '✅' : isLocked ? '🔒' : quest.icon}
                             </div>
                             
                             <p className={`text-xs font-bold mb-1 ${isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                                 {quest.title}
                             </p>
                             
                             {!isLocked && (
                                 <div className="absolute bottom-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-100">
                                     <p className="text-[9px] font-bold text-slate-500">{quest.reward}</p>
                                 </div>
                             )}
                         </motion.div>
                     )
                 })}
             </div>
        </section>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-8 pb-32 pt-6">
        {/* Massive Streak */}
        <div className="flex flex-col items-center justify-center py-8">
             <div className="relative">
                 <div className="w-32 h-32 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 animate-pulse">
                     <Flame size={64} className="text-white fill-white" />
                 </div>
                 <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border-4 border-slate-50 rounded-full px-4 py-1 shadow-md">
                     <span className="text-sm font-black text-slate-800">3 GÜN</span>
                 </div>
             </div>
             <h2 className="mt-6 text-2xl font-black text-slate-800 tracking-tight">Harikasın! 🔥</h2>
             <p className="text-sm text-slate-500 font-medium">Seriyi bozma, her gün %1 daha iyi.</p>
        </div>

        {/* Content Cards */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 px-2">Senin İçin Seçildi</h3>
            {LIBRARY_CONTENT.map((item) => (
                <motion.div 
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-3xl border flex items-center justify-between relative overflow-hidden ${
                        item.locked ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
                    }`}
                >
                    <div className="flex items-center space-x-4 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.locked ? 'bg-slate-200' : item.color}`}>
                            {item.type === 'audio' ? <Headphones size={24} /> : <BookOpen size={24} />}
                        </div>
                        <div>
                            <h4 className={`text-sm font-bold ${item.locked ? 'text-slate-400' : 'text-slate-800'}`}>{item.title}</h4>
                            <p className="text-xs text-slate-400 font-medium mt-1">{item.duration} • {item.type === 'audio' ? 'Dinle' : 'Oku'}</p>
                        </div>
                    </div>
                    
                    {item.locked ? (
                        <div className="bg-slate-200 p-2 rounded-full">
                            <Lock size={16} className="text-slate-400" />
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-3 rounded-full">
                            <PlayCircle size={20} className="text-indigo-500 fill-current" />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    </div>
  );

  const renderChat = () => (
      <div className="h-full flex flex-col pb-24 pt-10 px-2">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[32px] flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8 transform rotate-3">
                  <Sparkles size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Merhaba, Ben Mila.</h2>
              <p className="text-sm text-slate-500 font-medium mb-10 max-w-xs leading-relaxed">
                  Seni yargılamadan dinlemek ve çözüm üretmek için buradayım.
              </p>
              
              <div className="w-full space-y-3">
                  {CHAT_STARTERS.map((starter, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 text-left shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center justify-between group"
                      >
                          <span>{starter}</span>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </motion.button>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 pb-32 pt-6">
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.05)] text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-50 to-white opacity-50"></div>
             <div className="relative z-10">
                <div className="w-24 h-24 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white shadow-xl">
                    🐣
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">{profile.name}</h2>
                <p className="text-sm text-slate-500 font-medium">{profile.age} Yaş • {profile.gender}</p>
             </div>
        </div>

        <div className="space-y-3">
            <button className="w-full p-5 flex items-center justify-between bg-white rounded-3xl border border-slate-100 shadow-sm active:scale-98 transition-transform">
                <div className="flex items-center space-x-4">
                    <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                        <BarChart2 size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Gelişim Raporu</span>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
            </button>
            
            <button className="w-full p-5 flex items-center justify-between bg-white rounded-3xl border border-slate-100 shadow-sm active:scale-98 transition-transform">
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-50 p-3 rounded-2xl text-slate-600">
                        <Settings size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Ayarlar</span>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
            </button>
        </div>
        
        <div className="text-center pt-4">
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">Çıkış Yap</button>
        </div>
    </div>
  );

  return (
    <div className="h-full bg-slate-50/50 flex flex-col relative overflow-hidden font-sans">
       {/* Soft Background Blurs */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="pt-12 px-6 pb-4 flex justify-between items-center relative z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100/50">
        <div className="flex items-center space-x-3">
          <MilaLogo size={36} />
        <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {activeTab === 'home' ? 'KONTROL MERKEZİ' : 
                 activeTab === 'library' ? 'AKADEMİ' : 
                 activeTab === 'profile' ? 'PROFİL' : 'ASİSTAN'}
             </p>
             <h1 className="text-xl font-black text-slate-800 tracking-tight">
                {activeTab === 'home' ? 'Günaydın' : 
                 activeTab === 'library' ? 'Kendini Geliştir' : 
                 activeTab === 'profile' ? 'Hesabım' : 'Mila'}
             </h1>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform relative">
             <Bell size={18} className="text-slate-600" />
             <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
        </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 scrollbar-hide relative z-10">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'library' && renderLibrary()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'chat' && renderChat()}
      </div>

      {/* Bottom Navigation (Floating & Glass) */}
      <div className="absolute bottom-8 left-6 right-6 h-20 bg-white/90 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex justify-around items-center px-2 z-50">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
                  isActive ? '-translate-y-4' : 'hover:bg-slate-50'
              }`}
            >
              <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isActive 
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/30 scale-110' 
                    : 'bg-transparent text-slate-400'}
              `}>
                  <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              {isActive && (
                  <span className="absolute -bottom-6 text-[10px] font-bold text-slate-800 animate-in fade-in slide-in-from-bottom-2">
                      {item.label}
                  </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
