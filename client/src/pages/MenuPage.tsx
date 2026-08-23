import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Flame, 
  Pizza as PizzaIcon, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Plus
} from "lucide-react";
import { api } from "../services/api";
import { MenuItem } from "../types";
import { formatPKR } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { sound } from "../utils/audio";

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryParam = searchParams.get("category") || "all";

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHeatLevel, setSelectedHeatLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, totalItemsCount, estimatedSubtotal, openCartDrawer } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    api.getMenu()
      .then((data) => {
        setItems(data.items);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load Flavor Deck menu. Please check backend.");
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (cat: string) => {
    sound.playClick();
    setSelectedCategory(cat);
    if (cat === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const getStartingPrice = (item: MenuItem): number => {
    if (item.sizes && item.sizes.length > 0) {
      return item.sizes[0].price;
    }
    return item.basePrice || 0;
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = 
      selectedCategory === "all" || 
      item.category === selectedCategory ||
      (selectedCategory === "hot-spicy" && (item.spicyLevel ?? 0) >= 2) ||
      (selectedCategory === "drinks-desserts" && (item.category === "drinks" || item.category === "desserts"));
    
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHeat = 
      selectedHeatLevel === null || (item.spicyLevel ?? 0) === selectedHeatLevel;

    return matchesCategory && matchesSearch && matchesHeat;
  });

  const getFlavorDNA = (item: MenuItem) => {
    const isSpicy = item.spicyLevel ?? 0;
    let heatLabel = "Mild";
    let heatPercent = "20%";
    if (isSpicy === 1) { heatLabel = "Warm"; heatPercent = "45%"; }
    else if (isSpicy === 2) { heatLabel = "Kick"; heatPercent = "75%"; }
    else if (isSpicy >= 3) { heatLabel = "Fiery"; heatPercent = "100%"; }

    const isCheese = item.id.includes("cheese") || item.id.includes("pepperoni") ? "Epic Stretch" : "High Stretch";
    const cheesePercent = item.id.includes("cheese") ? "95%" : "80%";
    const loadedPercent = item.sizes ? "85%" : "60%";

    return { heatLabel, heatPercent, isCheese, cheesePercent, loadedPercent };
  };

  const handleQuickAdd = (item: MenuItem) => {
    sound.playAddToCart();
    if (item.sizes && item.sizes.length > 0) {
      // Redirect to Forge customizer for pizzas
      navigate(`/pizza/${item.id}`);
    } else {
      // Direct add for fixed price items
      addToCart({
        product: item,
        selectedToppings: [],
        quantity: 1,
        estimatedUnitPrice: item.basePrice || 0
      }, { openDrawer: true });
    }
  };

  // 6 Wheel Segments for Flavor Wheel
  const wheelSegments = [
    { id: "all", label: "All Items", icon: "restaurant", color: "hover:text-[#ffb3ac]" },
    { id: "pizzas", label: "Signatures", icon: "local_pizza", color: "hover:text-[#ffb3ac]" },
    { id: "build", label: "Pizza Forge", icon: "biotech", color: "hover:text-[#ffb955]" },
    { id: "hot-spicy", label: "Hot & Spicy", icon: "local_fire_department", color: "hover:text-[#ffb4ab]" },
    { id: "deals", label: "Deals Drop", icon: "stars", color: "hover:text-[#ffb955]" },
    { id: "sides", label: "Side Quests", icon: "dinner_dining", color: "hover:text-[#b7ccb9]" }
  ];

  // Mechanical Heat Dial Options
  const heatDialPositions = [
    { level: null, label: "All Heat", color: "bg-surface-variant" },
    { level: 0, label: "Mild", color: "bg-emerald-400" },
    { level: 1, label: "Warm", color: "bg-[#f5a623]" },
    { level: 2, label: "Kick", color: "bg-[#D32F2F]" },
    { level: 3, label: "Fiery", color: "bg-[#93000a]" }
  ];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#d32f2f] selection:text-white pb-32">
      
      {/* ================= 1. HEADER / HERO ================= */}
      <header className="relative w-full h-[50vh] min-h-[380px] flex flex-col justify-center items-center text-center px-4 sm:px-8 overflow-hidden border-b border-[#201f1f]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/50 to-[#131313] z-10 pointer-events-none" />
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
          src="https://lh3.googleusercontent.com/aida/AEtjO1U_qr6y08SmhDx9RqPA_41JSgRCXSqVAoS3lfWxtv1o5QOMZlYbxwAOYP3XovarA8nfkOGANHTQJpkvSCppuILp9jN50Xdka1ni7A5Nq9_gtbWiF8AiW6UCzfWQSzXPabyxYEePnofRCC_N09hvuUsg0vQUd35dQeBQpHYCxtdnjYMCfbYUBD3PAEd5QRt3JoFWKgucWIgWG0u2yYoyB-wE4zjEBeWWl_aXJucmwiXliN100Dm3WzhXF3jg"
          alt="Glowing futuristic pizza flavor deck background"
        />
        
        <div className="relative z-20 flex flex-col items-center gap-4 mt-8 max-w-3xl">
          <span className="font-sans text-xs tracking-[0.3em] text-[#ffb955] uppercase font-bold">
            The 14th Street Pizza Catalog
          </span>
          <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl text-white uppercase leading-none tracking-tight">
            The Flavor Deck
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#cdc0ad] max-w-xl">
            Classic comfort, loaded monsters, or fiery Pakistani flavors. Spin the wheel and choose your craving.
          </p>
        </div>
      </header>

      {/* ================= 2. THE FLAVOR WHEEL (DOMINANT CIRCULAR CATEGORY EXPERIENCE) ================= */}
      <section className="py-16 px-4 sm:px-8 flex flex-col items-center justify-center relative crust-texture border-b border-[#201f1f]">
        
        {/* Animated Dashed Outer Orbit */}
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
          <div className="w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full border-2 border-dashed border-[#ffb955] animate-[spin_60s_linear_infinite]" />
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl text-white uppercase mb-10 tracking-widest text-center">
          Choose Your Craving
        </h2>

        {/* The Pizza Wheel Segmented Interface */}
        <div className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full border-4 border-[#2a2a2a] shadow-[0_16px_50px_rgba(0,0,0,0.8)] flex items-center justify-center bg-[#1c1b1b] overflow-hidden">
          
          {/* Wheel Segments Grid */}
          <div className="grid grid-cols-2 grid-rows-3 w-full h-full absolute inset-0 gap-1 p-2">
            {wheelSegments.map((seg, idx) => {
              const isSelected = selectedCategory === seg.id;
              
              if (seg.id === "build") {
                return (
                  <Link
                    key={seg.id}
                    to="/pizza/build-your-own-pizza"
                    className="bg-[#2a2a2a] hover:bg-[#D32F2F]/20 flex flex-col items-center justify-center text-white transition-all pizza-wheel-hover group"
                  >
                    <span className="font-headline text-lg sm:text-2xl uppercase group-hover:text-[#ffb955] tracking-wider">
                      {seg.label}
                    </span>
                    <span className="font-sans text-[10px] text-[#ffb955] uppercase font-bold tracking-widest mt-0.5">
                      Launch Customizer
                    </span>
                  </Link>
                );
              }

              return (
                <button
                  key={seg.id}
                  onClick={() => handleCategoryChange(seg.id)}
                  className={`${
                    isSelected ? "bg-[#D32F2F] text-white shadow-inner" : "bg-[#242323] hover:bg-[#2e2d2d] text-[#e5e2e1]"
                  } flex flex-col items-center justify-center transition-all pizza-wheel-hover group p-2 text-center`}
                >
                  <span className={`font-headline text-lg sm:text-2xl uppercase tracking-wider ${
                    isSelected ? "text-white font-bold" : "group-hover:text-[#ffb955]"
                  }`}>
                    {seg.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center Pizza Hub Motif */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-[#131313] rounded-full z-10 border-4 border-[#2a2a2a] shadow-2xl flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-8 h-8 rounded-full border-2 border-[#dc9100] bg-[#FFF8E7] flex items-center justify-center overflow-hidden">
              <div className="w-1 h-1 bg-[#D32F2F] rounded-full absolute top-1 left-1" />
              <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute bottom-1 right-1.5" />
              <div className="w-1 h-1 bg-[#D32F2F] rounded-full absolute top-3 left-3" />
            </div>
            <span className="font-headline text-xs uppercase text-[#ffb955] mt-1 tracking-widest font-bold">
              14th ST
            </span>
          </div>

        </div>

      </section>

      {/* ================= 3. MECHANICAL OVEN HEAT DIAL FILTER ================= */}
      <section className="py-12 bg-[#1a0a0a] border-b border-[#3a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: "radial-gradient(circle at center, #93000a 0%, transparent 70%)" }} />
        
        <div className="content-canvas max-w-4xl mx-auto flex flex-col items-center text-center gap-4 relative z-10">
          <span className="font-sans text-xs tracking-[0.25em] text-[#ffb4ab] uppercase font-bold">
            Precision Spice Control
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white">
            Turn Up The Heat
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#cdc0ad] max-w-lg">
            Filter our stone-deck creations by heat calibration. We use authentic local Pakistani green chilies and roasted chili flakes.
          </p>

          {/* Mechanical Heat Dial Buttons */}
          <div className="mt-6 w-full flex justify-between items-center max-w-2xl px-4 relative">
            <div className="absolute left-6 right-6 top-1/2 h-1 bg-[#2a2a2a] -z-10 rounded-full" />
            {heatDialPositions.map((pos) => {
              const isSelected = selectedHeatLevel === pos.level;
              return (
                <button
                  key={pos.label}
                  onClick={() => {
                    sound.playClick();
                    setSelectedHeatLevel(pos.level);
                  }}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected 
                      ? "border-[#ffb955] bg-[#D32F2F] shadow-[0_0_20px_rgba(211,47,47,0.8)] scale-110" 
                      : "border-[#3a1a1a] bg-[#1c1b1b] group-hover:border-[#ffb955]/60"
                  }`}>
                    <Flame className={`w-4 h-4 ${isSelected ? "text-[#ffb955]" : "text-[#525866]"}`} />
                  </div>
                  <span className={`font-sans text-xs uppercase font-bold tracking-wider ${
                    isSelected ? "text-[#ffb955]" : "text-[#cdc0ad] group-hover:text-white"
                  }`}>
                    {pos.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4. PIZZA RUNWAY (SPATIAL EDITORIAL PRESENTATION) ================= */}
      <section className="py-20">
        <div className="content-canvas">
          
          {/* Category Title & Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-[#201f1f] pb-6">
            <div>
              <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
                Showing {filteredItems.length} Handcrafted Creations
              </span>
              <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl uppercase text-white mt-1">
                {selectedCategory === "all" ? "The Full Runway" : selectedCategory.toUpperCase()}
              </h2>
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search flavors, toppings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-full px-4 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-[#ffb955] font-sans"
              />
              <Search className="w-4 h-4 text-[#8f8a85] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Runway List (Alternating Spatial Compositions) */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-[#D32F2F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-headline text-xl uppercase tracking-widest text-[#ffb955]">Loading the Runway...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-headline text-3xl uppercase text-white">No pizzas matched your heat or category filter.</p>
              <button 
                onClick={() => { setSelectedCategory("all"); setSelectedHeatLevel(null); setSearchQuery(""); }}
                className="bg-[#D32F2F] text-white font-headline text-lg uppercase px-6 py-2.5 rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-24">
              {filteredItems.map((item, index) => {
                const isEven = index % 2 === 1;
                const dna = getFlavorDNA(item);

                return (
                  <div 
                    key={item.id}
                    className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16 group`}
                  >
                    {/* Media Left/Right */}
                    <div className="w-full lg:w-1/2 relative">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-[#1c1b1b] border border-white/10 relative group-hover:border-[#ffb955]/40 transition-colors">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.badge && (
                          <div className="absolute top-4 left-4 bg-[#131313]/90 backdrop-blur border border-white/15 text-white font-sans text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {item.badge}
                          </div>
                        )}
                        {item.spicyLevel && item.spicyLevel > 0 && (
                          <div className="absolute bottom-4 left-4 bg-[#D32F2F] text-white font-sans text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <Flame className="w-3 h-3" />
                            <span>{item.spicyLevel === 1 ? "Warm" : item.spicyLevel === 2 ? "Kick" : "Fiery"}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Left/Right */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <div>
                        <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
                          {item.tagline || "Authentic Stone-Fired Masterpiece"}
                        </span>
                        <h3 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight mt-1">
                          {item.name}
                        </h3>
                        <p className="font-sans text-sm sm:text-base text-[#cdc0ad] mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Flavor DNA Gauges */}
                      <div className="p-4 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] space-y-3 max-w-md">
                        <div className="font-sans text-[11px] font-bold text-[#ffb955] uppercase tracking-widest">
                          Flavor DNA Meters
                        </div>

                        {/* Cheese Gauge */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-sans text-xs text-[#e5e2e1]">
                            <span>Cheese Pull</span>
                            <span className="text-white font-bold">{dna.isCheese}</span>
                          </div>
                          <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FDFBF7]" style={{ width: dna.cheesePercent }} />
                          </div>
                        </div>

                        {/* Heat Gauge */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-sans text-xs text-[#e5e2e1]">
                            <span>Heat Intensity</span>
                            <span className="text-[#ffb4ab] font-bold">{dna.heatLabel}</span>
                          </div>
                          <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D32F2F]" style={{ width: dna.heatPercent }} />
                          </div>
                        </div>
                      </div>

                      {/* Pricing & CTA Controls */}
                      <div className="flex items-center gap-6 pt-2">
                        <div>
                          <div className="font-sans text-[11px] text-[#8f8a85] uppercase tracking-wider">
                            Starting Price
                          </div>
                          <div className="font-headline text-3xl sm:text-4xl text-[#ffb955] font-bold">
                            {formatPKR(getStartingPrice(item))}
                          </div>
                        </div>

                        {item.sizes && item.sizes.length > 0 ? (
                          <Link
                            to={`/pizza/${item.id}`}
                            className="bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-lg sm:text-xl uppercase tracking-wider px-8 py-3 rounded-full heat-button-glow transition-all btn-press shadow-lg flex items-center gap-2"
                          >
                            <span>Customize in Forge</span>
                            <Sparkles className="w-4 h-4 text-[#ffb955]" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleQuickAdd(item)}
                            className="bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-lg sm:text-xl uppercase tracking-wider px-8 py-3 rounded-full heat-button-glow transition-all btn-press shadow-lg flex items-center gap-2"
                          >
                            <Plus className="w-5 h-5" />
                            <span>Add to Order</span>
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ================= 5. STICKY ORDER DOCK ================= */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[420px] bg-[#1c1b1b]/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] border border-[#ffb955]/30 z-50 p-4 flex items-center justify-between animate-fade-in">
          <div className="flex flex-col">
            <span className="font-sans text-xs text-[#cdc0ad] uppercase font-bold tracking-wider">
              {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} in Stack
            </span>
            <span className="font-headline text-2xl text-white">
              {formatPKR(estimatedSubtotal)}
            </span>
          </div>

          <button
            onClick={openCartDrawer}
            className="bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-lg uppercase tracking-wider px-6 py-2.5 rounded-xl heat-button-glow transition-all btn-press flex items-center gap-2"
          >
            <span>View Stack</span>
            <Flame className="w-4 h-4 text-[#ffb955]" />
          </button>
        </div>
      )}

    </div>
  );
};
