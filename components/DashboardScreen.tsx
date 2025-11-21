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
  ArrowRight
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
  const [activeTab, setActiveTab] = useState('chat');
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
