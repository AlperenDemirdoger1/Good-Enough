import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChildProfile } from '../types';
import { NAV_ITEMS } from '../constants';
import { 
  Sparkles, 
  Bell, 
  Search, 
  Lock, 
  Plus,
  ChevronRight, 
  PlayCircle, 
  BrainCircuit, 
  BookOpen, 
  X,
  Clock,
  Mic,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Headphones,
  Video,
  Wrench
} from 'lucide-react';

interface DashboardScreenProps {
  profile: ChildProfile;
}

interface Task {
  id: string;
  title: string;
  emoji: string;
  time?: string;
  status: 'pending' | 'green' | 'yellow' | 'red';
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Ayakkabılarını Giy', emoji: '👟', time: '08:00', status: 'pending' },
    { id: '2', title: 'Kahvaltı Yap', emoji: '🥐', time: '08:30', status: 'pending' },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', emoji: '📌', time: '' });
  const [toast, setToast] = useState<{ message: string; action?: () => void } | null>(null);
  
  // Behavioral Translator State
  const [showTranslator, setShowTranslator] = useState(false);
  const [translatorInput, setTranslatorInput] = useState('');
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [translatorResult, setTranslatorResult] = useState<{
    diagnosis: string;
    laggingSkill: string;
    script: string;
    preventionTip?: string;
  } | null>(null);

  // Context Chips for Quick Selection
  const contextChips = [
    { id: 'transition', label: 'Geçiş Anı', emoji: '🔄' },
    { id: 'screen', label: 'Ekran', emoji: '📱' },
    { id: 'sleep', label: 'Uyku', emoji: '🌙' },
    { id: 'food', label: 'Yemek', emoji: '🍽️' },
    { id: 'sibling', label: 'Kardeş', emoji: '👶' },
    { id: 'sensory', label: 'Duyu', emoji: '👂' },
  ];

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      emoji: newTask.emoji,
      time: newTask.time || undefined,
      status: 'pending',
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', emoji: '📌', time: '' });
    setShowAddTask(false);
  };

  const handleTaskFeedback = (taskId: string, feedback: 'green' | 'yellow' | 'red') => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: feedback } : t));
    
    if (feedback === 'green') {
      // Celebrate!
      setToast({ message: '🎉 Harika! Sorunsuz geçti!' });
      setTimeout(() => setToast(null), 2000);
    } else if (feedback === 'yellow') {
      setToast({
        message: '💡 Zorlandınız mı? Gelecek sefer için Mila\'dan taktik al.',
        action: () => setActiveTab('chat')
      });
      setTimeout(() => setToast(null), 4000);
    } else if (feedback === 'red') {
      setToast({
        message: '🆘 Kriz anı mı? Mila ile sakinleşme senaryosu çalış.',
        action: () => setActiveTab('chat')
      });
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleDecodeSignal = () => {
    if (!translatorInput.trim() && !selectedContext) return;
    
    setIsDecoding(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock result based on input (in production, this calls Gemini API)
      setTranslatorResult({
        diagnosis: 'Duyu Hassasiyeti (Sensory Overload)',
        laggingSkill: 'Tolerans (Esnek Düşünme)',
        script: '"Vücudunun şu an rahatsız olduğunu görüyorum. Çorabın dokunuyor ve bu seni rahatsız ediyor. Birlikte rahat bir şey bulalım."',
        preventionTip: 'Sabah dikişsiz çorap seçeneği sun'
      });
      setIsDecoding(false);
      setShowTranslator(false);
    }, 2000);
  };

  // Get icon for lesson type
  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'audio': return Headphones;
      case 'video': return Video;
      case 'article': return BookOpen;
      case 'tool': return Wrench;
      default: return BookOpen;
    }
  };

  // Render Academy Tab (Wiser/Masterclass Style)
  const renderAcademy = () => (
    <div className="space-y-8 pb-6 pt-2">
      {/* Page Header */}
      <div className="text-center px-4">
        <h2 className="text-2xl font-serif text-stone-800 mb-2">Akademi</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Bilim ve empati temelli öğrenme yolculuğuna hoş geldin.
        </p>
      </div>

      {/* Learning Tracks */}
      {learningTracks.map((track, trackIdx) => (
        <div key={track.id} className="relative">
          {/* Track Card */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm">
            {/* Track Header */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {track.status === 'unlocked' && (
                    <div className="px-2 py-1 bg-teal-100 rounded-full">
                      <span className="text-[9px] font-bold text-teal-700 uppercase tracking-wider">Ücretsiz</span>
                    </div>
                  )}
                  {track.status === 'freemium' && (
                    <div className="px-2 py-1 bg-indigo-100 rounded-full">
                      <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-wider">Freemium</span>
                    </div>
                  )}
                  {track.status === 'premium' && (
                    <div className="px-2 py-1 bg-orange-100 rounded-full flex items-center space-x-1">
                      <Lock size={10} className="text-orange-700" />
                      <span className="text-[9px] font-bold text-orange-700 uppercase tracking-wider">Premium</span>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-stone-400">{track.progress}/{track.total}</span>
              </div>

              <h3 className="text-lg font-serif text-stone-900 leading-tight mb-1">
                {track.title}
              </h3>
              <p className="text-xs text-stone-500">{track.subtitle}</p>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(track.progress / track.total) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: track.accentColor }}
                />
              </div>
            </div>

            {/* Lessons Timeline */}
            <div className="space-y-0 relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-stone-200"></div>

              {track.lessons.map((lesson, lessonIdx) => {
                const LessonIcon = getLessonIcon(lesson.type);
                const isLocked = lesson.status === 'locked';

                return (
                  <motion.button
                    key={lesson.id}
                    whileTap={{ scale: isLocked ? 1 : 0.98 }}
                    disabled={isLocked}
                    className={`w-full flex items-center space-x-4 p-3 rounded-2xl transition-all relative ${
                      isLocked
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                        isLocked ? 'bg-stone-200' : 'bg-white'
                      }`}
                      style={{
                        borderColor: isLocked ? '#D4D4D8' : track.accentColor,
                        borderWidth: '2px'
                      }}
                    >
                      {isLocked ? (
                        <Lock size={16} className="text-stone-400" />
                      ) : (
                        <LessonIcon size={16} style={{ color: track.accentColor }} />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-left">
                      <h4 className={`text-sm font-medium leading-tight mb-0.5 ${
                        isLocked ? 'text-stone-400' : 'text-stone-900'
                      }`}>
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-stone-400">{lesson.duration}</p>
                    </div>

                    {/* Status Indicator */}
                    <div>
                      {isLocked ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                          <Lock size={14} className="text-white" />
                        </div>
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: track.accentColor }}
                        >
                          <PlayCircle size={16} className="text-white" fill="white" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* CTA for Premium */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 text-center">
        <Sparkles size={24} className="text-orange-600 mx-auto mb-3" />
        <h3 className="text-lg font-serif text-stone-900 mb-2">Tüm Akademiye Erişim</h3>
        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
          30+ uzman dersine, kişiselleştirilmiş içeriğe ve topluluk desteğine hemen ulaş.
        </p>
        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
          Premium'a Geç →
        </button>
      </div>
    </div>
  );

  // Academy Data - Learning Tracks (Masterclass Style)
  const learningTracks = [
    {
      id: 1,
      title: 'Sakin Ebeveyn Başlangıç Seti',
      subtitle: 'Kriz yönetimi ve temel stratejiler',
      progress: 0,
      total: 3,
      color: 'teal',
      accentColor: '#14B8A6',
      status: 'unlocked',
      lessons: [
        { id: 1, title: 'Acil Durum: Kriz Anında 3 Dakikada Sakinleş', type: 'audio', duration: '3 dk', status: 'unlocked' },
        { id: 2, title: 'Çocuğun Neden Dinlemiyor? İnat Değil, Nöroloji.', type: 'article', duration: '5 dk', status: 'unlocked' },
        { id: 3, title: 'Sabah Kaosunu Önleyen 3 Sihirli Cümle', type: 'tool', duration: '2 dk', status: 'unlocked' }
      ]
    },
    {
      id: 2,
      title: 'DEHB Beynini Şifrelemek',
      subtitle: 'Nöroloji ve bilim temelli anlayış',
      progress: 1,
      total: 3,
      color: 'indigo',
      accentColor: '#6366F1',
      status: 'freemium',
      lessons: [
        { id: 1, title: 'Dopamin 101: Çocuğunun Yakıtını Tanı', type: 'video', duration: '8 dk', status: 'unlocked' },
        { id: 2, title: 'Yürütücü İşlevler: Beynin CEO\'su Nerede?', type: 'audio', duration: '6 dk', status: 'locked' },
        { id: 3, title: 'Hiperodaklanma: Süper Güç Mü?', type: 'article', duration: '4 dk', status: 'locked' }
      ]
    },
    {
      id: 3,
      title: 'Duygusal Düzenleme Masterclass',
      subtitle: 'İleri seviye duygu yönetimi',
      progress: 0,
      total: 2,
      color: 'orange',
      accentColor: '#F97316',
      status: 'premium',
      lessons: [
        { id: 1, title: 'Öfke Buzdağı: Görünenin Altı', type: 'audio', duration: '7 dk', status: 'locked' },
        { id: 2, title: 'Vurma Davranışını Yönetmek', type: 'article', duration: '6 dk', status: 'locked' }
      ]
    }
  ];

  // Discovery Rail - 3 Pillars (Education, Discovery, Community)
  const discoveryCards = [
    {
      id: 1,
      type: 'learning',
      pillar: 'Akademi',
      tag: 'Modül 2',
      title: 'Sınır Koyma Sanatı',
      subtitle: 'Ders 3: Hayır Diyebilmek',
      progress: 40,
      duration: '5 dk',
      icon: PlayCircle,
      deepLink: 'academy'
    },
    {
      id: 2,
      type: 'quiz',
      pillar: 'Keşfet',
      tag: 'Yeni',
      title: `${profile.name}'ın Sevgi Dili Ne?`,
      subtitle: '3 dakikalık test ile keşfet',
      duration: '3 dk',
      icon: BrainCircuit,
      deepLink: 'discover',
      isLocked: false
    },
    {
      id: 3,
      type: 'poll',
      pillar: 'Topluluk',
      tag: 'Günün Anketi',
      title: 'Çocuğunuz kaç saat ekran kullanıyor?',
      subtitle: '15k anne katıldı. Sonuçları gör.',
      pollData: { optionA: 65, optionB: 35 },
      icon: Users,
      deepLink: 'community'
    }
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
      <div className="flex-1 overflow-y-auto pb-24 px-6 scrollbar-hide relative z-10 pt-2">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* 1. TODAY'S FOCUS - ROUTINES (Dynamic Task List) */}
            <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-serif text-[#2D3748]">Bugünün Odağı</h3>
            <button 
              onClick={() => setShowAddTask(true)}
              className="flex items-center space-x-1 text-[#7E9F95] text-xs font-medium"
            >
              <Plus size={14} />
              <span>Görev Ekle</span>
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl p-4 border shadow-sm transition-all ${
                  task.status === 'pending' ? 'border-[#E2E8F0]' :
                  task.status === 'green' ? 'border-[#68D391] bg-[#F0FFF4]' :
                  task.status === 'yellow' ? 'border-[#F6AD55] bg-[#FFFAF0]' :
                  'border-[#FC8181] bg-[#FFF5F5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Task Info */}
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{task.emoji}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        task.status !== 'pending' ? 'line-through opacity-60' : 'text-[#2D3748]'
                      }`}>
                        {task.title}
                      </p>
                      {task.time && (
                        <p className="text-[10px] text-[#A0AEC0] flex items-center mt-0.5">
                          <Clock size={10} className="mr-1" />
                          {task.time}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Traffic Light Feedback */}
                  {task.status === 'pending' && (
                    <div className="flex items-center space-x-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTaskFeedback(task.id, 'green')}
                        className="w-7 h-7 rounded-full bg-[#68D391]/20 hover:bg-[#68D391]/40 flex items-center justify-center transition-colors"
                        title="Sorunsuz geçti"
                      >
                        <span className="text-sm">🟢</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTaskFeedback(task.id, 'yellow')}
                        className="w-7 h-7 rounded-full bg-[#F6AD55]/20 hover:bg-[#F6AD55]/40 flex items-center justify-center transition-colors"
                        title="Zorlandık"
                      >
                        <span className="text-sm">🟡</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTaskFeedback(task.id, 'red')}
                        className="w-7 h-7 rounded-full bg-[#FC8181]/20 hover:bg-[#FC8181]/40 flex items-center justify-center transition-colors"
                        title="Kriz/Başaramadık"
                      >
                        <span className="text-sm">🔴</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {tasks.length === 0 && (
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] text-center">
                <p className="text-sm text-[#A0AEC0]">Henüz görev eklenmedi</p>
                <button
                  onClick={() => setShowAddTask(true)}
                  className="mt-3 text-xs text-[#7E9F95] font-medium"
                >
                  İlk görevi ekle →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 2. BEHAVIORAL TRANSLATOR CARD (The Entry Point) */}
        <section>
          {translatorResult ? (
            // Show Result Card
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-lg relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Diagnosis Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                      <CheckCircle size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Tespit</p>
                      <p className="text-sm font-semibold text-indigo-900">{translatorResult.diagnosis}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTranslatorResult(null)}
                    className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center"
                  >
                    <X size={14} className="text-indigo-600" />
                  </button>
                  </div>
                  
                {/* Lagging Skill */}
                <div className="mb-4 p-3 bg-white/60 rounded-xl">
                  <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Eksik Beceri</p>
                  <p className="text-xs text-purple-900 font-medium">{translatorResult.laggingSkill}</p>
                </div>

                {/* The Script (Main Content) */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">Şimdi Ne Söylemeli?</p>
                  <p className="text-base font-medium text-slate-800 leading-relaxed italic">
                    {translatorResult.script}
                  </p>
                </div>

                {/* Prevention Tip */}
                {translatorResult.preventionTip && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2">
                    <Sparkles size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Önleme Taktiği</p>
                      <p className="text-xs text-amber-900">{translatorResult.preventionTip}</p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors">
                  <Lock size={16} />
                  <span>Önleme Oyununu Aç (Premium)</span>
                </button>
              </div>
            </motion.div>
          ) : (
            // Translator Entry Card
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTranslator(true)}
              className="w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <BrainCircuit size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-1">Davranış Çeviricisi</p>
                    <p className="text-white text-sm font-semibold leading-tight">Şu anki krizin altında ne var?</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </motion.button>
          )}
        </section>

        {/* 3. DISCOVERY RAIL (3 Pillars: Education, Discovery, Community) */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-serif text-[#2D3748] italic">Bugün Senin İçin</h3>
            </div>
            
            {/* Horizontal Scroll - Cards Peek from Right */}
            <div className="flex space-x-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
                {discoveryCards.map((card, idx) => {
                  const IconComponent = card.icon;
                  
                  // Card 1: Continue Learning (Netflix Effect)
                  if (card.type === 'learning') {
                    return (
                      <motion.button
                        key={card.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab(card.deepLink)}
                        className="min-w-[280px] bg-white rounded-3xl p-5 border-2 border-[#7E9F95] shadow-lg snap-start relative overflow-hidden"
                      >
                        {/* Active Highlight */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#7E9F95]"></div>
                        
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-xl bg-[#7E9F95]/10 flex items-center justify-center">
                              <IconComponent size={16} className="text-[#7E9F95]" />
                            </div>
                            <span className="text-[10px] font-bold text-[#7E9F95] uppercase tracking-wider">{card.tag}</span>
                          </div>
                          <span className="text-[10px] text-[#A0AEC0] font-medium">{card.duration}</span>
                        </div>

                        <h4 className="text-sm font-bold text-[#2D3748] leading-tight mb-1 text-left">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#718096] mb-3 text-left">{card.subtitle}</p>

                        {/* Progress Bar */}
                        <div className="relative">
                          <div className="h-2 w-full bg-[#F7FAFC] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${card.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#7E9F95] to-[#5F8A7E] rounded-full"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-[#7E9F95] mt-1 block">{card.progress}% Tamamlandı</span>
                        </div>
                      </motion.button>
                    );
                  }

                  // Card 2: Weekly Discovery (Quiz Hook)
                  if (card.type === 'quiz') {
                    return (
                      <motion.button
                        key={card.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab(card.deepLink)}
                        className="min-w-[240px] bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-5 border border-purple-200 shadow-sm snap-start relative overflow-hidden"
                      >
                        {/* Decorative Element */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="px-2 py-1 bg-purple-200/50 rounded-full">
                              <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider">{card.tag}</span>
                            </div>
                            <span className="text-[10px] text-purple-600 font-medium">{card.duration}</span>
                          </div>

                          {/* Icon - Make it look like a "Mission" */}
                          <div className="w-12 h-12 mb-3 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
                            <IconComponent size={24} className="text-white" />
                          </div>

                          <h4 className="text-sm font-bold text-purple-900 leading-tight mb-1 text-left">
                            {card.title}
                          </h4>
                          <p className="text-xs text-purple-600 text-left">{card.subtitle}</p>
                        </div>
                      </motion.button>
                    );
                  }

                  // Card 3: Community Poll
                  if (card.type === 'poll') {
                    return (
                      <motion.button
                        key={card.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab(card.deepLink)}
                        className="min-w-[240px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-sm snap-start relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="px-2 py-1 bg-amber-200/50 rounded-full">
                            <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">{card.tag}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp size={12} className="text-amber-600" />
                            <span className="text-[10px] text-amber-600 font-medium">Canlı</span>
                          </div>
                        </div>

                        {/* Mini Poll Widget */}
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-amber-200/50 flex items-center justify-center">
                              <IconComponent size={16} className="text-amber-700" />
                            </div>
                            <div className="text-xs text-amber-900 font-semibold text-left flex-1">
                              {card.title}
                            </div>
                          </div>

                          {/* Poll Bars */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden">
                                <div style={{ width: `${card.pollData?.optionA}%` }} className="h-full bg-amber-500"></div>
                              </div>
                              <span className="text-[10px] font-bold text-amber-700">{card.pollData?.optionA}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden">
                                <div style={{ width: `${card.pollData?.optionB}%` }} className="h-full bg-orange-400"></div>
                              </div>
                              <span className="text-[10px] font-bold text-orange-600">{card.pollData?.optionB}%</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-amber-600 text-left">{card.subtitle}</p>
                      </motion.button>
                    );
                  }

                  return null;
                })}
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
        )}

        {/* Academy Tab */}
        {activeTab === 'academy' && renderAcademy()}

        {/* Discover Tab - Coming Soon */}
        {activeTab === 'discover' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-stone-400">Keşfet sekmesi yakında...</p>
          </div>
        )}

        {/* Community Tab - Coming Soon */}
        {activeTab === 'community' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-stone-400">Topluluk sekmesi yakında...</p>
          </div>
        )}

        {/* Coach Tab - Coming Soon */}
        {activeTab === 'coach' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-stone-400">Koç sekmesi yakında...</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddTask(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-2xl z-40"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-serif text-[#2D3748]">Yeni Görev Ekle</h3>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="w-8 h-8 rounded-full bg-[#F7FAFC] flex items-center justify-center"
                >
                  <X size={16} className="text-[#A0AEC0]" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Emoji Picker (Simple) */}
                <div>
                  <label className="text-xs font-medium text-[#718096] mb-2 block">İkon Seç</label>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {['📌', '👟', '🥐', '🎒', '📚', '🛁', '🌙', '🎨', '⚽', '🎮'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewTask({ ...newTask, emoji })}
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                          newTask.emoji === emoji
                            ? 'bg-[#7E9F95]/20 ring-2 ring-[#7E9F95]'
                            : 'bg-[#F7FAFC] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="text-xs font-medium text-[#718096] mb-2 block">Görev Adı</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Örn: Ayakkabılarını giy"
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#7E9F95]/50"
                  />
                </div>

                {/* Time Input (Optional) */}
                <div>
                  <label className="text-xs font-medium text-[#718096] mb-2 block">Saat (Opsiyonel)</label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#7E9F95]/50"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 py-3 bg-[#F7FAFC] text-[#718096] rounded-xl font-medium text-sm"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim()}
                    className="flex-1 py-3 bg-[#7E9F95] text-white rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Ekle
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Behavioral Translator Bottom Sheet */}
      <AnimatePresence>
        {showTranslator && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTranslator(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30"
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-indigo-50 to-white rounded-t-[32px] shadow-2xl z-40 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-[#2D3748]">Davranış Çeviricisi</h3>
                      <p className="text-[10px] text-indigo-600 font-medium">Sinyali Çözelim</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTranslator(false)}
                    className="w-8 h-8 rounded-full bg-[#F7FAFC] flex items-center justify-center"
                  >
                    <X size={16} className="text-[#A0AEC0]" />
                  </button>
                </div>

                {/* Quick Context Chips */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 block">
                    Hızlı Bağlam Seç
                  </label>
                  <div className="flex space-x-2 overflow-x-auto pb-2 -mx-2 px-2">
                    {contextChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => setSelectedContext(chip.id === selectedContext ? null : chip.id)}
                        className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                          selectedContext === chip.id
                            ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-300'
                            : 'bg-white border-2 border-indigo-200 text-indigo-600 hover:border-indigo-400'
                        }`}
                      >
                        <span>{chip.emoji}</span>
                        <span>{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Text Input */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 block">
                    Tam Olarak Ne Oldu?
                  </label>
                  <div className="relative">
                    <textarea
                      value={translatorInput}
                      onChange={(e) => setTranslatorInput(e.target.value)}
                      placeholder="Örn: 'Çorabının dikişi rahatsız etti' veya 'Kardeşi oyununu bozdu'..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-2 border-indigo-200 rounded-2xl text-sm text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-[#A0AEC0] resize-none"
                    />
                    <button
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition-colors"
                      title="Sesli Kayıt"
                    >
                      <Mic size={18} className="text-indigo-600" />
                    </button>
                  </div>
                </div>

                {/* Decode Button */}
                <button
                  onClick={handleDecodeSignal}
                  disabled={!translatorInput.trim() && !selectedContext}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-base shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  {isDecoding ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Sinyal Çözülüyor...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      <span>Sinyali Çöz</span>
                    </>
                  )}
                  
                  {/* Animated Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                <p className="text-[10px] text-center text-[#A0AEC0] mt-4 leading-relaxed">
                  Mila, Ross Greene'in CPS modelini kullanarak davranışın altındaki ihtiyacı tespit eder.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-24 left-6 right-6 bg-[#2D3748] text-white rounded-2xl p-4 shadow-2xl z-50 flex items-center justify-between"
          >
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.();
                  setToast(null);
                }}
                className="ml-3 px-3 py-1.5 bg-white/20 rounded-lg text-xs font-bold"
              >
                Aç
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
