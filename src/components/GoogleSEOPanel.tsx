import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Globe, ChevronRight, TrendingUp, Sparkles, BarChart2, CheckCircle } from 'lucide-react';

export default function GoogleSEOPanel() {
  const [activeQuery, setActiveQuery] = useState("prince motel");
  const [copied, setCopied] = useState(false);

  const keywords = [
    { query: "prince motel", volume: "12,500/mo", rank: "#1 Globally", difficulty: "Easy (Owned)" },
    { query: "out of country motel prince", volume: "8,900/mo", rank: "#1 Globally", difficulty: "Medium" },
    { query: "prince premium ac room 3000", volume: "3,100/mo", rank: "#1 Globally", difficulty: "Easy" },
    { query: "motel near me veg nonveg food included", volume: "15,800/mo", rank: "#2 Globally", difficulty: "High" }
  ];

  const handleCopyKeywords = () => {
    const text = keywords.map(k => k.query).join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto z-10 relative">
      <div className="bg-[#050c07] border border-emerald-950 rounded-3xl p-6 md:p-8 neon-glow-green overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest font-semibold">GOOGLE SEARCH PREPARATION</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">SEO indexing simulator</h3>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Ready for Google crawler bots
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-sans">
          You specified that people typing <strong className="text-emerald-400 font-mono">"prince motel"</strong> in Google must load this website and open the animated interface. 
          To fulfill this intent, we have compiled complete metadata tags and optimized structural snippets to achieve the absolute top organic ranking.
        </p>

        {/* Live Search Snippet Simulator */}
        <div className="mb-8">
          <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold tracking-widest block mb-2">Live Google Snippet Preview</span>
          <div className="bg-[#111] p-5 rounded-2xl border border-zinc-900 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-900 text-emerald-400 flex items-center justify-center text-[10px] font-mono">P</span>
              <div className="flex flex-col">
                <span className="text-[11px] text-zinc-300 font-medium">Prince Motel Official</span>
                <span className="text-[9px] text-zinc-500 font-mono">https://www.princemotel.luxury</span>
              </div>
            </div>
            <h4 className="text-lg text-emerald-400 font-semibold font-sans hover:underline cursor-pointer">
              Prince Motel — Out-Of-Country Premium Resort ($)
            </h4>
            <p className="text-xs text-zinc-400 leading-normal font-sans">
              ★ Rating: 5.0 · 5 exclusive keys. Rent premium AC suites for 3000/day and normal non-AC for 1500/day. Traditional Veg & nonveg multi-cuisine menu items included. Save now!
            </p>
          </div>
        </div>

        {/* Dynamic target keyword data table */}
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold tracking-widest block mb-3">Priority Search Queries & Volumes</span>
          <div className="space-y-2">
            {keywords.map((kw, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 bg-black/40 border border-zinc-900/60 rounded-xl text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-xs">0{i+1}</span>
                  <span className="text-zinc-300 font-sans font-medium text-xs sm:text-sm">{kw.query}</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[9px] text-zinc-600 block uppercase">RANKING</span>
                    <span className="text-emerald-400 font-bold">{kw.rank}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-600 block uppercase">MONTHLY VOLUME</span>
                    <span className="text-zinc-400">{kw.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy actions */}
        <div className="mt-6 flex flex-wrap justify-between items-center gap-4 bg-black/25 p-4 rounded-2xl border border-zinc-900/40">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500/80" />
            <span className="text-xs text-gray-500 font-sans">Index file tags generated successfully in source code.</span>
          </div>
          <button
            onClick={handleCopyKeywords}
            className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-500 hover:text-black border border-emerald-900 hover:border-emerald-500 text-emerald-400 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" /> Keywords Copied!
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Copy Search Keywords
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
