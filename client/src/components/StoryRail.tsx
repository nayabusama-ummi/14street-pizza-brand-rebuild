import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ChevronDown, 
  X,
  Compass,
  Check
} from "lucide-react";
import { sound } from "../utils/audio";

export interface Chapter {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  eyebrow: string;
  accent: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "mill",
    number: "01",
    shortTitle: "WHEAT MILL",
    fullTitle: "Stone-Ground Durum & Mountain Spring",
    eyebrow: "Artisan Heritage · 0-Hour Foundation",
    accent: "#F59E0B"
  },
  {
    id: "vault",
    number: "02",
    shortTitle: "COLD VAULT",
    fullTitle: "The 48-Hour Fermentation Vault",
    eyebrow: "Cellar Science · 48-Hour Proof",
    accent: "#E4DCCE"
  },
  {
    id: "spices",
    number: "03",
    shortTitle: "SPICE BAZAAR",
    fullTitle: "Spice Bazaar & Charcoal Grill",
    eyebrow: "Pakistani Street Heat · Fresh Daily",
    accent: "#E11D48"
  },
  {
    id: "oven",
    number: "04",
    shortTitle: "STONE DECK",
    fullTitle: "The 550°F Stone Deck Hearth Oven",
    eyebrow: "Volcanic Hearth · 550°F Stone Deck",
    accent: "#F59E0B"
  },
  {
    id: "dispatch",
    number: "05",
    shortTitle: "DISPATCH",
    fullTitle: "Thermal Heat-Lock Express Dispatch",
    eyebrow: "Express Hot Dispatch · 35 Mins",
    accent: "#60A5FA"
  },
  {
    id: "feast",
    number: "06",
    shortTitle: "MONSTER FEAST",
    fullTitle: "The Giant 20\" Monster Pizza Feast",
    eyebrow: "The Grand Finale · Feeds 6",
    accent: "#E11D48"
  }
];

interface StoryRailProps {
  activeChapter: number;
  onSelectChapter: (index: number) => void;
  scrollProgress: number; // 0 to 1
}

export const StoryRail: React.FC<StoryRailProps> = ({
  activeChapter,
  onSelectChapter,
  scrollProgress
}) => {
  const navigate = useNavigate();
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [isHearthAudio, setIsHearthAudio] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for compact mode
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    sound.playClick();
    const isPlaying = sound.toggleHearthAmbience();
    setIsHearthAudio(isPlaying);
  };

  const handleChapterClick = (index: number) => {
    sound.playClick();
    onSelectChapter(index);
    setIsMobileSheetOpen(false);
  };

  const current = CHAPTERS[activeChapter] || CHAPTERS[0];

  return (
    <>
      {/* =========================================================================
          THE STORY RAIL — FLOATING CINEMATIC NAVIGATION SHELL
         ========================================================================= */}
      <header 
        className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-48px)] max-w-[1360px] z-50 transition-all duration-500 ease-out select-none ${
          isScrolled 
            ? "top-3 sm:top-4 py-2 sm:py-2.5 bg-[#0b0d12]/92 backdrop-blur-2xl border-[#F5A623]/30 shadow-[0_16px_50px_rgba(0,0,0,0.85)]" 
            : "top-4 sm:top-6 py-2.5 sm:py-3.5 bg-[#0e1017]/85 backdrop-blur-xl border-[#F5A623]/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
        } rounded-2xl md:rounded-[28px] border`}
        style={{
          boxShadow: `0 0 30px rgba(211, 47, 47, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
        }}
      >
        <div className="px-3.5 sm:px-6 md:px-8 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* ================= 1. LEFT: CINEMATIC BRAND LOCKUP ================= */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Exit Film Back Button */}
            <Link
              to="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#cdc0ad] hover:text-white border border-white/10 transition-all btn-press shrink-0"
              title="Return to Main Street"
              aria-label="Exit film"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            {/* Custom 14th Street Title-Card Lockup */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group/brand"
              aria-label="14th Street Pizza - Flour to Fire"
            >
              {/* Pizza Disc Emblem with Crust Ring and Pepperoni Accents */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#F5A623] bg-[#FFF8E7] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover/brand:rotate-45 shadow-[0_0_12px_rgba(245,166,35,0.4)] shrink-0">
                <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-1.5 left-1.5" />
                <div className="w-2 h-2 bg-[#D32F2F] rounded-full absolute bottom-1.5 right-1.5" />
                <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-3.5 left-3.5" />
              </div>

              {/* Title & Sub-Series Label */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-lg sm:text-xl md:text-2xl text-white uppercase tracking-wider leading-none">
                    14TH STREET
                  </span>
                  <span className="font-headline text-lg sm:text-xl md:text-2xl text-[#D32F2F] uppercase tracking-wider leading-none">
                    PIZZA
                  </span>
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#F5A623] font-bold mt-0.5 opacity-90">
                  CRAFTED IN SIX ACTS
                </span>
              </div>
            </Link>
          </div>

          {/* ================= 2. CENTER: THE CINEMATIC CHAPTER RAIL (Desktop / Tablet) ================= */}
          <div className="hidden md:flex flex-col items-center flex-1 max-w-2xl px-2">
            
            {/* Top Micro-Identity Label */}
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[#8f8a85] font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-[#F5A623]" />
              <span>FROM FLOUR TO FIRE · THE PIZZA STORY</span>
            </div>

            {/* Chapter Track & Interactive Nodes */}
            <div className="relative w-full flex items-center justify-between py-1">
              
              {/* Background Connection Track */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 rounded-full z-0" />
              
              {/* Animated Glowing Progress Track */}
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#D32F2F] via-[#F5A623] to-[#ffb955] rounded-full z-0 transition-all duration-300 shadow-[0_0_10px_rgba(245,166,35,0.8)]"
                style={{
                  width: `calc(${(activeChapter / (CHAPTERS.length - 1)) * 100}% * 0.92)`
                }}
              />

              {/* 6 Chapter Nodes */}
              {CHAPTERS.map((chapter, index) => {
                const isActive = index === activeChapter;
                const isCompleted = index < activeChapter;

                return (
                  <div key={chapter.id} className="relative z-10">
                    <button
                      onClick={() => handleChapterClick(index)}
                      onMouseEnter={() => setHoveredChapter(index)}
                      onMouseLeave={() => setHoveredChapter(null)}
                      className={`relative flex items-center gap-2 py-1 px-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                        isActive
                          ? "bg-[#D32F2F] text-white border border-[#ffb955]/70 shadow-[0_0_22px_rgba(211,47,47,0.7)] scale-105"
                          : isCompleted
                          ? "bg-[#181a24] text-[#F5A623] border border-[#F5A623]/30 hover:border-[#F5A623] hover:text-white"
                          : "bg-[#12141c] text-[#71717a] border border-white/5 hover:border-white/20 hover:text-[#cdc0ad]"
                      }`}
                      aria-label={`Chapter ${chapter.number}: ${chapter.shortTitle}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {/* Active Ember Dot / Flame */}
                      {isActive ? (
                        <Flame className="w-3.5 h-3.5 text-[#ffb955] animate-pulse" />
                      ) : isCompleted ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      )}

                      {/* Number */}
                      <span className="font-mono text-xs font-bold tracking-wider">
                        {chapter.number}
                      </span>

                      {/* Expanded Title for Active Chapter ONLY */}
                      {isActive && (
                        <span className="font-headline text-xs tracking-wider uppercase whitespace-nowrap text-white pr-1">
                          {chapter.shortTitle}
                        </span>
                      )}
                    </button>

                    {/* Floating Hover Tooltip for Inactive Nodes */}
                    {!isActive && hoveredChapter === index && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-9 px-2.5 py-1 rounded-lg bg-[#141722] border border-[#F5A623]/40 text-[11px] font-mono text-[#FFF8E7] shadow-2xl whitespace-nowrap pointer-events-none z-30 flex items-center gap-1.5">
                        <span className="text-[#F5A623] font-bold">{chapter.number}.</span>
                        <span>{chapter.shortTitle}</span>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

          </div>

          {/* ================= 3. MOBILE: COMPACT CHAPTER SELECTOR BUTTON ================= */}
          <button
            onClick={() => setIsMobileSheetOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181a24] border border-[#F5A623]/40 text-xs font-mono text-white shadow-lg btn-press"
            aria-label="Open chapter navigation"
          >
            <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
            <span className="font-bold text-[#F5A623]">{current.number}/06</span>
            <span className="font-headline text-xs tracking-wider uppercase truncate max-w-[90px]">
              {current.shortTitle}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#F5A623]" />
          </button>

          {/* ================= 4. RIGHT: ACTIONS CLUSTER ================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* 550°F Hearth Fire Audio Ambience Button */}
            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-full border transition-all btn-press relative group ${
                isHearthAudio
                  ? "bg-[#F5A623]/20 border-[#F5A623] text-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-[#cdc0ad] hover:text-white border-white/10"
              }`}
              title={isHearthAudio ? "Mute 550°F Hearth Audio" : "Play 550°F Hearth Fire Audio"}
              aria-label={isHearthAudio ? "Mute Hearth Ambience" : "Play Hearth Ambience"}
            >
              {isHearthAudio ? (
                <Volume2 className="w-4 h-4 text-[#F5A623] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Primary Cinematic Action: ORDER THE MONSTER */}
            <Link
              to="/pizza/build-your-own-pizza"
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D32F2F] to-[#b71c1c] hover:from-[#e53935] hover:to-[#c62828] text-white font-headline text-sm sm:text-base uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shadow-[0_0_20px_rgba(211,47,47,0.5)] border border-[#ffb955]/40 transition-all btn-press shrink-0"
              aria-label="Order 20 inch Monster Pizza"
            >
              <Flame className="w-4 h-4 text-[#ffb955]" />
              <span>Order The Monster</span>
            </Link>

          </div>

        </div>
      </header>

      {/* =========================================================================
          MOBILE BOTTOM SHEET: 6-ACT FILM CHAPTER SELECTOR
         ========================================================================= */}
      {isMobileSheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fade-in">
          
          {/* Backdrop Click to Dismiss */}
          <div className="flex-1" onClick={() => setIsMobileSheetOpen(false)} />

          {/* Drawer Panel */}
          <div className="bg-[#0e1017] border-t border-[#F5A623]/30 rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] text-[#F5A623] font-bold uppercase tracking-widest">
                  CINEMATIC CHAPTERS
                </div>
                <div className="font-headline text-xl text-white uppercase tracking-wider">
                  FLOUR TO FIRE STORY
                </div>
              </div>
              <button
                onClick={() => setIsMobileSheetOpen(false)}
                className="p-2 rounded-full bg-white/5 text-[#cdc0ad] hover:text-white"
                aria-label="Close chapter menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of 6 Chapters */}
            <div className="space-y-2.5">
              {CHAPTERS.map((chap, idx) => {
                const isActive = idx === activeChapter;
                return (
                  <button
                    key={chap.id}
                    onClick={() => handleChapterClick(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#D32F2F]/20 border-[#D32F2F] text-white shadow-[0_0_15px_rgba(211,47,47,0.3)]"
                        : "bg-[#141722] border-white/5 text-[#cdc0ad] hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
                        isActive ? "bg-[#D32F2F] text-white" : "bg-white/5 text-[#F5A623]"
                      }`}>
                        {chap.number}
                      </span>
                      <div>
                        <div className="font-headline text-base uppercase text-white tracking-wider">
                          {chap.shortTitle}
                        </div>
                        <div className="font-sans text-xs text-[#8f8a85] truncate max-w-[220px]">
                          {chap.fullTitle}
                        </div>
                      </div>
                    </div>
                    {isActive && <Check className="w-5 h-5 text-[#F5A623]" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <Link
              to="/pizza/build-your-own-pizza"
              className="w-full py-3.5 rounded-full bg-[#D32F2F] text-white font-headline text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Flame className="w-5 h-5 text-[#ffb955]" />
              <span>Order The 20" Monster</span>
            </Link>

          </div>
        </div>
      )}

      {/* =========================================================================
          PASSIVE RIGHT-SIDE SCENE DOTS (MINIMAL, NO CLUTTER)
         ========================================================================= */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3 py-4 px-2 rounded-full bg-[#0e1017]/70 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto">
        {CHAPTERS.map((chap, idx) => {
          const isActive = idx === activeChapter;
          return (
            <button
              key={chap.id}
              onClick={() => handleChapterClick(idx)}
              className="p-1 rounded-full group relative focus:outline-none"
              title={`Jump to Act ${chap.number}: ${chap.shortTitle}`}
              aria-label={`Jump to Act ${chap.number}`}
            >
              <div 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? "w-3 h-3 bg-[#D32F2F] ring-4 ring-[#D32F2F]/30 shadow-[0_0_10px_rgba(211,47,47,0.8)] scale-125" 
                    : "w-1.5 h-1.5 bg-white/30 group-hover:bg-[#F5A623] group-hover:scale-125"
                }`} 
              />
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          CINEMATIC BOTTOM SCROLL PROMPT
         ========================================================================= */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-30 pointer-events-none transition-opacity duration-500 flex flex-col items-center gap-2 ${
          scrollProgress > 0.85 ? "opacity-0" : "opacity-90"
        }`}
      >
        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#ffb955] drop-shadow-md">
          SCROLL TO CONTINUE THE JOURNEY
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#ffb955]/40 flex justify-center pt-1.5 bg-black/30 backdrop-blur-sm">
          <span className="w-1.5 h-2 bg-[#ffb955] rounded-full animate-bounce" />
        </div>
      </div>
    </>
  );
};
