import React from 'react';
import { motion } from 'framer-motion';
import { PersonaType } from '../types';
import { Smile, BarChart2, TrendingUp } from 'lucide-react';

interface ToneSelectorProps {
  onSelect: (persona: PersonaType) => void;
}

const ToneCard = ({ 
  icon: Icon, 
  title, 
  desc, 
  onClick,
  delay
}: { 
  icon: any; 
  title: string; 
  desc: string; 
  onClick: () => void;
  delay: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-left flex items-center space-x-5 group relative overflow-hidden"
  >
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#7E9F95]/0 to-[#7E9F95]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] text-[#7E9F95] group-hover:bg-[#7E9F95] group-hover:text-white transition-colors flex items-center justify-center shadow-sm border border-[#E2E8F0]">
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <div className="flex-1 relative z-10">
      <h3 className="text-lg font-serif italic text-[#2D3748] font-medium">{title}</h3>
      <p className="text-[#718096] text-xs mt-1 font-light leading-relaxed">{desc}</p>
    </div>
  </motion.button>
);

export const ToneSelector: React.FC<ToneSelectorProps> = ({ onSelect }) => {
  return (
    <div className="h-full bg-[#FAFAF8] px-6 flex flex-col relative overflow-hidden">
       {/* Aurora Background */}
       <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>

      <div className="flex-1 flex flex-col justify-center relative z-10 max-w-md mx-auto w-full">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
        >
             <div className="w-20 h-20 bg-gradient-to-tr from-white to-[#FAFAF8] rounded-full flex items-center justify-center text-[#7E9F95] font-serif italic text-3xl mb-6 shadow-lg shadow-[#7E9F95]/10 mx-auto border border-white">M</div>
             <h2 className="text-3xl font-serif text-[#2D3748] mb-3">Nasıl konuşalım?</h2>
             <p className="text-[#718096] font-light text-base leading-relaxed px-4">
               Sana en iyi desteği verebilmem için iletişim dilini seç.
             </p>
        </motion.div>

        <div className="space-y-4">
          <ToneCard 
            icon={Smile}
            title="Dostça"
            desc="Sıcak, samimi, yargılamayan. En yakın arkadaşın gibi."
            onClick={() => onSelect(PersonaType.FRIENDLY)}
            delay={0.2}
          />
          
          <ToneCard 
            icon={BarChart2}
            title="Mantıklı"
            desc="Net, kısa ve veri odaklı. Duygu yerine çözüm."
            onClick={() => onSelect(PersonaType.LOGICAL)}
            delay={0.3}
          />
          
          <ToneCard 
            icon={TrendingUp}
            title="Koçluk"
            desc="Motive edici, harekete geçiren ve yönlendirici."
            onClick={() => onSelect(PersonaType.COACH)}
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
};