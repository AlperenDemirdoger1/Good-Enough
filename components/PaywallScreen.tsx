
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight, X, ArrowRight as ArrowIcon } from 'lucide-react';
import { ChildProfile } from '../types';

interface PaywallScreenProps {
  profile: ChildProfile;
  onUnlock: () => void;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ profile, onUnlock }) => {
  
  // Dynamic content based on analysis (Mock logic for demo)
  const beforeAfter = [
      {
          title: "Sabah Rutini",
          before: "3 kere bağırarak uyandırma, geç kalma stresi, 'giymeyeceğim' krizi.",
          after: "Dopamin odaklı uyanış, oyunla giyinme, huzurlu kahvaltı."
      },
      {
          title: "Ders/Ödev",
          before: "Başında bekçi gibi dikilme, ağlama nöbetleri, tükenmişlik.",
          after: "Vücut ikizleme (Body Doubling) ile kendi kendine başlama."
      },
      {
          title: "Kriz Anı (Meltdown)",
          before: "Çaresizlik, cezalandırma, suçluluk sarmalı.",
          after: "Sinir sistemini okuma, 2 dakikada güvenli limana geçiş."
      }
  ];

  return (
    <div className="h-full bg-[#FAFAF8] flex flex-col relative overflow-hidden">
       {/* Aurora Background */}
       <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#7E9F95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
       <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-[#E8C3B0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Premium Header */}
      <div className="relative z-10 pt-10 px-6 pb-4 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
         >
             <p className="text-[#7E9F95] text-xs font-bold uppercase tracking-widest mb-2">{profile.name} için Dönüşüm</p>
             <h1 className="text-3xl font-serif text-[#2D3748] italic leading-tight mb-2">
                Eski Ev vs. <span className="not-italic text-[#D68C7F]">Yeni Ev</span>
             </h1>
             <p className="text-[#718096] font-light text-sm max-w-xs mx-auto">
                Mila ile önümüzdeki 3 hafta içinde evinin gerçekliği böyle değişecek.
             </p>
         </motion.div>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto relative z-10 scrollbar-hide">
        
        {/* REALITY SHIFT CARDS */}
        <div className="space-y-5 mt-4">
            {beforeAfter.map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0F0F0]"
                >
                    <div className="flex items-center mb-4">
                        <div className="h-px flex-1 bg-[#F0F0F0]"></div>
                        <span className="px-3 text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">{item.title}</span>
                        <div className="h-px flex-1 bg-[#F0F0F0]"></div>
                    </div>

                    <div className="flex gap-4">
                        {/* Before */}
                        <div className="flex-1 opacity-60 grayscale">
                            <div className="flex items-center text-[#E53E3E] text-[10px] font-bold mb-1">
                                <X size={12} className="mr-1" />
                                ÖNCESİ
                            </div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">
                                {item.before}
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center text-[#D68C7F]">
                             <ArrowIcon size={16} />
                        </div>

                        {/* After */}
                        <div className="flex-1">
                             <div className="flex items-center text-[#7E9F95] text-[10px] font-bold mb-1">
                                <Check size={12} className="mr-1" />
                                SONRASI
                            </div>
                            <p className="text-xs text-[#2D3748] font-medium leading-relaxed">
                                {item.after}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-6 mt-8 mb-8 opacity-80">
             <div className="flex items-center text-[10px] text-[#718096] bg-white/50 px-3 py-1.5 rounded-full border border-white">
                 <ShieldCheck size={14} className="text-[#7E9F95] mr-1.5" />
                 Bilimsel Temelli
             </div>
             <div className="flex items-center text-[10px] text-[#718096] bg-white/50 px-3 py-1.5 rounded-full border border-white">
                 <Check size={14} className="text-[#7E9F95] mr-1.5" />
                 7 Gün Ücretsiz Deneme
             </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mt-6 mb-6 border border-white">
           <p className="text-xs text-[#4A4A4A] italic leading-relaxed mb-3">
              "İlk 3 günde fark ettim. Artık sabah stresim yok, {profile.name}'nin dikkat eksikliği beni korkutmuyor. Bu sefer gerçekten başardım."
           </p>
           <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#7E9F95] flex items-center justify-center text-white text-xs font-bold mr-2">AB</div>
              <div>
                  <p className="text-[10px] font-semibold text-[#2D3748]">Ayşe B., İstanbul</p>
                  <p className="text-[9px] text-[#A0AEC0]">6 yaş DEHB çocuk annesi</p>
              </div>
           </div>
        </div>

      </div>

      {/* CTA Button - Fixed Bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8] to-transparent pt-6 px-6 pb-6 z-20">
         <motion.button
           onClick={onUnlock}
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full bg-gradient-to-r from-[#7E9F95] to-[#5F8A7E] text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
         >
           <span>Mila ile Başla</span>
           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
         </motion.button>
         <p className="text-center text-[9px] text-[#A0AEC0] mt-3">
            7 gün ücretsiz dene • İstediğin zaman iptal et
         </p>
      </div>
    </div>
  );
};