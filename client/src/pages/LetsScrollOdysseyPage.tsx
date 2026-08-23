import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pizza } from "lucide-react";
import { mountLetsScroll } from "../utils/scrubEngine";

export const LetsScrollOdysseyPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = mountLetsScroll(containerRef.current, {
      brand: { name: "14th Street PIZZA", href: "/" },
      cta: { label: "Order 20\" Monster", href: "/pizza/build-your-own-pizza" },
      hint: "Scroll to fly through the diorama world",
      diveScroll: 1.4,
      connScroll: 0.95,
      atmosphere: true,
      nav: true,
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

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-charcoal-950">
      
      {/* Floating Exit / Back Button */}
      <div className="fixed top-5 right-5 sm:right-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-900/80 backdrop-blur-md hover:bg-charcoal-800 text-cream-200 hover:text-white border border-charcoal-750 text-xs font-bold shadow-xl transition-all btn-press"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit 3D World</span>
        </Link>
      </div>

      {/* Main Lets-Scroll Engine Container */}
      <div id="world" ref={containerRef} />

    </div>
  );
};

