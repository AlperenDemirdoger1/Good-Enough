import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ChevronLeft, Quote, ArrowRight, Check } from 'lucide-react';
import { Message, PersonaType, ChildProfile } from '../types';

interface OnboardingChatProps {
  persona: PersonaType;
  onComplete: (profile: ChildProfile) => void;
}

// YENİ SENARYO
const SCRIPT = {
    intro: "Hoş geldin. 🌿 Ben Mila. Burası senin güvenli alanın. Mükemmel olmaya çalışmıyoruz, sadece 'yeterince iyi' olmak için buradayız. Önce seni tanıyalım, sana nasıl hitap edebilirim?",
    
    q_role: (name: string) => `Memnun oldum ${name}! 🌿 Bu hikayede rolün nedir?`,
    
    q_focus1: "Harika. Şimdi asıl konuya gelelim... En öncelikli odak alanın nedir? Seni buraya getiren ana sebep ne?",
    
    q_focus2: "Anlıyorum. Peki bunun yanında destek almak istediğin ikincil bir konu var mı?",
    
    msg_empathy1: "Bunu duyduğuma sevindim. Birçok ebeveyn tam olarak bu noktada zorlanıyor, yalnız değilsin. 🤍 Şimdi odaklanacağımız o özel çocuktan bahsedelim.",
    
    q_child_info: "Çocuğunun adı ne ve ne zaman dünyaya geldi?",
    
    msg_child_intro: (name: string) => `Memnun oldum ${name}. 🌟 Onun dünyasını daha iyi anlamak için birkaç sorum daha olacak.`,
    
    q_diagnosis: "Herhangi bir nöroçeşitlilik durumu (DEHB, Otizm vb.) veya şüphen var mı? (Birden fazla seçebilirsin)",
    
    q_therapy: "Peki şu an herhangi bir profesyonel destek veya ilaç tedavisi alıyor musunuz?",
    
    msg_empathy2: "Teşekkürler. Bu süreçte bir köy dolusu desteği hak ediyorsun. 🏡 Şimdi günlük hayata bakalım.",
    
    q_conflict_freq: "Son bir haftayı düşünürsen... Günlük görevler (giyinme, yemek, ödev) etrafında ne sıklıkla çatışma yaşıyorsunuz?",
    
    q_motivation: "Peki ${childName}, bu görevleri tamamlama konusunda ne kadar istekli veya motive görünüyor?",
    
    q_behaviors: "Geçen hafta şu davranışlardan hangilerini gözlemledin? (Hepsini seçebilirsin)",
    
    q_interests: "Son olarak, onun gözlerini parlatan şeyler neler? İlgi alanları neler?",
    
    closing: "Harika. Senin ve çocuğun için kişiselleştirilmiş yol haritanı hazırladım. 🗺️"
};

// SEÇENEKLER
const ROLE_OPTIONS = ["Anneyim 👩", "Babayım 👨", "Bakım Verenim 🤍"];

const FOCUS_OPTIONS = [
    "Öfke Nöbetleri / Kriz Yönetimi 🌋",
    "Günlük Rutinler (Uyku, Yemek) 📅",
    "Dikkat Eksikliği / Odaklanma 🧠",
    "Duygusal Hassasiyet 💧",
    "Kardeş İlişkileri 👫",
    "Ekran Süresi Yönetimi 📱"
];

const DIAGNOSIS_OPTIONS = [
    "DEHB (Tanılı)", "DEHB (Şüpheli)",
    "Otizm / OSB (Tanılı)", "Otizm / OSB (Şüpheli)",
    "Özel Öğrenme Güçlüğü", "Kaygı Bozukluğu",
    "Duyusal Hassasiyet", "Henüz Bilmiyorum / Yok"
];

const THERAPY_OPTIONS = [
    "İlaç Kullanıyor 💊",
    "Oyun Terapisi 🧸",
    "Ergoterapi 🎨",
    "Özel Eğitim 📚",
    "Destek Almıyoruz"
];

const FREQUENCY_OPTIONS = [
    { val: 1, label: "Neredeyse Hiç" },
    { val: 2, label: "Nadiren" },
    { val: 3, label: "Bazen" },
    { val: 4, label: "Sık Sık" },
    { val: 5, label: "Her Gün" }
];

const BEHAVIOR_OPTIONS = [
    "Görevleri tamamlamakta zorlandı",
    "Talimatlardan kaçındı / duymazdan geldi",
    "Öfke veya hayal kırıklığıyla tartıştı",
    "Ani duygusal patlamalar yaşadı",
    "Yeni bir şey yapmadan önce endişelendi",
    "Yerinde duramadı / çok hareketliydi"
];

const INTEREST_OPTIONS = [
    "Video Oyunları 🎮", "Lego / Yapı Oyuncakları 🧱",
    "Resim / Sanat 🎨", "Spor / Hareket ⚽️",
    "Doğa / Hayvanlar 🐾", "Müzik / Dans 🎵",
    "Kitaplar / Hikayeler 📚", "Bilim / Uzay 🚀"
];


export const OnboardingChat: React.FC<OnboardingChatProps> = ({ persona, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(''); // For text inputs
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<number>(0); 
  
  // Data States
  const [parentName, setParentName] = useState('');
  const [parentRole, setParentRole] = useState('');
  const [focus1, setFocus1] = useState('');
  const [focus2, setFocus2] = useState('');
  
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('');
  
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [therapies, setTherapies] = useState<string[]>([]);
  
  const [conflictFreq, setConflictFreq] = useState<number>(0);
  const [motivationLevel, setMotivationLevel] = useState<number>(0);
  
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial Message
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(SCRIPT.intro);
      setIsTyping(false);
    }, 1000); 
  }, []);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text, timestamp: Date.now() }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() }]);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "0";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
  };

  // --- HANDLERS ---

  const handleSingleSelect = (value: string, nextStep: number, botMsg?: string) => {
    addUserMessage(value); 
    setIsTyping(true);
    setTimeout(() => {
        if (botMsg) addBotMessage(botMsg);
        setStep(nextStep);
        setIsTyping(false);
    }, 800);
  };

  const handleMultiSelectSubmit = (selected: string[], nextStep: number, botMsg?: string) => {
      if (selected.length === 0) return;
      addUserMessage(selected.join(", "));
      setIsTyping(true);
      setTimeout(() => {
        if (botMsg) addBotMessage(botMsg);
        setStep(nextStep);
        setIsTyping(false);
      }, 800);
  };

  const handleParentNameSubmit = () => {
      if (!input) return;
      setParentName(input);
      addUserMessage(input);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
          addBotMessage(SCRIPT.q_role(parentName || input));
          setStep(1);
        setIsTyping(false);
      }, 800);
  };

  const handleChildInfoSubmit = () => {
      if (!childName || !childDob) return;
      addUserMessage(`${childName}, ${childDob}`);
      setIsTyping(true);
      setTimeout(() => {
          addBotMessage(SCRIPT.msg_child_intro(childName));
        setTimeout(() => {
             addBotMessage(SCRIPT.q_diagnosis);
             setStep(5); // Go to Diagnosis
             setIsTyping(false);
    }, 1000);
      }, 800);
  };

  // --- RENDER INPUTS ---

  const renderInputArea = () => {
    if (isTyping) return <TypingIndicator />;

    // Step 0: Parent Name (Text Input)
    if (step === 0) {
      return (
        <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
                <div className="flex items-center bg-white rounded-full border border-[#E2E8F0] shadow-sm p-1 pl-5">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && input && handleParentNameSubmit()}
                        placeholder="Adın ne?"
                className="flex-1 bg-transparent outline-none text-[#2D3748] placeholder:text-[#A0AEC0] h-12"
                autoFocus
            />
            <button 
                        onClick={handleParentNameSubmit}
                        disabled={!input}
                        className="w-10 h-10 bg-[#7E9F95] rounded-full flex items-center justify-center text-white disabled:opacity-50"
            >
                        <ArrowRight size={18} />
            </button>
            </div>
        </div>
      );
    }

    // Step 1: Role
    if (step === 1) {
        return <SingleSelect options={ROLE_OPTIONS} onSelect={(val) => {
            setParentRole(val);
            handleSingleSelect(val, 2, SCRIPT.q_focus1);
        }} />;
    }

    // Step 2: Focus 1
    if (step === 2) {
        return <SingleSelect options={FOCUS_OPTIONS} onSelect={(val) => {
            setFocus1(val);
            handleSingleSelect(val, 3, SCRIPT.q_focus2);
        }} />;
    }

    // Step 3: Focus 2
    if (step === 3) {
        return <SingleSelect options={FOCUS_OPTIONS.filter(f => f !== focus1)} onSelect={(val) => {
            setFocus2(val);
            // EMPATHY INTERLUDE
            addUserMessage(val);
            setIsTyping(true);
            setTimeout(() => {
                addBotMessage(SCRIPT.msg_empathy1);
                setTimeout(() => {
                    addBotMessage(SCRIPT.q_child_info);
                    setStep(4);
                    setIsTyping(false);
                }, 1500);
            }, 800);
        }} />;
    }

    // Step 4: Child Name & DOB
    if (step === 4) {
        return (
            <div className="p-4 bg-[#FAFAF8] border-t border-gray-100">
                <div className="flex flex-col gap-3">
                    <input 
                        type="text" 
                        placeholder="Çocuğunun Adı"
                        value={childName}
                        onChange={e => setChildName(e.target.value)}
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#7E9F95]"
                    />
                    <input 
                        type="date" 
                        value={childDob}
                        onChange={e => setChildDob(e.target.value)}
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#7E9F95] text-[#4A4A4A]"
                    />
                    <button 
                        onClick={handleChildInfoSubmit}
                        disabled={!childName || !childDob}
                        className="w-full bg-[#2D3748] text-white p-4 rounded-2xl font-medium disabled:opacity-50"
                    >
                        Devam Et
                    </button>
                </div>
            </div>
        );
    }

    // Step 5: Diagnosis (Multi)
    if (step === 5) {
        return <MultiSelect 
            options={DIAGNOSIS_OPTIONS} 
            selected={diagnoses} 
            onChange={setDiagnoses}
            onSubmit={() => handleMultiSelectSubmit(diagnoses, 6, SCRIPT.q_therapy)}
        />;
    }

    // Step 6: Therapy (Multi)
    if (step === 6) {
        return <MultiSelect 
            options={THERAPY_OPTIONS} 
            selected={therapies} 
            onChange={setTherapies}
            onSubmit={() => {
                // EMPATHY INTERLUDE 2
                if (therapies.length === 0) return;
                addUserMessage(therapies.join(", "));
                setIsTyping(true);
                setTimeout(() => {
                    addBotMessage(SCRIPT.msg_empathy2);
                    setTimeout(() => {
                        addBotMessage(SCRIPT.q_conflict_freq);
                        setStep(7);
                        setIsTyping(false);
                    }, 1500);
                }, 800);
            }}
        />;
    }

    // Step 7: Conflict Frequency (Scale)
    if (step === 7) {
        return <ScaleSelect options={FREQUENCY_OPTIONS} onSelect={(val) => {
            setConflictFreq(val);
            handleSingleSelect(`${val}/5`, 8, SCRIPT.q_motivation.replace("${childName}", childName));
        }} />;
    }

    // Step 8: Motivation (Scale)
    if (step === 8) {
        return <ScaleSelect options={FREQUENCY_OPTIONS} onSelect={(val) => {
            setMotivationLevel(val);
            handleSingleSelect(`${val}/5`, 9, SCRIPT.q_behaviors);
        }} />;
    }

    // Step 9: Behaviors (Multi)
    if (step === 9) {
        return <MultiSelect 
            options={BEHAVIOR_OPTIONS} 
            selected={behaviors} 
            onChange={setBehaviors}
            onSubmit={() => handleMultiSelectSubmit(behaviors, 10, SCRIPT.q_interests)}
        />;
    }

    // Step 10: Interests (Multi) -> FINISH
    if (step === 10) {
        return <MultiSelect 
            options={INTEREST_OPTIONS} 
            selected={interests} 
            onChange={setInterests}
            onSubmit={() => {
                addUserMessage(interests.join(", "));
                setIsTyping(true);
                setTimeout(() => {
                    addBotMessage(SCRIPT.closing);
                    setTimeout(() => {
                        onComplete({
                            parentName: parentName,
                            name: childName,
                            age: calculateAge(childDob),
                            gender: "Çocuk",
                            engine: focus1,
                            brake: `Çatışma: ${conflictFreq}/5`,
                            rsd: behaviors.join(", "),
                            nervousSystem: therapies.join(", ")
                        });
                    }, 2000);
                }, 1000);
            }}
        />;
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-24 z-20 flex items-end pb-2 px-6 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#F0F0F0]">
         <div className="flex items-center w-full">
            <div className="w-8 h-8 rounded-full bg-[#7E9F95] flex items-center justify-center text-white font-serif font-bold">M</div>
            <span className="ml-3 font-serif text-[#2D3748] font-medium">Mila</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pt-28 pb-4 px-5 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
        <motion.div
                key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-[#7E9F95] text-white rounded-tr-none' 
                    : 'bg-white text-[#4A4A4A] border border-[#E2E8F0] rounded-tl-none shadow-sm'
                }`}>
                    {msg.text}
                  </div>
                </motion.div>
        ))}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-30 bg-[#FAFAF8]">
         {renderInputArea()}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const TypingIndicator = () => (
    <div className="h-16 flex items-center justify-center space-x-1 bg-[#FAFAF8]">
        <div className="w-2 h-2 bg-[#A0AEC0] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#A0AEC0] rounded-full animate-bounce delay-75"></div>
        <div className="w-2 h-2 bg-[#A0AEC0] rounded-full animate-bounce delay-150"></div>
    </div>
);

const SingleSelect = ({ options, onSelect }: { options: string[], onSelect: (val: string) => void }) => (
    <div className="p-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 justify-center">
            {options.map(opt => (
                <button 
                    key={opt} 
                    onClick={() => onSelect(opt)}
                    className="px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#4A4A4A] hover:border-[#7E9F95] hover:bg-[#7E9F95]/5 transition-all shadow-sm"
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const ScaleSelect = ({ options, onSelect }: { options: {val: number, label: string}[], onSelect: (val: number) => void }) => (
    <div className="p-4 border-t border-gray-100">
        <div className="flex flex-col gap-2">
             {options.map(opt => (
                <button 
                    key={opt.val} 
                    onClick={() => onSelect(opt.val)}
                    className="w-full py-3 px-4 bg-white border border-[#E2E8F0] rounded-xl text-left text-sm text-[#4A4A4A] hover:border-[#7E9F95] flex justify-between items-center group"
                >
                    <span>{opt.label}</span>
                    <div className="w-6 h-6 rounded-full border border-[#E2E8F0] flex items-center justify-center group-hover:border-[#7E9F95] group-hover:bg-[#7E9F95] group-hover:text-white transition-all">
                        <span className="text-xs">{opt.val}</span>
                    </div>
                </button>
             ))}
        </div>
    </div>
);

const MultiSelect = ({ options, selected, onChange, onSubmit }: { 
    options: string[], 
    selected: string[], 
    onChange: (val: string[]) => void, 
    onSubmit: () => void 
}) => {
    const toggle = (opt: string) => {
        if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
        else onChange([...selected, opt]);
    };

    return (
        <div className="p-4 border-t border-gray-100 max-h-[40vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2 mb-3">
                {options.map(opt => {
                    const isActive = selected.includes(opt);
                    return (
                        <button 
                            key={opt} 
                            onClick={() => toggle(opt)}
                            className={`w-full py-3 px-4 rounded-xl text-left text-sm flex justify-between items-center transition-all ${
                                isActive 
                                ? 'bg-[#7E9F95] text-white shadow-md' 
                                : 'bg-white border border-[#E2E8F0] text-[#4A4A4A]'
                            }`}
                        >
                            <span>{opt}</span>
                            {isActive && <Check size={16} />}
                        </button>
                    )
                })}
            </div>
            <button 
                onClick={onSubmit}
                disabled={selected.length === 0}
                className="w-full py-3 bg-[#2D3748] text-white rounded-xl font-medium disabled:opacity-50 transition-opacity"
            >
                Devam Et
            </button>
    </div>
  );
};
