import React, { useEffect, useRef, useState } from "react";
import { mountLetsScroll, LetsScrollInstance } from "../utils/scrubEngine";
import { StoryRail } from "../components/StoryRail";

export const LetsScrollOdysseyPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<LetsScrollInstance | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = mountLetsScroll(containerRef.current, {
      customHeader: true,
      atmosphere: true,
      diveScroll: 1.4,
      connScroll: 0.95,
      onProgress: (prog: number, activeIdx: number) => {
        setScrollProgress(prog);
        setActiveChapter(activeIdx);
      },
      sections: [
        {
          id: "mill",
          label: "01. Wheat Mill",
          still: "/assets/cinematic/still_01.png",
          clip: "/assets/cinematic/dive_01.mp4",
          accent: "#F59E0B",
          scroll: 1.6,
          linger: 0.4,
          eyebrow: "Artisan Heritage · 0-Hour Foundation",
          title: "Stone-Ground Durum & Mountain Spring",
          body: "High-protein wheat is stone-milled into velvety golden flour and hydrated with pure mineral spring water and living heirloom sourdough culture.",
          tags: ["100% Durum", "Mineral Hydration", "Heirloom Sourdough"]
        },
        {
          id: "vault",
          label: "02. Cold Vault",
          still: "/assets/cinematic/still_02.png",
          clip: "/assets/cinematic/dive_02.mp4",
          accent: "#E4DCCE",
          scroll: 1.6,
          linger: 0.45,
          eyebrow: "Cellar Science · 48-Hour Cold Proof",
          title: "The 48-Hour Fermentation Vault",
          body: "Dough rests in subterranean cold cellars. Slow fermentation breaks down starches for effortless digestion and creates airy honeycomb crust blisters.",
          tags: ["48-Hr Proof", "Honeycomb Air Pockets", "Zero Bloat"]
        },
        {
          id: "spices",
          label: "03. Spice Bazaar",
          still: "/assets/cinematic/still_03.png",
          clip: "/assets/cinematic/dive_03.mp4",
          accent: "#E11D48",
          scroll: 1.6,
          linger: 0.4,
          eyebrow: "Pakistani Street Heat · Fresh Daily",
          title: "The Spice Bazaar & Live Charcoal Grill",
          body: "Desi culinary soul meets Manhattan: tender chicken is marinated in 14 Pakistani spices and seared over glowing babool charcoal embers.",
          tags: ["Charcoal Smoked", "14 Secret Spices", "Vine Marinara"]
        },
        {
          id: "oven",
          label: "04. Stone Deck",
          still: "/assets/cinematic/still_04.png",
          clip: "/assets/cinematic/dive_04.mp4",
          accent: "#F59E0B",
          scroll: 1.6,
          linger: 0.45,
          eyebrow: "Volcanic Hearth · 550°F Stone Deck",
          title: "The 550°F Stone Deck Hearth Oven",
          body: "Pizzas glide onto raw volcanic stone deck hearths where whole-milk mozzarella bubbles golden brown under intense deck heat.",
          tags: ["550°F Volcanic Stone", "Whole-Milk Mozzarella", "Crispy Bottom Deck"]
        },
        {
          id: "dispatch",
          label: "05. Dispatch",
          still: "/assets/cinematic/still_05.png",
          clip: "/assets/cinematic/dive_05.mp4",
          accent: "#60A5FA",
          scroll: 1.6,
          linger: 0.4,
          eyebrow: "Express Hot Dispatch · 35 Mins",
          title: "Thermal Heat-Lock Express Dispatch",
          body: "Sealed hot in custom 20-inch thermal carrier bags to navigate city traffic rapidly so your pizza arrives piping hot and crisp.",
          tags: ["20\" Thermal Carrier", "35-Min Dispatch", "Steaming Hot"]
        },
        {
          id: "feast",
          label: "06. Monster Feast",
          still: "/assets/cinematic/still_06.png",
          clip: "/assets/cinematic/dive_06.mp4",
          accent: "#E11D48",
          scroll: 1.8,
          linger: 0.5,
          eyebrow: "The Grand Finale · Feeds 6",
          title: "The Giant 20\" Monster Pizza Feast",
          body: "Unbox the legend: 12 massive foldable slices spanning 314 square inches. The ultimate celebration feast for match nights and pizza lovers across Pakistan.",
          tags: ["20\" Diameter", "12 Giant Slices", "Colossal Cheese Pull"],
          cta: {
            primary: { label: "Build Your 20\" Monster", href: "/pizza/build-your-own-pizza" },
            secondary: { label: "Explore Menu Catalog", href: "/menu" }
          }
        }
      ]
    });

    engineRef.current = instance;

    return () => {
      if (instance) instance();
    };
  }, []);

  const handleSelectChapter = (index: number) => {
    setActiveChapter(index);
    if (engineRef.current && typeof engineRef.current.jumpTo === "function") {
      engineRef.current.jumpTo(index);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white overflow-x-hidden">
      
      {/* The Story Rail — Cinematic Navigation Header */}
      <StoryRail 
        activeChapter={activeChapter} 
        onSelectChapter={handleSelectChapter}
        scrollProgress={scrollProgress}
      />

      {/* Main Lets-Scroll 3D Engine Canvas */}
      <div id="world" ref={containerRef} />

    </div>
  );
};
