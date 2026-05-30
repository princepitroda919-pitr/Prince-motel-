import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Sparkles, Coffee, Compass, ArrowRight } from 'lucide-react';

// Custom beautiful vector representation of the user's uploaded Prince Motel Crest Logo
export function PrinceCrestLogo({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Crown Icon */}
      <svg className="w-12 h-10 text-emerald-500 fill-emerald-500/20" viewBox="0 0 100 80">
        {/* Crown base */}
        <path d="M20 70 Q 50 63 80 70 L 75 75 Q 50 68 25 75 Z" />
        {/* Five peaks with spheres */}
        <circle cx="10" cy="20" r="4" />
        <circle cx="30" cy="15" r="4" />
        <circle cx="50" cy="10" r="4" />
        <circle cx="70" cy="15" r="4" />
        <circle cx="90" cy="20" r="4" />
        {/* Peak connections */}
        <path d="M20 70 L 10 20 L 30 70 L 30 15 L 50 70 L 50 10 L 50 70 L 70 15 L 70 70 L 90 20 L 80 70 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
      {/* Circular Laurel & 'P' */}
      <div className="relative mt-1 flex items-center justify-center w-16 h-16 border-2 border-dashed border-emerald-500/40 rounded-full">
        {/* Foliage/Laurel Left and Right */}
        <div className="absolute inset-0 border-2 border-emerald-500/15 rounded-full"></div>
        {/* Letter P */}
        <span className="text-3xl font-bold font-sans tracking-wide text-white font-serif italic text-neon-glow">P</span>
      </div>

      {/* Decorative filigree scrolls below */}
      <div className="flex items-center gap-1 mt-1 text-emerald-500/70">
        <span className="text-lg">✤</span>
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-emerald-500/60"></div>
        <span className="text-xs font-serif italic text-emerald-400">PRINCE</span>
        <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-emerald-500/60"></div>
        <span className="text-lg">✤</span>
      </div>
    </div>
  );
}

interface HeroProps {
  availableCount: number;
  onScrollToBooking: () => void;
  onScrollToFood: () => void;
}

export default function Hero({ availableCount, onScrollToBooking, onScrollToFood }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-16 overflow-hidden bg-black text-gray-100">
      
      {/* Futuristic soft green spotlights & grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05150d_1px,transparent_1px),linear-gradient(to_bottom,#05150d_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full bg-emerald-950/20 blur-[130px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Animated Prince Crest Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-6 pointer-events-none"
        >
          <PrinceCrestLogo className="scale-110" />
        </motion.div>

        {/* Animated Destination Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-zinc-950 border border-[#22c55e]/30 text-[#22c55e] text-xs font-mono uppercase tracking-widest mb-6"
        >
          <Compass className="w-3.5 h-3.5 text-[#22c55e]" />
          <span>International Gateway</span>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none max-w-4xl"
        >
          Prince <span className="text-[#22c55e]">Motel</span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed font-mono uppercase tracking-wider"
        >
          Framed by spectacular cross-border greenery, we present an intimate sanctuary of exactly <strong className="text-[#22c55e]">5 meticulously crafted units</strong>. 
          Indulge in premium AC luxury, standard breeze retreats, and chef-made Veg & Non-Veg dining.
        </motion.p>

        {/* Quick Inventory Widget Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl mt-10 bg-[#111] border border-[#22c55e]/20 rounded-none p-4 md:p-6"
        >
          <div>
            <span className="block text-[10px] uppercase text-gray-500 font-mono tracking-widest">Rooms Pool</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#22c55e]">05 UNITS</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-gray-500 font-mono tracking-widest">Available Units</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#22c55e] flex items-center justify-center gap-1.5">
              <span className={`w-2 h-2 rounded-none inline-block ${availableCount > 0 ? 'bg-[#22c55e] animate-pulse' : 'bg-red-500'}`}></span>
              0{availableCount} LEFT
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 border-t border-[#22c55e]/20 md:border-t-0 md:border-l md:pl-4 pt-3 md:pt-0">
            <span className="block text-[10px] uppercase text-gray-500 font-mono tracking-widest">Dining System</span>
            <span className="text-xs font-bold text-[#22c55e] flex items-center justify-center gap-1 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> ALL-INCLUSIVE
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onScrollToBooking}
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#22c55e] text-black font-black uppercase tracking-widest text-xs hover:bg-white active:scale-[0.98] transition-all duration-300"
          >
            Book Your Stay Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
          </button>
          
          <button
            onClick={onScrollToFood}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-zinc-950 border border-[#22c55e]/30 hover:border-[#22c55e] text-white hover:text-[#22c55e] font-black uppercase tracking-widest text-xs active:scale-[0.98] transition-all duration-300"
          >
            <Coffee className="w-4 h-4" />
            Gastronomic Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
