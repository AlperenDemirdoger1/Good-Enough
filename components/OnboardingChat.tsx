import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ChevronLeft, Quote, ArrowRight } from 'lucide-react';
import { Message, PersonaType, ChildProfile } from '../types';

interface OnboardingChatProps {
  persona: PersonaType;
  onComplete: (profile: ChildProfile) => void;
}

// YENİ SENARYO: Şefkatli ve Kapsayıcı Dil
const SCRIPT = {
    intro: "Derin bir nefes al. 🌿 Ben Mila. Burada mükemmel olmaya çalışmıyoruz. 'Yeterince İyi' olmak bizim için kafi. Önce seninle tanışalım, sana nasıl hitap edeyim?",
    
    q_role: (name: string) => `Memnun oldum ${name}. 🌿 Peki bu hikayede rolün nedir?`,
    
    q_count: "Ne güzel. Evde kaç tane minik kalp atıyor? 🏡",
    
    q_child: "Anladım. Şimdilik odağımızı tek bir çocuğa verelim, böylece daha derinleşebiliriz. Bugün kimin için endişeleniyor veya destek arıyorsun? Adı ne?",
    
    q_details: (childName: string) => `${childName}... İsmi çok güzel. 🌟 Peki ${childName} kaç yaşında ve cinsiyeti ne?`,
    
    // 1. ENGINE (ENERJİ)
    q_engine: (childName: string) => `Harika. Şimdi ${childName}'i biraz daha yakından tanıyalım. 🔍 İlk olarak enerjisine bakalım: Sıkıldığında veya enerjisi bittiğinde genelde nasıl tepki verir?`,
    
    // 2. BRAKE (GEÇİŞLER)
    q_brake: "Bu çok doğal bir tepki. Peki ya geçiş anları? 🔄 Oyun bittiğinde, tablet kapandığında veya eve girerken... Bu geçişleri nasıl yaşarsınız?",
    
    // 3. HEART (DUYGU DÜNYASI)
    q_heart: "Geçişler hepimiz için zordur. ❤️ Peki ya duygu dünyası? Nöroçeşitli çocuklar bazen duyguları çok yoğun yaşar. Ona 'Hayır' dediğinde veya bir şeye üzüldüğünde tepkisi ne olur?",
    
    // 4. MOM (AYNA)
    q_mom: "Bu yoğunluğu kucaklamak büyük bir emek ister. 🌿 Şimdi dürüst olma sırası sende. Şu an senin sinir sistemin, içsel durumun nasıl?",
};

// SEÇENEKLER
const ROLE_OPTIONS = ["Anneyim 👩", "Babayım 👨", "Bakım Verenim 🤍"];
const COUNT_OPTIONS = ["Tek Çocuk 🐣", "İki Çocuk 🐥🐥", "3+ Çocuk 🏠"];
const AGE_OPTIONS = ["2-4 Yaş", "5-7 Yaş", "8-11 Yaş", "12+ Yaş"];
const GENDER_OPTIONS = ["Kız", "Erkek"];

const ENGINE_OPTIONS = [
    { label: "Derin Hissediş 🌊", desc: "Duygular çok yoğun yaşanır, krizler büyüktür" },
    { label: "Hayalperest ✨", desc: "Kendi dünyasında mutlu, bazen seni duymaz" },
    { label: "Keşif Enerjisi 🚀", desc: "Yerinde duramaz, meraklı ve hareketli" },
    { label: "Güvenli Liman ⚓️", desc: "Sana yakın olmak ister, temasa ihtiyaç duyar" }
];

const BRAKE_OPTIONS = [
    { label: "Yoğun Geçiş 🌪️", desc: "Aktivite bitişlerinde zorlanır, tepki verir" },
    { label: "Zaman Bükücü ⏳", desc: "Kendi ritminde hareket eder, aceleye gelemez" },
    { label: "Hassas Kapanış 🐚", desc: "Çabuk küser, içine kapanır" },
    { label: "Akışta 🌊", desc: "Genelde uyumludur, geçişleri rahattır" }
];

const HEART_OPTIONS = [
    { label: "Cam Kalp 💎", desc: "Çok hassastır, 'sevilmiyorum' hissine kapılabilir" },
    { label: "Ateş Elementi 🔥", desc: "Üzüntüsünü öfke ile dışa vurur" },
    { label: "Koruyucu Kalkan 🛡️", desc: "İletişimi keser, duygularını saklar" },
    { label: "Esnek Bambu 🎋", desc: "Duygularını yaşar ve çabuk toparlar" }
];

const MOM_OPTIONS = [
    { label: "Savaş/Kaç ⚔️", desc: "Tetikten düşmüyorum, parlıyorum" },
    { label: "Donma 🧊", desc: "Hissizleştim, pilim bitti" },
    { label: "Suçluluk 😔", desc: "Kendimi yargılıyorum" },
    { label: "Güvende 🌿", desc: "Yorgunum ama yönetebiliyorum" }
];

export const OnboardingChat: React.FC<OnboardingChatProps> = ({ persona, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<number>(0); 
  const [showTransition, setShowTransition] = useState(false); 
  
  // Form Data
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childGender, setChildGender] = useState('');
  
  const [engine, setEngine] = useState('');
  const [brake, setBrake] = useState('');
  const [rsd, setRsd] = useState('');
  const [nervousSystem, setNervousSystem] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(SCRIPT.intro);
      setIsTyping(false);
    }, 1500); 
  }, [persona]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'model',
      text,
      timestamp: Date.now()
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: Date.now()
    }]);
  };

  const handleInputSubmit = async (value: string) => {
    if (!value.trim()) return;
    
    addUserMessage(value); 
    setInput('');
    setIsTyping(true);

    // UX Delays
    setTimeout(async () => {
      // Step 0: Parent Name -> Ask Role
      if (step === 0) {
        setParentName(value);
        addBotMessage(SCRIPT.q_role(value));
        setStep(1);
        setIsTyping(false);
      }
      // Step 1: Role -> Ask Count
      else if (step === 1) {
        addBotMessage(SCRIPT.q_count);
        setStep(2);
        setIsTyping(false);
      }
      // Step 2: Count -> Ask Child Name
      else if (step === 2) {
        addBotMessage(SCRIPT.q_child);
        setStep(3);
        setIsTyping(false);
      }
      // Step 3: Child Name -> Ask Age/Gender
      else if (step === 3) {
        setChildName(value);
        addBotMessage(SCRIPT.q_details(value));
        setStep(4);
        setIsTyping(false);
      }
      // Step 4: Age/Gender -> Ask Engine
      else if (step === 4) {
        addBotMessage(SCRIPT.q_engine(childName));
        setStep(5);
        setIsTyping(false);
      }
      // Step 5: Engine -> Ask Brake
      else if (step === 5) {
        setEngine(value);
        addBotMessage(SCRIPT.q_brake);
        setStep(6);
        setIsTyping(false);
      }
      // Step 6: Brake -> Ask Heart
      else if (step === 6) {
        setBrake(value);
        addBotMessage(SCRIPT.q_heart);
        setStep(7);
        setIsTyping(false);
      }
      // Step 7: Heart -> Ask Mom
      else if (step === 7) {
        setRsd(value);
        addBotMessage(SCRIPT.q_mom);
        setStep(8);
        setIsTyping(false);
      }
      // Step 8: Mom -> TRANSITION
      else if (step === 8) {
        setNervousSystem(value);
        setIsTyping(false);
        setShowTransition(true);

        setTimeout(() => {
            onComplete({
                parentName,
                name: childName,
                age: childAge,
                gender: childGender,
                engine: engine,
                brake: brake,
                rsd: rsd,
                nervousSystem: value
            });
        }, 4000); 
      }
    }, 1000);
  };

  const renderInputArea = () => {
    if (isTyping || showTransition) return (
        <div className="h-16 flex items-center justify-center text-[#A0AEC0] text-sm font-light tracking-wide animate-pulse bg-[#FAFAF8]">
            <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-[#7E9F95]" />
                <span>Mila düşünüyor...</span>
            </div>
        </div>
    );

    // Text Input: Parent Name & Child Name
    if (step === 0 || step === 3) {
      let placeholder = "Buraya yazabilirsin...";
      if (step === 0) placeholder = "Adın ne?";
      if (step === 3) placeholder = "Çocuğunun adı ne?";

      return (
        <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
            <div className="flex items-center bg-white rounded-full border border-[#E2E8F0] shadow-[0_4px_15px_rgb(0,0,0,0.03)] p-1 pl-5 transition-all focus-within:border-[#7E9F95] focus-within:ring-1 focus-within:ring-[#7E9F95]/20">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit(input)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-[#2D3748] placeholder:text-[#A0AEC0] h-12"
                autoFocus
            />
            <button 
                onClick={() => handleInputSubmit(input)}
                className="w-10 h-10 bg-[#7E9F95] rounded-full flex items-center justify-center text-white hover:bg-[#6C8A80] transition-colors shadow-md shadow-[#7E9F95]/20"
            >
                <Send size={18} />
            </button>
            </div>
        </div>
      );
    }

    // Selection Buttons: Role, Count, Age, Gender
    if (step === 1 || step === 2) {
        const options = step === 1 ? ROLE_OPTIONS : COUNT_OPTIONS;
        return (
             <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
                <div className="flex flex-wrap gap-2 justify-center">
                    {options.map(opt => (
                        <button 
                            key={opt} 
                            onClick={() => handleInputSubmit(opt)}
                            className="px-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#4A4A4A] shadow-sm hover:border-[#7E9F95] hover:bg-[#7E9F95]/5 transition-all"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
             </div>
        );
    }

    // Age & Gender Selection (Step 4)
    if (step === 4) {
        const isReady = childAge && childGender;
        return (
            <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-xs text-[#A0AEC0] uppercase tracking-wide mb-2 ml-1">Yaş Grubu</p>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {AGE_OPTIONS.map(age => {
                                const isSelected = childAge === age;
                                return (
                                    <button 
                                        key={age} 
                                        onClick={() => setChildAge(age)} 
                                        className={`whitespace-nowrap px-4 py-3 border rounded-2xl text-sm font-medium transition-all
                                            ${isSelected 
                                                ? 'bg-[#7E9F95] text-white border-[#7E9F95] shadow-md' 
                                                : 'bg-white border-[#E2E8F0] text-[#4A4A4A] hover:border-[#7E9F95]'}
                                        `}
                                    >
                                        {age}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-[#A0AEC0] uppercase tracking-wide mb-2 ml-1">Cinsiyet</p>
                        <div className="flex gap-3">
                             {GENDER_OPTIONS.map(gender => {
                                 const isSelected = childGender === gender;
                                 return (
                                    <button 
                                        key={gender} 
                                        onClick={() => setChildGender(gender)} 
                                        className={`flex-1 py-3 border rounded-2xl text-sm font-medium transition-all
                                            ${isSelected 
                                                ? 'bg-[#7E9F95] text-white border-[#7E9F95] shadow-md' 
                                                : 'bg-white border-[#E2E8F0] text-[#4A4A4A] hover:border-[#7E9F95]'}
                                        `}
                                    >
                                        {gender}
                                    </button>
                                 );
                            })}
                        </div>
                    </div>

                    <div className="mt-2">
                        <button 
                            onClick={() => isReady && handleInputSubmit(`${childAge}, ${childGender}`)}
                            disabled={!isReady}
                            className={`w-full py-3.5 rounded-2xl flex items-center justify-center font-medium transition-all duration-300
                                ${isReady 
                                    ? 'bg-[#2D3748] text-white shadow-lg hover:shadow-xl active:scale-95' 
                                    : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'}
                            `}
                        >
                            <span>Devam Et</span>
                            <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Card Options Steps (Deep Dive)
    let currentOptions: { label: string, desc: string }[] = [];
    if (step === 5) currentOptions = ENGINE_OPTIONS;
    if (step === 6) currentOptions = BRAKE_OPTIONS;
    if (step === 7) currentOptions = HEART_OPTIONS;
    if (step === 8) currentOptions = MOM_OPTIONS;

    return (
        <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2.5 max-h-52 overflow-y-auto">
            {currentOptions.map((opt) => (
                <button
                key={opt.label}
                onClick={() => handleInputSubmit(opt.label)}
                className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-left shadow-sm hover:border-[#7E9F95] hover:bg-[#FAFAF8] active:scale-95 transition-all flex flex-col justify-center h-20"
                >
                    <span className="text-[#2D3748] text-sm font-bold mb-1">{opt.label}</span>
                    <span className="text-[#718096] text-[10px] font-light leading-tight">{opt.desc}</span>
                </button>
            ))}
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] relative overflow-hidden">
      
      {/* WINNICOTT TRANSITION OVERLAY */}
      <AnimatePresence>
        {showTransition && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#FAFAF8] flex flex-col items-center justify-center p-8 text-center"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                     <Quote className="w-8 h-8 text-[#E8C3B0] mx-auto mb-6 opacity-80" />
                     <h2 className="font-serif text-2xl text-[#5A6B65] italic leading-relaxed mb-4">
                        "Bir çocuk, anlaşılmak için o kadar çok şey yapar ki... <br/>Senin görevin onu düzeltmek değil, sadece 'görmektir'."
                     </h2>
                     <div className="w-12 h-1 bg-[#E8C3B0] mx-auto rounded-full opacity-50 mb-2"></div>
                     <p className="text-xs text-[#A0AEC0] uppercase tracking-widest">Donald Winnicott</p>
                     <p className="text-sm text-[#7E9F95] mt-8 animate-pulse">Analiz oluşturuluyor...</p>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-28 z-20 flex items-end pb-4 px-6 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/95 to-transparent pointer-events-none">
        <div className="flex items-center w-full pointer-events-auto">
            <div className="mr-4 text-[#A0AEC0] cursor-pointer">
                 <ChevronLeft size={24} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7E9F95] font-serif italic font-bold border border-[#E2E8F0] shadow-sm relative">
                M
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#7E9F95] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col ml-3">
                <span className="font-serif text-[#2D3748] text-lg tracking-wide">Mila</span>
                <span className="text-[10px] text-[#7E9F95] font-medium uppercase tracking-widest flex items-center opacity-80">
                <span className="w-1 h-1 bg-[#7E9F95] rounded-full mr-1 animate-pulse"></span>
                Seni Dinliyor
                </span>
            </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pt-32 pb-4 px-5 space-y-6 scrollbar-hide">
        
        {/* Epigraph */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="flex flex-col items-center text-center mb-10 px-6 mt-2"
        >
            <Quote className="w-6 h-6 text-[#E8C3B0] mb-3 opacity-60" />
            <h2 className="font-serif text-xl text-[#5A6B65] italic leading-relaxed">
              "Mükemmel ebeveyn yoktur.<br/>Sadece 'yeterince iyi' olanlar vardır."
            </h2>
            <div className="flex items-center mt-3 space-x-2">
                <div className="h-px w-6 bg-[#E8C3B0] opacity-50"></div>
                <span className="text-[10px] text-[#A0AEC0] uppercase tracking-widest font-medium">Donald Winnicott</span>
                <div className="h-px w-6 bg-[#E8C3B0] opacity-50"></div>
            </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-5 shadow-sm relative text-[15px] leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-[#7E9F95] text-white rounded-[24px] rounded-tr-none' 
                        : 'bg-white text-[#4A4A4A] rounded-[24px] rounded-tl-none border border-[#F0F0F0]'
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
            </React.Fragment>
          ))}
          
          {/* Typing Indicator */}
           {isTyping && !showTransition && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="flex justify-start"
           >
              <div className="bg-white/80 p-4 rounded-[24px] rounded-tl-none border border-[#E2E8F0] flex items-center space-x-1 w-16 justify-center h-12">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#A0AEC0] rounded-full"></motion.div>
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#A0AEC0] rounded-full"></motion.div>
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#A0AEC0] rounded-full"></motion.div>
              </div>
           </motion.div>
          )}

          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Fixed Input Area */}
      <div className="relative z-30">
         {renderInputArea()}
      </div>

    </div>
  );
};
