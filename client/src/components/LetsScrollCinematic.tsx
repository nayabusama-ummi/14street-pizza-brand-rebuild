import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Compass,
  Film,
  Sliders,
  Pizza,
  Thermometer,
  Clock,
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { sound } from "../utils/audio";

interface SceneConfig {
  id: string;
  label: string;
  stageNumber: string;
  eyebrow: string;
  title: string;
  body: string;
  still: string;
  clip: string;
  accent: string;
  tags: string[];
  temperature: string;
  duration: string;
  flavorCraft: string;
}

const SECTIONS: SceneConfig[] = [
  {
    id: "mill",
    label: "The Mill",
    stageNumber: "01",
    eyebrow: "Artisan Heritage · 0-Hour",
    title: "Stone-Ground Durum & Mountain Spring",
    body: "High-protein wheat is stone-milled into velvety golden flour, then hydrated with pure mineral spring water and heirloom sourdough culture to form the living foundation of our dough.",
    still: "/assets/cinematic/still_01.png",
    clip: "/assets/cinematic/dive_01.mp4",
    accent: "#F59E0B",
    tags: ["100% Durum Wheat", "Mineral Hydration", "Heirloom Sourdough", "Stone Milled"],
    temperature: "18°C Ambient Hydration",
    duration: "Foundation Stage",
    flavorCraft: "Develops deep nutty undertones and elastic gluten matrix."
  },
  {
    id: "vault",
    label: "Cold Vault",
    stageNumber: "02",
    eyebrow: "Cellar Science · 48-Hour Cold Proof",
    title: "The 48-Hour Fermentation Vault",
    body: "Hand-kneaded dough balls rest undisturbed in subterranean cold fermentation chambers. Slow fermentation breaks down starches for effortless digestion and creates airy honeycomb crust blisters.",
    still: "/assets/cinematic/still_02.png",
    clip: "/assets/cinematic/dive_02.mp4",
    accent: "#E4DCCE",
    tags: ["48-Hour Cold Proof", "Honeycomb Air Pockets", "Zero Post-Meal Bloat", "Leopard Blisters"],
    temperature: "4°C Controlled Cellar",
    duration: "48-Hour Cold Rest",
    flavorCraft: "Creates complex sourdough aroma and crispy, tender rim."
  },
  {
    id: "spices",
    label: "Spice Bazaar",
    stageNumber: "03",
    eyebrow: "Pakistani Street Heat · Fresh Daily",
    title: "The Spice Bazaar & Live Charcoal Grill",
    body: "Desi culinary heritage meets Manhattan soul: tender chicken is hand-marinated in 14 whole Pakistani spices and seared over glowing babool charcoal embers for an authentic smokiness.",
    still: "/assets/cinematic/still_03.png",
    clip: "/assets/cinematic/dive_03.mp4",
    accent: "#E11D48",
    tags: ["Live Charcoal Smoked", "14 Secret Whole Spices", "Vine-Ripened Marinara", "Daily Fresh"],
    temperature: "350°C Charcoal Embers",
    duration: "Fresh Morning Sear",
    flavorCraft: "Infuses bold smoky warmth that defines our Tikka Blaster."
  },
  {
    id: "oven",
    label: "Stone Oven",
    stageNumber: "04",
    eyebrow: "Volcanic Hearth · 550°F Stone Deck",
    title: "The 550°F Stone Deck Hearth Oven",
    body: "Pizzas glide directly onto raw volcanic stone deck hearths. In 6-8 blistering minutes, whole-milk mozzarella caramelizes into golden molten bubbles while the crust achieves crisp rigidity.",
    still: "/assets/cinematic/still_04.png",
    clip: "/assets/cinematic/dive_04.mp4",
    accent: "#F59E0B",
    tags: ["550°F Volcanic Stone", "Whole-Milk Mozzarella", "Crispy Bottom Deck", "6-8 Min Flash Bake"],
    temperature: "550°F / 288°C Deck",
    duration: "6-8 Min Stone Bake",
    flavorCraft: "Produces golden brown caramelization with irresistible cheese pulls."
  },
  {
    id: "dispatch",
    label: "Heat-Lock",
    stageNumber: "05",
    eyebrow: "Express Hot Dispatch · 35 Mins",
    title: "Thermal Heat-Lock Express Dispatch",
    body: "Straight from stone to custom 20-inch thermal carrier bags equipped with heat-retaining insulation. Our fleet navigates city streets rapidly so your pizza arrives steaming hot with zero sogginess.",
    still: "/assets/cinematic/still_05.png",
    clip: "/assets/cinematic/dive_05.mp4",
    accent: "#60A5FA",
    tags: ["20\" Thermal Carriers", "35-Min City Dispatch", "Steam Vent Protection", "Hot & Crisp"],
    temperature: "85°C Thermal Lock",
    duration: "35-Min Express Citywide",
    flavorCraft: "Preserves molten cheese texture and piping oven-fresh heat."
  },
  {
    id: "feast",
    label: "Monster Feast",
    stageNumber: "06",
    eyebrow: "Grand Finale · 20\" Colossal Feeds 6",
    title: "The Giant 20\" Monster Pizza Feast",
    body: "Unbox the legend: 12 massive foldable slices spanning 314 square inches. Crafted for match nights, family celebrations, and uninhibited pizza love across Pakistan.",
    still: "/assets/cinematic/still_06.png",
    clip: "/assets/cinematic/dive_06.mp4",
    accent: "#E11D48",
    tags: ["20-Inch Giant Diameter", "12 Foldable Slices", "Feeds 5-6 People", "Colossal Cheese Pull"],
    temperature: "Serve Sizzling Fresh",
    duration: "The Ultimate Celebration",
    flavorCraft: "Unforgettable shared feast with unmatched monster slice satisfaction."
  }
];

export const LetsScrollCinematic: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHearthAudio, setIsHearthAudio] = useState(false);
  const [mode, setMode] = useState<"scrub" | "cinema">("scrub");
  const [scrubProgress, setScrubProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const current = SECTIONS[activeTab];

  // Auto-advance in cinema mode
  useEffect(() => {
    if (mode !== "cinema" || !isPlaying) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const next = (prev + 1) % SECTIONS.length;
        setScrubProgress((next / (SECTIONS.length - 1)) * 100);
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [mode, isPlaying]);

  // Scrub slider remapping to active scene & video frame
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrubProgress(val);
    const sceneIndex = Math.min(
      Math.floor((val / 100) * SECTIONS.length),
      SECTIONS.length - 1
    );
    setActiveTab(sceneIndex);

    // Seek the video within the active scene
    const currentVideo = videoRefs.current[sceneIndex];
    if (currentVideo && currentVideo.duration) {
      const sectionLocalProgress = ((val / 100) * SECTIONS.length) - sceneIndex;
      currentVideo.currentTime = sectionLocalProgress * currentVideo.duration;
    }
  };

  const toggleAmbianceAudio = () => {
    const playing = sound.toggleHearthAmbience();
    setIsHearthAudio(playing);
  };

  return (
    <section id="odyssey" className="relative py-28 bg-charcoal-950 border-y border-charcoal-800 overflow-hidden">
      
      {/* Background Ambience Radial Glows */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] rounded-full bg-pizza-red/15 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-pizza-amber/15 blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-charcoal-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-850 border border-charcoal-750 text-pizza-amber text-xs font-mono font-bold tracking-wider uppercase shadow-md">
              <Sparkles className="w-4 h-4 text-pizza-amber" />
              <span>Lets-Scroll 3D Cinematic Engine · 6-Stage Sourdough Flight</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              The 14th Street <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pizza-red via-pizza-red-light to-pizza-amber">
                Crust & Heat Odyssey
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-cream-300 max-w-2xl leading-relaxed">
              Explore the craftsmanship behind Pakistan's pioneer 20-inch monster pizza — from 48-hour cold sourdough fermentation to the 550°F stone deck hearth and express dispatch.
            </p>
          </div>

          {/* Mode Switcher & Media Audio Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            
            {/* Full-Screen 3D Flight Launcher Link */}
            <Link
              to="/odyssey"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-pizza-amber hover:bg-pizza-amber-dark text-charcoal-950 font-black text-xs shadow-glow-amber transition-all btn-press"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Launch Full-Page 3D Flight</span>
            </Link>

            {/* Scrub vs Cinema Toggle */}
            <div className="flex items-center bg-charcoal-900 p-1.5 rounded-2xl border border-charcoal-750 shadow-inner">
              <button
                onClick={() => setMode("scrub")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-press ${
                  mode === "scrub"
                    ? "bg-pizza-red text-white shadow-glow-red"
                    : "text-cream-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Scrub</span>
              </button>
              
              <button
                onClick={() => setMode("cinema")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-press ${
                  mode === "cinema"
                    ? "bg-pizza-red text-white shadow-glow-red"
                    : "text-cream-400 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Auto Cinema</span>
              </button>
            </div>

            {/* Hearth Oven Ambient Audio Toggle */}
            <button
              onClick={toggleAmbianceAudio}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all text-xs font-bold btn-press ${
                isHearthAudio
                  ? "bg-pizza-amber/20 border-pizza-amber text-pizza-amber shadow-glow-amber"
                  : "bg-charcoal-850 hover:bg-charcoal-800 text-cream-300 border-charcoal-750"
              }`}
              title={isHearthAudio ? "Mute Hearth Ambience" : "Play 550°F Hearth Fire Sound"}
            >
              {isHearthAudio ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-0.5 bg-pizza-amber animate-wave-1" />
                    <span className="w-0.5 bg-pizza-amber animate-wave-2" />
                    <span className="w-0.5 bg-pizza-amber animate-wave-3" />
                    <span className="w-0.5 bg-pizza-amber animate-wave-4" />
                  </div>
                  <span>550°F Audio ON</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-pizza-amber" />
                  <span>550°F Sound</span>
                </>
              )}
            </button>

            {/* Play/Pause in Cinema Mode */}
            {mode === "cinema" && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 text-cream-300 hover:text-white border border-charcoal-750 transition-colors shadow-md btn-press"
                title={isPlaying ? "Pause tour" : "Play tour"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-pizza-amber" />}
              </button>
            )}
          </div>
        </div>

        {/* 6-Scene Miniature Visual Stage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SECTIONS.map((sec, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveTab(idx);
                  setScrubProgress((idx / (SECTIONS.length - 1)) * 100);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-2 group btn-press overflow-hidden relative ${
                  isSelected
                    ? "bg-charcoal-850 border-pizza-red shadow-glow-red scale-[1.02]"
                    : "bg-charcoal-900/80 border-charcoal-800 hover:border-charcoal-700 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Micro Thumbnail Background */}
                <div className="w-full h-12 rounded-xl overflow-hidden bg-charcoal-950 relative">
                  <img
                    src={sec.still}
                    alt={sec.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-transparent" />
                  <span className={`absolute top-1 left-1.5 text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-pizza-red text-white" : "bg-charcoal-950/80 text-cream-400"
                  }`}>
                    0{sec.stageNumber}
                  </span>
                </div>
                
                <div className="space-y-0.5">
                  <div className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-cream-300 group-hover:text-white"}`}>
                    {sec.label}
                  </div>
                  <div className="text-[10px] text-cream-500 font-mono truncate">
                    {sec.eyebrow.split("·")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 3D Diorama Stage Theatre */}
        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-charcoal-750 shadow-2xl overflow-hidden bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Narrative & Technical Specifications */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-pizza-amber px-3 py-1 rounded-xl bg-charcoal-950 border border-charcoal-750">
                    STAGE {current.stageNumber} OF 06
                  </span>
                  <span className="text-xs font-bold text-cream-400 font-mono truncate">
                    {current.eyebrow}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-cream-300 leading-relaxed font-normal">
                {current.body}
              </p>

              {/* Flavor Craft Insight */}
              <div className="p-3.5 rounded-2xl bg-charcoal-950/70 border border-charcoal-800 text-xs text-cream-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-pizza-amber flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Culinary Impact: </strong>
                  <span>{current.flavorCraft}</span>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {current.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="px-3 py-1 rounded-lg bg-charcoal-950/90 text-cream-300 border border-charcoal-800 text-[11px] font-mono font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Operating Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-charcoal-950/80 border border-charcoal-800 rounded-2xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cream-500 block flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-pizza-red" />
                    <span>Operating Thermal</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">
                    {current.temperature}
                  </span>
                </div>

                <div className="bg-charcoal-950/80 border border-charcoal-800 rounded-2xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cream-500 block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-pizza-amber" />
                    <span>Craft Timeline</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-pizza-amber font-mono">
                    {current.duration}
                  </span>
                </div>
              </div>

              {/* Call to Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/pizza/build-your-own-pizza"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-pizza-red hover:bg-pizza-red-dark text-white text-xs font-bold shadow-glow-red transition-all btn-press"
                >
                  <Pizza className="w-4 h-4" />
                  <span>Build Your 20" Monster</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/odyssey"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-pizza-amber/15 hover:bg-pizza-amber/25 text-pizza-amber text-xs font-bold border border-pizza-amber/40 transition-all btn-press"
                >
                  <Film className="w-4 h-4" />
                  <span>Full-Screen 3D Flight</span>
                </Link>
              </div>

            </div>

            {/* Right Column: AI Video Screen with Timeline Scrubber */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-charcoal-950 border-2 border-charcoal-700 shadow-2xl group">
                
                {/* Active AI Video Player */}
                <video
                  ref={(el) => (videoRefs.current[activeTab] = el)}
                  key={current.clip}
                  src={current.clip}
                  poster={current.still}
                  autoPlay
                  loop={mode === "scrub"}
                  muted
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  className="w-full h-full object-cover object-center"
                />

                {/* Top Corner Live Pill */}
                <div className="absolute top-4 left-4 bg-charcoal-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-charcoal-750 text-[11px] font-mono text-cream-200 flex items-center gap-2 z-20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Scene 0{current.stageNumber} · 1080p Clay Diorama Odyssey</span>
                </div>

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-950/80 to-transparent pointer-events-none" />

              </div>

              {/* Interactive Timeline Scrubber Slider */}
              <div className="glass-panel rounded-2xl p-4 border border-charcoal-750 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-cream-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-pizza-amber" />
                    <span>Scroll Timeline Scrubber</span>
                  </span>
                  <span className="font-mono font-bold text-pizza-amber">
                    Stage {activeTab + 1} of 6 ({Math.round(scrubProgress)}%)
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.2"
                  value={scrubProgress}
                  onChange={handleScrubChange}
                  className="w-full scrubber-range"
                />

                <div className="flex justify-between text-[10px] font-mono text-cream-500 pt-0.5">
                  <span>1. Wheat Mill</span>
                  <span>2. Cold Vault</span>
                  <span>3. Spice Grill</span>
                  <span>4. Stone Oven</span>
                  <span>5. Dispatch</span>
                  <span>6. Monster Feast</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
