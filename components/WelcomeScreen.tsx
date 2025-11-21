
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onDebugDashboard?: () => void; // Opsiyonel debug prop
}

// Custom SVG Component for the New Logo (Mother & Child)
const MilaLogo = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Mother's Form - Sage Green */}
    <path 
      d="M100 180 C60 180 30 150 30 100 C30 50 60 20 100 20 C130 20 150 40 160 60" 
      fill="none" 
      stroke="#7E9F95" 
      strokeWidth="6" 
      strokeLinecap="round"
      className="opacity-90"
    />
    <path 
      d="M160 60 Q140 90 100 90 Q70 90 70 130" 
      fill="none" 
      stroke="#7E9F95" 
      strokeWidth="6" 
      strokeLinecap="round"
      className="opacity-90"
    />
    
    {/* Child's Form - Warm Terracotta/Sand */}
    <path 
      d="M110 130 Q130 130 140 110 Q150 90 130 70" 
      fill="none" 
      stroke="#D68C7F" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    <circle cx="130" cy="90" r="15" fill="#D68C7F" className="opacity-20" />
    
    {/* Enclosing Circle Segment */}
    <path 
      d="M170 80 A 80 80 0 0 1 120 180" 
      fill="none" 
      stroke="#D68C7F" 
      strokeWidth="6" 
      strokeLinecap="round"
      className="opacity-80"
    />
  </svg>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onDebugDashboard }) => {
  return (
    <div className="h-full w-full bg-[#FAFAF8] flex flex-col relative overflow-hidden">
      
      {/* Debug Button (Belirgin) */}
      {onDebugDashboard && (
        <button 
          onClick={onDebugDashboard}
          className="absolute top-6 left-6 z-50 px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-xl hover:scale-105 transition-transform border border-white/20 backdrop-blur-sm"
        >
          🚀 Dashboard
        </button>
      )}
      
      {/* Aurora Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-[#D8E2DC] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-8">
        
        {/* Minimal Header */}
        <div className="flex flex-col items-center justify-center pt-6 mb-8">
          <div className="flex items-center space-x-2 opacity-90 mb-1">
            <Sparkles size={14} className="text-[#7E9F95]" />
            <span className="text-xs font-medium tracking-[0.2em] text-[#5A6B65] uppercase">Mila</span>
          </div>
          <p className="text-[#A0AEC0] text-[10px] font-light tracking-wide opacity-80">
            Nöroçeşitlilik odaklı yapay zeka desteği
          </p>
        </div>

        {/* Main Visual Area (Glassmorphism Orb) */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-72 h-72 flex items-center justify-center"
            >
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent blur-2xl"></div>
                
                {/* The Orb */}
                <div className="w-56 h-56 relative rounded-full backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_0_rgba(126,159,149,0.15)] flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/80 via-transparent to-[#7E9F95]/5"></div>
                    
                    {/* The Logo Visual */}
                    <div className="w-40 h-40 relative z-10">
                      <MilaLogo />
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-0 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white"
                >
                  <span className="text-xs font-medium text-[#7E9F95]">Empati</span>
                </motion.div>

                 <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 left-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white"
                >
                  <span className="text-xs font-medium text-[#7E9F95]">Bilim</span>
                </motion.div>
            </motion.div>

            {/* Typography */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="text-center mt-10"
            >
              <h1 className="text-4xl text-[#2D3748] leading-tight mb-4">
                Derin bir <br/> <span className="italic text-[#7E9F95]">nefes al.</span>
              </h1>
              <p className="text-[#718096] text-lg font-light max-w-xs mx-auto leading-relaxed">
                Annelik zorlu bir yolculuk, ama artık yalnız yürümek zorunda değilsin.
              </p>
            </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-5 bg-[#2D3748] text-[#FAFAF8] rounded-3xl font-medium text-lg shadow-xl shadow-[#2D3748]/20 flex items-center justify-center group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Yolculuğa Başla
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Subtle sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </motion.button>
        </div>

      </div>
    </div>
  );
};
