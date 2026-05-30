import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, MapPin, Star, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface IntroGateProps {
  onEnter: () => void;
}

export default function IntroGate({ onEnter }: IntroGateProps) {
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [clickedLink, setClickedLink] = useState(false);

  // Auto typing simulator for "prince motel"
  useEffect(() => {
    const fullText = "prince motel";
    let index = 0;
    const typingTimer = setInterval(() => {
      if (index < fullText.length) {
        setSearchText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingTimer);
        setIsTyping(false);
        // Automatically trigger search results after typing finishes
        setTimeout(() => {
          setShowResults(true);
        }, 600);
      }
    }, 120);

    return () => clearInterval(typingTimer);
  }, []);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleResultClick = () => {
    setClickedLink(true);
    // Let the dramatic screen transition finish before entering the main resort page
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col justify-between font-sans relative overflow-hidden border-8 border-[#22c55e]">
      
      {/* Dynamic Laser Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>

      {/* Floating emerald neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-none bg-[#22c55e]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-none bg-green-500/10 blur-[120px] pointer-events-none"></div>

      {/* Top status header */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center text-xs text-[#22c55e] z-10 font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#22c55e] animate-pulse"></span>
          <span>SIMULATED OFFICIAL DEPLOYMENT</span>
        </div>
        <div>GLOBAL ACCESS: PRNC-919</div>
      </div>

      <div className="w-full max-w-2xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="google-search"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Google Brand Logo Mock */}
              <div className="flex gap-1 items-center mb-8 select-none">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">G<span className="text-[#22c55e]">o</span>ogle</span>
                <span className="text-xs font-mono uppercase bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 rounded-none px-1.5 py-0.5 ml-2">SIMULATOR</span>
              </div>

              {/* Dynamic Search Container */}
              <form onSubmit={handleManualSearch} className="w-full relative group">
                <div className="absolute inset-0 bg-[#22c55e]/10 rounded-none blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center bg-[#111] border border-[#22c55e]/30 focus-within:border-[#22c55e] rounded-none px-5 py-3.5 shadow-xl transition-all duration-300">
                  <Search className="w-5 h-5 text-gray-500 mr-3 group-focus-within:text-[#22c55e]" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    disabled={isTyping}
                    className="w-full bg-transparent border-none text-white focus:outline-none placeholder-gray-600 font-medium text-base caret-[#22c55e]"
                    placeholder="Search Google for lodging..."
                  />
                  {isTyping && (
                    <span className="w-1.5 h-5 bg-[#22c55e] animate-[pulse_0.8s_infinite] rounded-none absolute left-[150px] sm:left-[170px]"></span>
                  )}
                </div>
              </form>

              <p className="mt-4 text-xs text-gray-500 text-center font-mono uppercase tracking-wider">
                Simulating search indexes for <span className="text-[#22c55e]">prince motel</span> worldwide
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col"
            >
              {/* Mini Search Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-8 pb-4 border-b border-zinc-900 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white uppercase font-mono">Google <span className="text-[#22c55e]">Search</span></span>
                  <span className="text-[10px] bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-1 py-0.2 rounded-none font-mono uppercase">LIVE RESULT</span>
                </div>
                <div className="flex items-center bg-[#111] border border-[#22c55e]/30 rounded-none px-4 py-1.5 text-xs w-full sm:w-auto max-w-xs">
                  <Search className="w-3.5 h-3.5 text-[#22c55e] mr-2 shrink-0" />
                  <span className="text-[#22c55e] font-mono truncate">{searchText}</span>
                </div>
              </div>

              {/* Statistical indicator */}
              <p className="text-xs text-gray-500 mb-4 font-mono uppercase tracking-wide">
                About 1,480,000 results (0.34 seconds) found for "prince motel" - Priority Match:
              </p>

              {/* The Official Listing Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-[#111111] hover:bg-[#151515] border-2 border-[#22c55e] p-6 rounded-none relative transition-all duration-300 shadow-2xl cursor-pointer group neon-glow-green"
                onClick={handleResultClick}
              >
                {/* Featured Badge */}
                <span className="absolute -top-3.5 left-6 bg-[#22c55e] text-black text-[10px] font-black tracking-widest px-3 py-1 rounded-none uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" /> Official Published Website
                </span>

                {/* Star review pill */}
                <div className="flex items-center gap-2 mt-2 mb-3">
                  <div className="flex text-[#22c55e]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e] text-[#22c55e]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#22c55e] font-mono uppercase">5.0 Star Resort</span>
                  <span className="text-xs text-gray-500 font-mono uppercase">(482 certified guest ratings)</span>
                </div>

                {/* Main Link Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#22c55e] transition-all font-sans uppercase tracking-tight flex items-center gap-2">
                  Prince Motel — Out-of-Country Luxury & Dining Palace
                  <ExternalLink className="w-5 h-5 text-[#22c55e] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </h3>

                {/* Google Display URL */}
                <p className="text-xs text-[#22c55e]/70 font-mono mt-1 mb-3">
                  https://www.princemotel.luxury/destination-royal-rooms
                </p>

                {/* Snippet Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  Welcome to <strong className="text-white font-sans">Prince Motel</strong>, the premier cross-border sanctuary. 
                  Experience <strong>5 exclusive premium AC suites (₹3000/day)</strong> and comfort 
                  normal rooms (₹1500/day). Delicious <strong>all-inclusive Veg</strong> (Punjabi, Idli, Dhosa, Chinese, Gujarati at ₹500/dish) & 
                  <strong>Non-Veg</strong> (premium Chicken and Egg specials at ₹600/dish) dining served directly to your private rooms.
                </p>

                {/* Highlight Sitelinks */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#22c55e]/20 text-xs">
                  <div>
                    <span className="text-[#22c55e] font-bold uppercase tracking-wider block mb-1">✦ Room Reservations</span>
                    <span className="text-gray-500">Live inventory tracking for local & international travelers.</span>
                  </div>
                  <div>
                    <span className="text-[#22c55e] font-bold uppercase tracking-wider block mb-1">🍴 Gastronomic Lounge</span>
                    <span className="text-gray-500">Enjoy 5 traditional Veg items and mastercrafted Non-Veg recipes.</span>
                  </div>
                </div>

                {/* Trust Seal */}
                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-gray-500 border-t border-[#22c55e]/15 font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-[#22c55e]/80"><ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" /> Secure SSL Booking</span>
                  <span>Click anywhere to visit</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Screen Flash Overlay when Clicking Link */}
      <AnimatePresence>
        {clickedLink && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 border-2 border-[#22c55e] border-t-transparent rounded-none animate-spin mx-auto mb-6"></div>
              <h1 className="text-3xl font-black text-[#22c55e] tracking-widest uppercase">PRINCE MOTEL</h1>
              <p className="text-xs text-[#22c55e]/80 uppercase tracking-widest mt-2 font-mono">Connecting Securely to Sovereign Servers...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant minimalist bottom footer */}
      <div className="w-full text-center py-6 text-xs text-gray-600 border-t border-zinc-900 font-mono">
        © 2026 Prince Motel Global Corp. Designed for Exquisite Destinational Comfort.
      </div>
    </div>
  );
}
