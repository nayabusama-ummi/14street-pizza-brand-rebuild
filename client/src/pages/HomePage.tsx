import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Check, 
  ShoppingBag,
  Layers,
  Clock,
  Box,
  Truck,
  Pizza
} from "lucide-react";
import { formatPKR } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { sound } from "../utils/audio";

export const HomePage: React.FC = () => {
  const { addToCart, openCartDrawer } = useCart();
  const navigate = useNavigate();

  // Signature Pizzas for "The Big Ones" section
  const bigOnes = [
    {
      id: "manhattan-beef-pepperoni",
      name: "The Original Pepperoni",
      tagline: "Double layers of premium beef pepperoni on mozzarella.",
      description: "Double layers of premium beef pepperoni, house-blend mozzarella, and our signature san marzano tomato base.",
      price: 2299,
      size: "20\" Monster",
      image: "/assets/pizzas/pepperoni_pizza_4k.jpg",
      badge: "Best Seller",
      heat: 1
    },
    {
      id: "brooklyn-bbq-smokehouse",
      name: "Smokey BBQ Chicken",
      tagline: "Slow-smoked chicken breast with hickory BBQ glaze.",
      description: "Grilled chicken breast, red onions, smoked gouda, fresh cilantro, and a tangy hickory BBQ spiral.",
      price: 2299,
      size: "20\" Monster",
      image: "/assets/pizzas/tikka_pizza_4k.jpg",
      badge: "Smoky Flavor",
      heat: 1
    },
    {
      id: "broadway-fajita-supreme",
      name: "Fajita Fiesta Supreme",
      tagline: "Spicy marinated chicken with tri-color peppers and jalapeños.",
      description: "Spicy marinated chicken, tri-color bell peppers, jalapeños, black olives, and our signature spicy sauce.",
      price: 2299,
      size: "20\" Monster",
      image: "/assets/pizzas/fajita_pizza_4k.jpg",
      badge: "Spicy Hit",
      heat: 3
    }
  ];

  // 6-Stage Flour to Fire Storytelling
  const storyStages = [
    {
      step: "01",
      title: "The Wheat Mill & Mountain Spring",
      subtitle: "Pure Hydration & Stone-Ground Flour",
      desc: "Every 14th Street pizza begins with high-protein durum wheat milled to silky perfection. Hydrated with pure mineral water, the dough develops remarkable elasticity, allowing our pizzaiolos to hand-toss each 20-inch base to paper-thin perfection.",
      still: "/assets/cinematic/still_01.png",
      video: "/assets/cinematic/dive_01.mp4",
      tags: ["Stone-Ground", "High-Hydration", "Durum Wheat"]
    },
    {
      step: "02",
      title: "The 48-Hour Cold Fermentation Vault",
      subtitle: "Subterranean Flavor Development",
      desc: "Great crust cannot be rushed. Our dough balls rest in temperature-controlled cold vaults for 48 full hours. This slow enzymatic fermentation produces deep sourdough aromatics, crisp airy honeycomb crumb, and effortless digestibility.",
      still: "/assets/cinematic/still_02.png",
      video: "/assets/cinematic/dive_02.mp4",
      tags: ["48h Cold Ferment", "Honeycomb Crumb", "Air Pockets"]
    },
    {
      step: "03",
      title: "The Spice Bazaar & Live Charcoal Smoke",
      subtitle: "Authentic Pakistani Culinary Heritage",
      desc: "Where New York technique meets Pakistani soul. We marinate fresh chicken and beef in small-batch roasted cumin, smoked paprika, and crushed coriander before searing them over live charcoal embers for that unmistakable smoky char.",
      still: "/assets/cinematic/still_03.png",
      video: "/assets/cinematic/dive_03.mp4",
      tags: ["Charcoal Smoked", "Desi Spice Rub", "Vine Marinara"]
    },
    {
      step: "04",
      title: "The 550°F Volcanic Stone Hearth",
      subtitle: "Molten Whole-Milk Mozzarella & Blistering",
      desc: "Baked directly on volcanic stone deck slabs inside our 550°F ovens. Intense thermal conduction produces the iconic leopard-spotted char underneath while Wisconsin whole-milk mozzarella bubbles into an epic, gooey golden stretch.",
      still: "/assets/cinematic/still_04.png",
      video: "/assets/cinematic/dive_04.mp4",
      tags: ["550°F Stone Deck", "Leopard Char", "Whole-Milk Mozz"]
    },
    {
      step: "05",
      title: "The Express Heat-Lock Dispatch",
      subtitle: "35-Minute Motorcycle Delivery Run",
      desc: "Straight from the oven into custom-engineered, corrugated kraft boxes with steam vents. Loaded into thermal insulated carriers, our dispatch riders navigate city traffic to deliver your pizza piping hot in under 35 minutes.",
      still: "/assets/cinematic/still_05.png",
      video: "/assets/cinematic/dive_05.mp4",
      tags: ["Heat-Lock Kraft", "35-Min Run", "Piping Hot"]
    },
    {
      step: "06",
      title: "The 20\" Giant Monster Feast",
      subtitle: "314 Square Inches of Pure Celebration",
      desc: "The legendary centerpiece. Sliced into massive foldable New York style triangles that require two hands to conquer. One Monster feeds the entire squad with unapologetic flavor.",
      still: "/assets/cinematic/still_06.png",
      video: "/assets/cinematic/dive_06.mp4",
      tags: ["20\" Monster", "Squad Feast", "Foldable Slices"]
    }
  ];

  // Deals & Squad Drops
  const deals = [
    {
      id: "deal-squad-monster-feast",
      drop: "DROP 01",
      name: "The 20\" Monster Squad Feast",
      tagline: "The ultimate gathering centerpiece for 5-6 hungry people.",
      includes: ["1x 20\" Monster Pizza (Any Flavor)", "1x Four-Cheese Garlic Bread", "1x 6pc Peri-Peri Wings", "1x 1.5L Chilled Soft Drink"],
      price: 4199,
      originalPrice: 5199,
      image: "/assets/pizzas/hero_pizza_4k.jpg"
    },
    {
      id: "deal-duo-large-party",
      drop: "DROP 02",
      name: "The Double Large Showdown",
      tagline: "Two 15-inch Large Pizzas for the ultimate flavor showdown.",
      includes: ["2x 15\" Large Pizzas (Your Choice)", "2x Molten Lava Cakes", "1x 1.5L Chilled Soft Drink"],
      price: 4699,
      originalPrice: 5599,
      image: "/assets/pizzas/forge_pizza_4k.jpg"
    }
  ];

  // Side Quests
  const sideQuests = [
    {
      id: "side-cheesy-garlic-bread",
      name: "Four-Cheese Garlic Bread",
      desc: "Toasted baguette smothered in roasted garlic butter & molten cheese.",
      price: 499,
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "side-peri-peri-wings",
      name: "Fiery Peri-Peri Wings",
      desc: "Flame-roasted crispy wings tossed in house peri-peri glaze.",
      price: 649,
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "side-churros-bites",
      name: "Cinnamon Sugar Churros",
      desc: "Golden crispy fried churro bites served with warm chocolate fudge dip.",
      price: 449,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "side-fudge-lava-cake",
      name: "Molten Dark Fudge Cake",
      desc: "Warm decadent Belgian chocolate cake with a molten liquid center.",
      price: 549,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const handleQuickAddSide = (side: typeof sideQuests[0]) => {
    sound.playAddToCart();
    addToCart({
      product: {
        id: side.id,
        name: side.name,
        tagline: side.desc,
        description: side.desc,
        category: "sides",
        image: side.image,
        available: true,
        featured: false,
        basePrice: side.price
      },
      selectedToppings: [],
      quantity: 1,
      estimatedUnitPrice: side.price
    }, { openDrawer: true });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden">
      
      {/* ================= 1. CINEMATIC HERO SECTION ================= */}
      <header className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden border-b border-[#201f1f]">
        
        {/* Background Gradient & Pizza Photography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/90 md:via-[#131313]/70 to-transparent z-10 pointer-events-none md:w-3/5" />
        <div className="absolute inset-0 z-0 flex justify-end">
          <img 
            className="w-full md:w-4/5 h-full object-cover object-center md:object-right opacity-90 brightness-95"
            src="/assets/pizzas/hero_pizza_4k.jpg"
            alt="Massive 20-inch pizza with bubbling cheese, stretching cheese pull and wood-fired oven"
          />
        </div>

        {/* Hero Content Canvas */}
        <div className="content-canvas relative z-20">
          <div className="max-w-2xl space-y-6">
            
            {/* Eyebrow Label */}
            <span className="font-sans text-xs tracking-[0.25em] text-[#ffb955] uppercase font-bold">
              Not Your Average Slice
            </span>

            {/* Display Headline */}
            <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88]">
              Big Slices.<br />
              <span className="text-gradient">Bigger Cravings.</span>
            </h1>

            {/* Editorial Body */}
            <p className="font-sans text-base sm:text-lg text-[#cdc0ad] max-w-xl leading-relaxed">
              Experience the legendary 20-inch masterpiece. 48-hour fermented crusts, live charcoal-smoked Pakistani spices, and a 550°F wood-fired soul that brings authentic New York street style right to your table.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/pizza/build-your-own-pizza"
                className="bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-xl sm:text-2xl uppercase tracking-wider px-8 py-3.5 rounded-full heat-button-glow flex items-center gap-2.5 transition-all btn-press shadow-lg"
              >
                <span>Order The Monster</span>
                <Flame className="w-5 h-5 text-[#ffb955]" />
              </Link>
              <Link
                to="/menu"
                className="border border-white/20 hover:border-white/50 text-white font-headline text-xl sm:text-2xl uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white/5 transition-all btn-press flex items-center gap-2"
              >
                <span>View Menu</span>
                <ArrowRight className="w-5 h-5 text-[#ffb955]" />
              </Link>
            </div>

          </div>
        </div>

      </header>

      {/* ================= 2. THE BIG ONES (20" SIGNATURES) ================= */}
      <section className="py-20 bg-[#0e0e0e] border-b border-[#201f1f]" id="big-ones">
        <div className="content-canvas">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
                Masterpieces On Stone
              </span>
              <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
                The Big Ones
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#cdc0ad] mt-1">
                Our signature 20-inch creations, crafted with 314 square inches of flavor to share.
              </p>
            </div>
            <Link
              to="/menu"
              className="text-[#ffb955] hover:text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>See All Pizzas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3-Column Editorial Warm Cream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bigOnes.map((pizza) => (
              <div 
                key={pizza.id}
                className="bg-[#FDFBF7] text-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:-translate-y-1.5 transition-transform duration-300 border border-white/5"
              >
                {/* Pizza Image Container */}
                <div className="h-64 sm:h-72 overflow-hidden relative bg-[#1c1b1b]">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-[#131313]/90 backdrop-blur text-white font-sans text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {pizza.badge}
                  </div>
                  {/* Size pill */}
                  <div className="absolute bottom-4 left-4 bg-[#D32F2F] text-white font-headline text-sm px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    20" MONSTER
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-headline text-2xl sm:text-3xl text-[#0A0A0A] uppercase leading-tight">
                        {pizza.name}
                      </h3>
                      <span className="font-headline text-2xl text-[#f5a623] shrink-0 ml-2 font-bold">
                        {formatPKR(pizza.price)}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                      {pizza.description}
                    </p>
                  </div>

                  {/* Add to Order CTA */}
                  <Link
                    to={`/pizza/${pizza.id}`}
                    className="w-full bg-[#0A0A0A] hover:bg-[#D32F2F] text-white font-headline text-lg uppercase tracking-wider py-3 rounded-xl transition-colors duration-200 text-center btn-press block mt-auto"
                  >
                    Customize & Order
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 3. FLOUR TO FIRE (CINEMATIC 6-SCENE STORYTELLING) ================= */}
      <section className="py-24 bg-[#131313] border-b border-[#201f1f]" id="flour-to-fire">
        <div className="content-canvas">
          
          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="font-sans text-xs tracking-[0.3em] text-[#ffb955] uppercase font-bold">
              The Craftsmanship Odyssey
            </span>
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
              Flour To Fire
            </h2>
            <p className="font-sans text-base text-[#cdc0ad] leading-relaxed">
              Step inside the craft. From stone-milled grains to 550°F stone deck baking, discover the 6-stage journey behind every 14th Street slice.
            </p>
          </div>

          {/* 6 Sequential Storytelling Beats (Alternating Left / Right) */}
          <div className="space-y-28">
            {storyStages.map((stage, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div 
                  key={stage.step}
                  className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
                >
                  {/* Large Diorama Media Element */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-[#1c1b1b] border border-white/10 relative">
                      <img 
                        src={stage.still} 
                        alt={stage.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      />
                      {/* Step Indicator Badge */}
                      <div className="absolute top-4 left-4 bg-[#131313]/90 backdrop-blur border border-white/15 text-[#ffb955] font-headline text-xl px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        STAGE {stage.step}
                      </div>
                    </div>
                  </div>

                  {/* Editorial Story Text */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <div className="space-y-1">
                      <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
                        {stage.subtitle}
                      </span>
                      <h3 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="font-sans text-base text-[#cdc0ad] leading-relaxed">
                      {stage.desc}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {stage.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[#1c1b1b] border border-[#2a2a2a] text-xs font-sans text-[#e5e2e1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Interactive Lets-Scroll Prompt Button */}
          <div className="mt-20 text-center">
            <Link
              to="/odyssey"
              className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-2xl uppercase tracking-wider px-10 py-4 rounded-full heat-button-glow transition-all btn-press shadow-2xl"
            >
              <Sparkles className="w-6 h-6 text-[#ffb955]" />
              <span>Launch 3D Scroll Cinematic Experience</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 4. THE PIZZA DROP (CAMPAIGN DEALS) ================= */}
      <section className="py-20 bg-[#0e0e0e] border-b border-[#201f1f]" id="deals">
        <div className="content-canvas">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
                Limited Drops & Feasts
              </span>
              <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
                The Pizza Drop
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#cdc0ad] mt-1">
                Complete meal bundles curated for duos, families, and midnight feasts.
              </p>
            </div>
            <Link
              to="/menu?category=deals"
              className="text-[#ffb955] hover:text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric Campaign Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {deals.map((deal) => (
              <div 
                key={deal.id}
                className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group hover:border-[#ffb955]/40 transition-colors"
              >
                {/* Media Left */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-[#131313]">
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#D32F2F] text-white font-headline text-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    {deal.drop}
                  </div>
                </div>

                {/* Info Right */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-headline text-2xl sm:text-3xl text-white uppercase leading-tight">
                      {deal.name}
                    </h3>
                    <p className="font-sans text-xs text-[#cdc0ad] mt-1 mb-4">
                      {deal.tagline}
                    </p>

                    {/* Includes List */}
                    <div className="space-y-1.5 text-xs text-[#e5e2e1]">
                      {deal.includes.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#ffb955] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#8f8a85] line-through font-mono">
                        {formatPKR(deal.originalPrice)}
                      </div>
                      <div className="font-headline text-3xl text-[#ffb955] font-bold">
                        {formatPKR(deal.price)}
                      </div>
                    </div>

                    <Link
                      to="/menu?category=deals"
                      className="bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-base uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors btn-press"
                    >
                      Grab Drop
                    </Link>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 5. 20-INCH MONSTER (FULL-WIDTH INTERRUPT) ================= */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-b border-[#201f1f]">
        
        {/* Section Header */}
        <div className="content-canvas text-center mb-12 space-y-2">
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none">
            THIS ONE DOESN'T FIT THE SCREEN.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#ffb955] font-bold uppercase tracking-widest">
            20" Monster · 314 Square Inches of Authentic New York Craftsmanship
          </p>
        </div>

        {/* Oversized Pizza Image Breaking Bounds */}
        <div className="w-[140%] sm:w-[120%] -ml-[20%] sm:-ml-[10%] relative h-[380px] sm:h-[520px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
          <img 
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABgDUd1VYkgR93Zc98g837qVkBYzN-N87fTteduDE-5oyYVx9Cux0jBgbnciQEOEirPurezfc3KTl-X0mmi3IqaaZ1129epDabDVqAF81e-3GrTOx5q6eFQw9VW9CjxE0kmtY9uoTUy8sWZP5Wp5GVqK2KSikhM2WZti__yqMwKseHpCUIVfdw0ZOv6gshVBF0duCW8l2RQYSf7dlvsVBEu8DPykXLgT8O5wf2pRqp72Vunpz51vJ28g"
            alt="Giant 20 inch monster pizza spanning beyond the frame"
          />

          {/* 0" to 20" Ruler UI Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#131313]/90 backdrop-blur border-t border-[#2a2a2a] z-20 flex items-center justify-center font-mono text-xs text-[#cdc0ad] tracking-[0.2em]">
            <div className="w-full max-w-5xl flex justify-between px-6 border-b-2 border-dashed border-[#ffb955]/40 pb-2 relative">
              <span className="font-bold text-white">0 INCHES</span>
              <div className="absolute left-1/2 -translate-x-1/2 -top-3.5 bg-[#D32F2F] text-white px-4 py-0.5 rounded-full font-headline text-sm tracking-wider uppercase shadow-glow-red">
                20 INCHES OF GLORY
              </div>
              <span className="font-bold text-white">20 INCHES</span>
            </div>
          </div>
        </div>

        {/* Action button below ruler */}
        <div className="content-canvas text-center mt-12">
          <Link
            to="/pizza/build-your-own-pizza"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-2xl uppercase tracking-wider px-10 py-4 rounded-full heat-button-glow transition-all btn-press shadow-2xl"
          >
            <span>Forge A 20" Monster</span>
            <Flame className="w-5 h-5 text-[#ffb955]" />
          </Link>
        </div>

      </section>

      {/* ================= 6. SIDE QUESTS (CIRCULAR FOOD OBJECTS) ================= */}
      <section className="py-20 bg-[#131313]" id="side-quests">
        <div className="content-canvas">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
              Appetizers, Wings & Desserts
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase">
              Side Quests
            </h2>
            <p className="font-sans text-sm text-[#cdc0ad]">
              Level up your pizza run with our handcrafted sides and sweets.
            </p>
          </div>

          {/* Floating Circular Plates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sideQuests.map((side) => (
              <div 
                key={side.id}
                className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-3xl p-5 flex flex-col items-center text-center group hover:border-[#ffb955]/50 transition-all shadow-xl"
              >
                {/* Circular Plate */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#2a2a2a] group-hover:border-[#ffb955] transition-colors shadow-2xl mb-4 bg-[#0e0e0e] shrink-0">
                  <img 
                    src={side.image} 
                    alt={side.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-headline text-xl text-white uppercase mb-1">
                  {side.name}
                </h3>
                <p className="font-sans text-xs text-[#cdc0ad] mb-4 min-h-[32px]">
                  {side.desc}
                </p>

                <div className="w-full mt-auto pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                  <span className="font-headline text-xl text-[#ffb955] font-bold">
                    {formatPKR(side.price)}
                  </span>
                  <button
                    onClick={() => handleQuickAddSide(side)}
                    className="flex items-center gap-1 bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors btn-press"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
