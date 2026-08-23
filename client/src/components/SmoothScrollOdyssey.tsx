import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  Pizza, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Volume2, 
  VolumeX,
  Compass,
  Layers
} from "lucide-react";
import { sound } from "../utils/audio";

interface SceneData {
  id: string;
  stageNumber: string;
  label: string;
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

const SCENES: SceneData[] = [
  {
    id: "mill",
    stageNumber: "01",
    label: "The Wheat Mill",
    eyebrow: "Artisan Heritage · 0-Hour",
    title: "Stone-Ground Durum & Mountain Spring",
    body: "High-protein wheat is stone-milled into velvety golden flour, then hydrated with pure mineral spring water and heirloom sourdough culture to form the living foundation of our dough.",
    still: "/assets/cinematic/still_01.png",
    clip: "/assets/cinematic/dive_01.mp4",
    accent: "#F59E0B",
    tags: ["100% Durum Wheat", "Mineral Hydration", "Heirloom Sourdough", "Stone Milled"],
    temperature: "18°C Ambient Hydration",
    duration: "Foundation Stage",
    flavorCraft: "Develops deep nutty aroma and elastic gluten structure."
  },
  {
    id: "vault",
    stageNumber: "02",
    label: "Cold Vault",
    eyebrow: "Cellar Science · 48-Hour Cold Proof",
    title: "The 48-Hour Fermentation Vault",
    body: "Hand-kneaded dough balls rest undisturbed in subterranean cold chambers. Slow 48-hour fermentation breaks down starches for effortless digestion and creates airy honeycomb crust blisters.",
    still: "/assets/cinematic/still_02.png",
    clip: "/assets/cinematic/dive_02.mp4",
    accent: "#E4DCCE",
    tags: ["48-Hour Cold Proof", "Honeycomb Air Pockets", "Zero Post-Meal Bloat", "Leopard Blisters"],
    temperature: "4°C Controlled Cellar",
    duration: "48-Hour Cold Rest",
    flavorCraft: "Creates complex sourdough aroma and crispy tender rim."
  },
  {
    id: "spices",
    stageNumber: "03",
    label: "Spice Bazaar",
    eyebrow: "Pakistani Street Heat · Fresh Daily",
    title: "The Spice Bazaar & Live Charcoal Grill",
    body: "Desi culinary heritage meets Manhattan soul: tender chicken is marinated in 14 whole Pakistani spices and seared over glowing babool charcoal embers for an authentic smoky depth.",
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
    stageNumber: "04",
    label: "Stone Oven",
    eyebrow: "Volcanic Hearth · 550°F Stone Deck",
    title: "The 550°F Stone Deck Hearth Oven",
    body: "Pizzas glide directly onto raw volcanic stone deck hearths. In 6-8 blistering minutes, whole-milk mozzarella caramelizes into golden molten bubbles while the crust achieves crisp rigidity.",
    still: "/assets/cinematic/still_04.png",
    clip: "/assets/cinematic/dive_04.mp4",
    accent: "#F59E0B",
    tags: ["550°F Volcanic Stone", "Whole-Milk Mozzarella", "Crispy Bottom Deck", "6-8 Min Flash Bake"],
    temperature: "550°F / 288°C Deck",
    duration: "6-8 Min Stone Bake",
    flavorCraft: "Produces golden brown caramelization with colossal cheese pull."
  },
  {
    id: "dispatch",
    stageNumber: "05",
    label: "Heat-Lock",
    eyebrow: "Express Hot Dispatch · 35 Mins",
    title: "Thermal Heat-Lock Express Dispatch",
    body: "Straight from stone into custom 20-inch thermal carrier bags with steam-vented insulation. Our fleet navigates city streets rapidly so your pizza arrives steaming hot with zero sogginess.",
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
    stageNumber: "06",
    label: "Monster Feast",
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

export const SmoothScrollOdyssey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isHearthAudio, setIsHearthAudio] = useState(false);

  // Target & current lerped progress for buttery 60fps motion
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Preload and initialize videos
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.load();
      }
    });
  }, []);

  // Update target progress from window scroll position
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Calculate progress between 0 and 1
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    targetProgressRef.current = progress;
  }, []);

  // Smooth rAF loop that interpolates progress and coordinates video frame seeking safely
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth lerp easing (0.15 damping for responsive, non-jittery glide)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * Math.min(1, delta * 12);

      const p = currentProgressRef.current;
      setGlobalProgress(p);

      // Determine active scene
      const numScenes = SCENES.length;
      const rawIndex = p * numScenes;
      const sceneIndex = Math.min(Math.floor(rawIndex), numScenes - 1);
      setActiveSceneIdx(sceneIndex);

      // Local progress within the active scene (0 to 1)
      const sceneLocalProgress = Math.max(0, Math.min(1, rawIndex - sceneIndex));

      // Seek active video smoothly without decoder lockup
      const activeVideo = videoRefs.current[sceneIndex];
      if (activeVideo && activeVideo.duration && !activeVideo.seeking) {
        const targetTime = sceneLocalProgress * activeVideo.duration;
        // Seek threshold to prevent unnecessary decoder interrupts
        if (Math.abs(activeVideo.currentTime - targetTime) > 0.04) {
          try {
            if ("fastSeek" in activeVideo && typeof (activeVideo as any).fastSeek === "function") {
              (activeVideo as any).fastSeek(targetTime);
            } else {
              activeVideo.currentTime = targetTime;
            }
          } catch {
            // ignore
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll]);

  // Jump to specific scene smoothly
  const jumpToScene = (index: number) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + trackRect.top;
    const totalScrollable = trackRef.current.clientHeight - window.innerHeight;
    const targetScroll = scrollTop + (index / (SCENES.length - 1)) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const toggleAmbianceAudio = () => {
    const playing = sound.toggleHearthAmbience();
    setIsHearthAudio(playing);
  };

  const activeScene = SCENES[activeSceneIdx];

  return (
    <div id="craft-odyssey" ref={trackRef} className="relative h-[480vh] bg-charcoal-950">
      
      {/* Sticky Pinned Viewport Container */}
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
      >
        
        {/* Layer 1: Background Scenes Stack (Stills + Hardware Accelerated Videos) */}
        <div className="absolute inset-0 z-0 bg-charcoal-950 overflow-hidden">
          {SCENES.map((scene, idx) => {
            // Calculate opacity for seamless crossfade
            const sceneCenter = idx / (SCENES.length - 1);
            const dist = Math.abs(globalProgress - sceneCenter);
            const fadeWidth = 1 / (SCENES.length - 1);
            const opacity = Math.max(0, Math.min(1, 1 - dist / (fadeWidth * 0.85)));
            const isVisible = opacity > 0.01;

            return (
              <div
                key={scene.id}
                style={{
                  opacity,
                  visibility: isVisible ? "visible" : "hidden",
                  zIndex: idx === activeSceneIdx ? 10 : 5
                }}
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none will-change-transform"
              >
                {/* High-Res Clay Diorama Still as Instant 60fps Backdrop */}
                <img
                  src={scene.still}
                  alt={scene.title}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                  style={{
                    filter: "brightness(0.9) contrast(1.05)"
                  }}
                />

                {/* Smooth Video Layer */}
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={scene.clip}
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-90 mix-blend-screen"
                />

                {/* Dark Vignette & Atmospheric Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/65 to-charcoal-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/70" />
              </div>
            );
          })}
        </div>

        {/* Layer 2: Top Floating HUD / Audio & Stage Controls */}
        <div className="relative z-20 pt-24 sm:pt-28 px-4 sm:px-8 lg:px-12 flex items-center justify-between pointer-events-auto">
          
          {/* Stage Progress Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-charcoal-900/85 backdrop-blur-md border border-charcoal-750 text-xs font-mono shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-pizza-red animate-pulse" />
            <span className="font-black text-pizza-amber uppercase tracking-wider">
              Stage 0{activeScene.stageNumber} of 06
            </span>
            <span className="text-cream-600">|</span>
            <span className="text-white font-bold hidden sm:inline truncate max-w-xs">
              {activeScene.label}
            </span>
          </div>

          {/* Hearth Fire Sound Toggle & Sizing Direct Jump */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAmbianceAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold shadow-lg btn-press backdrop-blur-md ${
                isHearthAudio
                  ? "bg-pizza-amber/20 border-pizza-amber text-pizza-amber shadow-glow-amber"
                  : "bg-charcoal-900/80 hover:bg-charcoal-850 text-cream-300 border-charcoal-750 hover:text-white"
              }`}
              title={isHearthAudio ? "Mute Hearth Ambience" : "Play 550°F Hearth Fire Audio"}
            >
              {isHearthAudio ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-0.5 bg-pizza-amber animate-wave-1" />
                    <span className="w-0.5 bg-pizza-amber animate-wave-2" />
                    <span className="w-0.5 bg-pizza-amber animate-wave-3" />
                  </div>
                  <span>550°F Hearth Audio ON</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-pizza-amber" />
                  <span>550°F Audio</span>
                </>
              )}
            </button>

            <a
              href="#sizing-matrix"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal-900/80 hover:bg-charcoal-850 text-cream-200 hover:text-white border border-charcoal-750 text-xs font-bold backdrop-blur-md transition-colors btn-press"
            >
              <span>Skip to Menu & Deals</span>
              <ChevronDown className="w-3.5 h-3.5 text-pizza-amber" />
            </a>
          </div>

        </div>

        {/* Layer 3: Narrative Content Overlay (Left Pinned) */}
        <div className="relative z-20 px-4 sm:px-8 lg:px-12 my-auto max-w-2xl space-y-6 pointer-events-auto">
          
          <div className="space-y-3">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-charcoal-900/90 border border-charcoal-750 text-[11px] font-mono font-bold text-pizza-amber uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pizza-amber" />
              <span>{activeScene.eyebrow}</span>
            </div>

            {/* Title */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] drop-shadow-2xl">
              {activeScene.title}
            </h2>

            {/* Body */}
            <p className="text-xs sm:text-base text-cream-200 leading-relaxed font-normal max-w-xl drop-shadow-md">
              {activeScene.body}
            </p>
          </div>

          {/* Flavor Craft Insight Box */}
          <div className="p-4 rounded-2xl bg-charcoal-950/80 backdrop-blur-md border border-charcoal-750 text-xs text-cream-300 flex items-start gap-3 shadow-xl max-w-lg">
            <CheckCircle2 className="w-4 h-4 text-pizza-amber flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Artisan Impact: </strong>
              <span>{activeScene.flavorCraft}</span>
            </div>
          </div>

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-2">
            {activeScene.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-charcoal-900/80 border border-charcoal-750 text-[11px] font-mono font-medium text-cream-300 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Operating Metrics & CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Thermal Metric */}
            <div className="px-3.5 py-2 rounded-xl bg-charcoal-900/80 border border-charcoal-750 text-xs font-mono flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-pizza-red" />
              <span className="text-white font-bold">{activeScene.temperature}</span>
            </div>

            {/* Action Button */}
            <Link
              to="/pizza/build-your-own-pizza"
              className="px-6 py-3 rounded-xl bg-pizza-red hover:bg-pizza-red-dark text-white font-bold text-xs shadow-glow-red flex items-center gap-2 transition-all btn-press"
            >
              <Pizza className="w-4 h-4" />
              <span>Order 20" Monster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>

        </div>

        {/* Layer 4: Right Floating Route Rail (Clickable Jump Dots) */}
        <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 py-4 px-2 rounded-full bg-charcoal-950/70 backdrop-blur-md border border-charcoal-800 shadow-2xl pointer-events-auto">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIdx;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className="relative group p-1.5 rounded-full transition-all focus:outline-none"
                title={`Jump to Scene 0${scene.stageNumber}: ${scene.label}`}
              >
                {/* Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-3.5 h-3.5 bg-pizza-red ring-4 ring-pizza-red/30 shadow-glow-red scale-125"
                      : "w-2 h-2 bg-charcoal-600 group-hover:bg-cream-400 group-hover:scale-110"
                  }`}
                />

                {/* Floating Tooltip Label */}
                <span className="absolute right-8 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-charcoal-900 border border-charcoal-750 text-[11px] font-mono text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl">
                  0{scene.stageNumber}. {scene.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layer 5: Bottom Global Scroll Track Progress Bar */}
        <div className="relative z-20 pb-6 px-4 sm:px-8 lg:px-12 flex items-center justify-between pointer-events-auto">
          
          {/* Scroll Down Hint */}
          <div className="flex items-center gap-2 text-xs font-mono text-cream-400 animate-bounce">
            <ChevronDown className="w-4 h-4 text-pizza-amber" />
            <span>Scroll down to navigate the 20" pizza world</span>
          </div>

          {/* Progress Percentage */}
          <div className="font-mono text-xs text-pizza-amber font-bold">
            {Math.round(globalProgress * 100)}% CRAFT ODYSSEY
          </div>

        </div>

      </div>

    </div>
  );
};

