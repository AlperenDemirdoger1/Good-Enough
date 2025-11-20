
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChildProfile } from '../types';
import { geminiService } from '../services/geminiService';
import { Sparkles, Award, Globe, ArrowRight, CheckCircle, Brain } from 'lucide-react';

interface AnalysisScreenProps {
  profile: ChildProfile;
  onContinue: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ profile, onContinue }) => {
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const payload = await geminiService.generateInsight(
        profile.parentName,
        profile.name, 
        profile.engine,
        profile.brake,
        profile.nervousSystem
      );
      setInsight(payload);
      setLoading(false);
    };
    fetchInsight();
  }, [profile]);

  if (loading) {
      return (
        <div className="h-screen w-full bg-[#FAFAF8] flex flex-col items-center justify-center">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-[#E8C3B0] rounded-full flex items-center justify-center relative"
            >
                <div className="w-20 h-20 border border-[#7E9F95] rounded-full opacity-50"></div>
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#D68C7F] rounded-full"></div>
            </motion.div>
            <p className="mt-6 text-[#7E9F95] font-serif italic text-lg animate-pulse">Mila analiz ediyor...</p>
        </div>
      )
  }

  return (
    <div className="h-screen w-full bg-[#FAFAF8] overflow-y-auto relative pb-8">
       {/* Aurora Background */}
       <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FFF5F0] rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#F0F7F5] rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="relative z-10 p-6 pt-12 max-w-md mx-auto"
       >
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-[#F0F0F0] mb-4">
                    <Sparkles className="text-[#D68C7F] w-6 h-6" />
                </div>
                <h1 className="font-serif text-3xl text-[#2D3748] mb-2">Mila'nın İçgörüsü</h1>
                <p className="text-xs text-[#A0AEC0] uppercase tracking-widest">Good Enough Parenting Analizi</p>
            </div>

            {/* The Magic Card Content */}
            <div className="bg-white rounded-3xl border border-[#E8C3B0] shadow-[0_20px_40px_-15px_rgba(232,195,176,0.5)] p-8 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF5F0] rounded-bl-[100px] -mr-10 -mt-10 z-0"></div>
                
                <div className="relative z-10">
                    <div className="mb-8">
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#D68C7F] rounded-full opacity-40"></div>
                        <p className="text-xl text-[#4A4A4A] italic font-serif leading-relaxed pl-6">
                            "{insight?.insight}"
                        </p>
                    </div>

                    <div className="space-y-4">
                         <div className="flex items-start bg-[#FAFAF8] p-4 rounded-2xl border border-[#F0F0F0]">
                            <Award className="w-5 h-5 text-[#7E9F95] mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[#A0AEC0] uppercase font-bold tracking-wider mb-1">Nöro-Tip</p>
                                <p className="text-sm font-bold text-[#2D3748]">{insight?.neuroType}</p>
                            </div>
                        </div>

                         <div className="flex items-start bg-[#FAFAF8] p-4 rounded-2xl border border-[#F0F0F0]">
                            <Globe className="w-5 h-5 text-[#7E9F95] mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-[#A0AEC0] uppercase font-bold tracking-wider mb-1">Yalnız Değilsin</p>
                                <p className="text-sm text-[#718096] leading-snug">{insight?.socialProof}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action */}
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="w-full py-5 bg-[#2D3748] text-[#FAFAF8] rounded-3xl font-medium text-lg shadow-xl shadow-[#2D3748]/20 flex items-center justify-center group"
            >
                Çözüm Planını Gör
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-center text-[10px] text-[#A0AEC0] mt-4 opacity-60">Bilimsel temelli nöro-çeşitlilik yaklaşımı.</p>

       </motion.div>
    </div>
  );
};
