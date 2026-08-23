import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Flame, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Plus, 
  Minus, 
  Layers,
  ShoppingBag,
  ArrowRight,
  Info
} from "lucide-react";
import { api } from "../services/api";
import { MenuItem, PizzaSize, SauceOption, ToppingOption } from "../types";
import { formatPKR } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { sound } from "../utils/audio";

export const PizzaCustomizerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<string>("");
  const [selectedSauce, setSelectedSauce] = useState<SauceOption | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [currentStage, setCurrentStage] = useState<number>(5); // 1: Size, 2: Crust, 3: Sauce, 4: Cheese, 5: Toppings, 6: Finish
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const targetId = id || "build-your-own-pizza";
    
    api.getPizzaById(targetId)
      .then((data: MenuItem) => {
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          // Default to Large (15") or Monster (20")
          const defaultSize = data.sizes.find((s: PizzaSize) => s.id === "15") || data.sizes[0];
          setSelectedSize(defaultSize);
        }
        if (data.crusts && data.crusts.length > 0) {
          setSelectedCrust(data.crusts[0]);
        }
        if (data.sauces && data.sauces.length > 0) {
          setSelectedSauce(data.sauces[0]);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "Failed to load pizza forge specs.");
        setLoading(false);
      });
  }, [id]);

  const toggleTopping = (topping: ToppingOption) => {
    sound.playClick();
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const getUnitLivePrice = (): number => {
    if (!product) return 0;
    let price = selectedSize ? selectedSize.price : (product.basePrice || 0);
    if (selectedSauce) price += selectedSauce.price;
    selectedToppings.forEach((t) => { price += t.price; });
    return price;
  };

  const calculateLivePrice = (): number => {
    return getUnitLivePrice() * quantity;
  };

  const handleFireItUp = () => {
    if (!product || !selectedSize) return;

    sound.playOrderFired();

    addToCart({
      product,
      selectedSize,
      selectedCrust,
      selectedSauce: selectedSauce || undefined,
      selectedToppings,
      quantity,
      specialInstructions: specialInstructions.trim() || undefined,
      estimatedUnitPrice: getUnitLivePrice()
    }, { openDrawer: true });
  };

  // Flavor DNA Live calculations
  const heatScore = (product?.spicyLevel ?? 0) + (selectedSauce?.spicyLevel ?? 0) + (selectedToppings.filter(t => t.id.includes("jalapeno") || t.id.includes("spicy")).length);
  const heatLabel = heatScore >= 3 ? "Volcanic Blaze" : heatScore === 2 ? "Medium Smolder" : heatScore === 1 ? "Warm Ember" : "Mild Hearth";
  const heatOffset = Math.max(10, 138 - heatScore * 35);

  const cheeseScore = (selectedToppings.filter(t => t.category === "cheese").length) + (selectedCrust.includes("Cheesy") ? 2 : 1);
  const cheeseLabel = cheeseScore >= 3 ? "Epic Stretch" : cheeseScore === 2 ? "Rich Stretch" : "Golden Melt";
  const cheeseOffset = Math.max(10, 138 - cheeseScore * 35);

  const loadCount = selectedToppings.length;
  const loadLabel = loadCount >= 4 ? "Heavy Loaded" : loadCount >= 2 ? "Heavyweight" : "Classic Pure";
  const loadOffset = Math.max(10, 138 - (loadCount + 1) * 25);

  const stageLabels = [
    { num: 1, label: "01 Size" },
    { num: 2, label: "02 Crust" },
    { num: 3, label: "03 Sauce" },
    { num: 4, label: "04 Cheese" },
    { num: 5, label: "05 Toppings" },
    { num: 6, label: "06 Finish" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] pt-32 pb-24 text-center">
        <div className="w-16 h-16 border-4 border-[#D32F2F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-headline text-2xl uppercase tracking-widest text-[#ffb955]">
          Firing up the Pizza Forge Ring...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#131313] pt-32 pb-24 text-center space-y-4">
        <p className="text-rose-400 text-sm font-semibold">{error || "Product not found."}</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 rounded-xl bg-[#D32F2F] text-white font-headline text-lg uppercase">
          Back to Flavor Deck
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#d32f2f] selection:text-white pt-24 pb-28">
      
      {/* Breadcrumbs & Title Bar */}
      <div className="content-canvas mb-6">
        <Link to="/menu" className="inline-flex items-center gap-2 text-xs font-sans text-[#cdc0ad] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Flavor Deck</span>
        </Link>
      </div>

      {/* Main 3-Column Culinary Workstation Grid */}
      <main className="content-canvas grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= COLUMN 1: FLAVOR DNA & CHEF STATS (Left col 3/12) ================= */}
        <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          
          {/* Flavor DNA Glass Card */}
          <div className="bg-[#1c1b1b]/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
            <h3 className="font-headline text-2xl text-white uppercase tracking-wider mb-6">
              Flavor DNA
            </h3>

            <div className="space-y-6">
              
              {/* Stat 1: Heat Level */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#131313] relative shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" fill="none" r="20" stroke="transparent" strokeWidth="3.5" />
                    <circle 
                      cx="24" 
                      cy="24" 
                      fill="none" 
                      r="20" 
                      stroke="#F5A623" 
                      strokeDasharray="125" 
                      strokeDashoffset={heatOffset} 
                      strokeWidth="3.5"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <Flame className="w-5 h-5 text-[#ffb955]" />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#8f8a85] uppercase tracking-widest font-bold">Heat Level</div>
                  <div className="font-headline text-xl text-white mt-0.5">{heatLabel}</div>
                </div>
              </div>

              {/* Stat 2: Cheese Pull */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#131313] relative shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" fill="none" r="20" stroke="transparent" strokeWidth="3.5" />
                    <circle 
                      cx="24" 
                      cy="24" 
                      fill="none" 
                      r="20" 
                      stroke="#FDFBF7" 
                      strokeDasharray="125" 
                      strokeDashoffset={cheeseOffset} 
                      strokeWidth="3.5"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <Sparkles className="w-5 h-5 text-[#FDFBF7]" />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#8f8a85] uppercase tracking-widest font-bold">Cheese Pull</div>
                  <div className="font-headline text-xl text-white mt-0.5">{cheeseLabel}</div>
                </div>
              </div>

              {/* Stat 3: Density */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#131313] relative shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" fill="none" r="20" stroke="transparent" strokeWidth="3.5" />
                    <circle 
                      cx="24" 
                      cy="24" 
                      fill="none" 
                      r="20" 
                      stroke="#b7ccb9" 
                      strokeDasharray="125" 
                      strokeDashoffset={loadOffset} 
                      strokeWidth="3.5"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <Layers className="w-5 h-5 text-[#b7ccb9]" />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#8f8a85] uppercase tracking-widest font-bold">Density</div>
                  <div className="font-headline text-xl text-white mt-0.5">{loadLabel}</div>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-[#2a2a2a] space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#ffb955] uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#ffb955]" />
                <span>Chef's Craft Composition</span>
              </div>
              <ul className="space-y-1 text-[11px] text-[#cdc0ad]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Size: <strong className="text-white">{selectedSize?.name || "15\" Large"}</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Crust: <strong className="text-white">{selectedCrust}</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Sauce: <strong className="text-white">{selectedSauce?.name || "Signature Marinara"}</strong></span>
                </li>
                {selectedToppings.length > 0 && (
                  <li className="flex items-start gap-1.5 pt-1 border-t border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-1 shrink-0" />
                    <span>Toppings ({selectedToppings.length}): <span className="text-[#ffb955]">{selectedToppings.map(t => t.name).join(", ")}</span></span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Master Crafter Detail Card */}
          <div className="hidden xl:flex items-center gap-4 p-4 rounded-2xl bg-[#1c1b1b]/50 border border-white/5">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#ffb955]/40 shrink-0 bg-[#0e0e0e]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDarxe6KzMfpT5Y1N97f1BtfDDJgk1CYRrckJ2boD95CKDU4F6CmCqbEUls9wkHi4cRs-QtOboUhvk3RAEvOG8C0dvf7DPLjiLYka-8i4IlQouV5ppFpLCW3JVBwUQoM78WUNWO7gF-Vbo-1Kgxxeuwnjmv56tWrZ0BZWPTmXQbaiky4H5cNDiJ1flqK6cmYzG2fvmV7kQUy9_oJ9OwuTFqm75nitjfa52VIAWm0zQwPucxaz8CYVQc9g"
                alt="Clay Italian Master Chef"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-sans text-[10px] uppercase text-[#ffb955] font-bold tracking-widest">Master Crafter</div>
              <div className="font-sans text-xs text-[#cdc0ad] italic mt-0.5">"Crisp undercarriage. Perfect char."</div>
            </div>
          </div>

        </aside>

        {/* ================= COLUMN 2: CENTER HERO PIZZA & FORGE RING (Center col 5/12) ================= */}
        <section className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[540px] order-1 lg:order-2">
          
          <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
            
            {/* Central Pizza Hero Photography */}
            <div className="relative w-[78%] h-[78%] rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-20 flex items-center justify-center bg-[#0e0e0e] overflow-hidden ring-4 ring-[#2a2a2a] group">
              <img 
                src="/assets/pizzas/forge_pizza_4k.jpg"
                alt="Hero Loaded Artisanal Pizza with blistered crust and melting cheese"
                className="w-[102%] h-[102%] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
            </div>

            {/* SVG Forge Ring Surrounding the Pizza */}
            <svg className="forge-ring-svg" viewBox="0 0 100 100">
              <path className={`arc-path ${currentStage === 1 ? "arc-active" : ""}`} d="M 50 5 A 45 45 0 0 1 88.97 27.5" />
              <path className={`arc-path ${currentStage === 2 ? "arc-active" : ""}`} d="M 88.97 27.5 A 45 45 0 0 1 88.97 72.5" />
              <path className={`arc-path ${currentStage === 3 ? "arc-active" : ""}`} d="M 88.97 72.5 A 45 45 0 0 1 50 95" />
              <path className={`arc-path ${currentStage === 4 ? "arc-active" : ""}`} d="M 50 95 A 45 45 0 0 1 11.03 72.5" />
              <path className={`arc-path ${currentStage === 5 ? "arc-active" : ""}`} d="M 11.03 72.5 A 45 45 0 0 1 11.03 27.5" />
              <path className={`arc-path ${currentStage === 6 ? "arc-active" : ""}`} d="M 11.03 27.5 A 45 45 0 0 1 50 5" />
            </svg>

            {/* Interactive Forge Ring Clickable Stage Buttons */}
            <div className="absolute inset-0 pointer-events-none font-sans text-[11px] font-bold uppercase tracking-widest text-[#cdc0ad] flex items-center justify-center z-30">
              {/* 01 Size (Top) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(1); }}
                className={`pointer-events-auto absolute top-[3%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 1 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                01 Size
              </button>

              {/* 02 Crust (Top Right) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(2); }}
                className={`pointer-events-auto absolute top-[25%] right-[0%] translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 2 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                02 Crust
              </button>

              {/* 03 Sauce (Bottom Right) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(3); }}
                className={`pointer-events-auto absolute bottom-[25%] right-[0%] translate-x-1/2 translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 3 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                03 Sauce
              </button>

              {/* 04 Cheese (Bottom) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(4); }}
                className={`pointer-events-auto absolute bottom-[3%] left-[50%] -translate-x-1/2 translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 4 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                04 Cheese
              </button>

              {/* 05 Toppings (Bottom Left) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(5); }}
                className={`pointer-events-auto absolute bottom-[25%] left-[0%] -translate-x-1/2 translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 5 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red font-bold" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                05 Toppings
              </button>

              {/* 06 Finish (Top Left) */}
              <button 
                onClick={() => { sound.playClick(); setCurrentStage(6); }}
                className={`pointer-events-auto absolute top-[25%] left-[0%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full border transition-all ${
                  currentStage === 6 ? "bg-[#D32F2F] text-white border-[#ffb955] shadow-glow-red" : "bg-[#1c1b1b] border-white/10 hover:text-white"
                }`}
              >
                06 Finish
              </button>
            </div>

            {/* Orbiting Ingredient Thumbnails */}
            <div className="absolute inset-0 pointer-events-none z-20">
              
              {/* Pepperoni Orbit */}
              <div 
                onClick={() => {
                  const pep = product?.toppings?.find(t => t.id.includes("pepperoni"));
                  if (pep) toggleTopping(pep);
                }}
                className="pointer-events-auto cursor-pointer absolute w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-xl hover:scale-110 transition-transform"
                style={{ top: "12%", left: "14%" }}
                title="Toggle Pepperoni"
              >
                <img 
                  src="/assets/pizzas/topping_pepperoni.jpg"
                  alt="Pepperoni"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mushroom Orbit */}
              <div 
                onClick={() => {
                  const mush = product?.toppings?.find(t => t.id.includes("mushroom"));
                  if (mush) toggleTopping(mush);
                }}
                className="pointer-events-auto cursor-pointer absolute w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-xl hover:scale-110 transition-transform"
                style={{ top: "10%", right: "18%" }}
                title="Toggle Mushrooms"
              >
                <img 
                  src="/assets/pizzas/topping_mushroom.jpg"
                  alt="Mushrooms"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Jalapeno Orbit */}
              <div 
                onClick={() => {
                  const jal = product?.toppings?.find(t => t.id.includes("jalapeno"));
                  if (jal) toggleTopping(jal);
                }}
                className="pointer-events-auto cursor-pointer absolute w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-xl hover:scale-110 transition-transform"
                style={{ bottom: "12%", left: "18%" }}
                title="Toggle Jalapenos"
              >
                <img 
                  src="/assets/pizzas/topping_jalapeno.jpg"
                  alt="Jalapeno"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>

        </section>

        {/* ================= COLUMN 3: STAGE OPTIONS & CTA (Right col 4/12) ================= */}
        <aside className="lg:col-span-4 space-y-6 order-3">
          
          <div>
            <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
              The Forge Workstation
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-none mt-1">
              {product.name}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#cdc0ad] mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Warm Cream Stage Control Card */}
          <div className="bg-[#FDFBF7] text-[#0A0A0A] p-6 rounded-3xl shadow-2xl space-y-5 border border-white/10">
            
            {/* Stage Title */}
            <div className="flex justify-between items-center border-b border-[#0A0A0A]/10 pb-3">
              <h3 className="font-headline text-2xl uppercase tracking-wider text-[#0A0A0A]">
                Stage {currentStage}: {stageLabels[currentStage - 1].label.substring(3)}
              </h3>
              <div className="flex items-center gap-1">
                {stageLabels.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => { sound.playClick(); setCurrentStage(s.num); }}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold font-mono transition-colors ${
                      currentStage === s.num ? "bg-[#D32F2F] text-white" : "bg-[#0A0A0A]/10 text-[#0A0A0A] hover:bg-[#0A0A0A]/20"
                    }`}
                  >
                    {s.num}
                  </button>
                ))}
              </div>
            </div>

            {/* STAGE 1: SIZE */}
            {currentStage === 1 && (
              <div className="space-y-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => { sound.playClick(); setSelectedSize(size); }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedSize?.id === size.id ? "border-[#D32F2F] bg-[#D32F2F]/10 font-bold" : "border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40"
                    }`}
                  >
                    <div>
                      <div className="font-headline text-xl uppercase text-[#0A0A0A]">{size.name}</div>
                      <div className="font-sans text-xs text-[#0A0A0A]/70">{size.serves} &bull; {size.slices} Slices</div>
                    </div>
                    <span className="font-headline text-xl text-[#f5a623]">{formatPKR(size.price)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* STAGE 2: CRUST */}
            {currentStage === 2 && (
              <div className="space-y-3">
                {product.crusts?.map((crust) => (
                  <button
                    key={crust}
                    onClick={() => { sound.playClick(); setSelectedCrust(crust); }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedCrust === crust ? "border-[#D32F2F] bg-[#D32F2F]/10 font-bold" : "border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40"
                    }`}
                  >
                    <span className="font-headline text-lg uppercase text-[#0A0A0A]">{crust}</span>
                    {selectedCrust === crust && <Check className="w-5 h-5 text-[#D32F2F]" />}
                  </button>
                ))}
              </div>
            )}

            {/* STAGE 3: SAUCE */}
            {currentStage === 3 && (
              <div className="space-y-3">
                {product.sauces?.map((sauce) => (
                  <button
                    key={sauce.id}
                    onClick={() => { sound.playClick(); setSelectedSauce(sauce); }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedSauce?.id === sauce.id ? "border-[#D32F2F] bg-[#D32F2F]/10 font-bold" : "border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40"
                    }`}
                  >
                    <div>
                      <div className="font-headline text-lg uppercase text-[#0A0A0A]">{sauce.name}</div>
                      <div className="font-sans text-[11px] text-[#0A0A0A]/60">Spiciness: {sauce.spicyLevel}/3</div>
                    </div>
                    <span className="font-sans text-xs font-bold text-[#D32F2F]">
                      {sauce.price > 0 ? `+${formatPKR(sauce.price)}` : "INCLUDED"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* STAGE 4: CHEESE */}
            {currentStage === 4 && (
              <div className="space-y-3">
                {product.toppings?.filter(t => t.category === "cheese").map((cheese) => {
                  const isChecked = selectedToppings.some(t => t.id === cheese.id);
                  return (
                    <label
                      key={cheese.id}
                      onClick={() => toggleTopping(cheese)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isChecked ? "border-[#D32F2F] bg-[#D32F2F]/10 font-bold" : "border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#D32F2F] focus:ring-[#D32F2F]"
                        />
                        <span className="font-headline text-lg uppercase text-[#0A0A0A]">{cheese.name}</span>
                      </div>
                      <span className="font-sans text-xs font-bold text-[#f5a623]">+{formatPKR(cheese.price)}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* STAGE 5: TOPPINGS */}
            {currentStage === 5 && (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {product.toppings?.filter(t => t.category !== "cheese").map((topping) => {
                  const isChecked = selectedToppings.some(t => t.id === topping.id);
                  return (
                    <label
                      key={topping.id}
                      onClick={() => toggleTopping(topping)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isChecked ? "border-[#D32F2F] bg-[#D32F2F]/10 font-bold" : "border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#D32F2F] focus:ring-[#D32F2F]"
                        />
                        <span className="font-headline text-base sm:text-lg uppercase text-[#0A0A0A]">{topping.name}</span>
                      </div>
                      <span className="font-sans text-xs font-bold text-[#f5a623]">+{formatPKR(topping.price)}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* STAGE 6: FINISH */}
            {currentStage === 6 && (
              <div className="space-y-3">
                <label className="block font-sans text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                  Special Baking Instructions
                </label>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Well-done blistered crust, slice into 12 party slices..."
                  className="w-full p-3 rounded-2xl border border-[#0A0A0A]/20 bg-white text-xs text-[#0A0A0A] focus:outline-none focus:border-[#D32F2F] font-sans"
                />
              </div>
            )}

            {/* Quantity Adjuster */}
            <div className="flex items-center justify-between pt-2 border-t border-[#0A0A0A]/10">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                Quantity
              </span>
              <div className="flex items-center gap-3 bg-[#0A0A0A]/10 rounded-full px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] hover:bg-[#D32F2F] hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-headline text-lg text-[#0A0A0A] font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] hover:bg-[#D32F2F] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Primary High-Intent Forge CTA */}
          <button
            onClick={handleFireItUp}
            className="w-full bg-[#D32F2F] hover:bg-[#be123c] text-white py-4 sm:py-5 rounded-2xl font-headline text-xl sm:text-2xl uppercase tracking-wider flex items-center justify-center gap-3 heat-button-glow transition-all btn-press shadow-2xl relative overflow-hidden group"
          >
            <Flame className="w-6 h-6 text-[#ffb955] group-hover:scale-110 transition-transform" />
            <span>FIRE IT UP &bull; {formatPKR(calculateLivePrice())}</span>
          </button>

        </aside>

      </main>

    </div>
  );
};
