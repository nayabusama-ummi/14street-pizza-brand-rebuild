import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Sparkles, Flame, Check, ShoppingBag, Sliders, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PizzaSize } from "../types";
import { formatPKR } from "../utils/formatters";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState<PizzaSize | undefined>(undefined);
  const [selectedCrust, setSelectedCrust] = useState<string>("Original Pan Crust");
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.sizes && quickViewProduct.sizes.length > 0) {
        const defaultSize = quickViewProduct.sizes.find(s => s.id === "12") || quickViewProduct.sizes[0];
        setSelectedSize(defaultSize);
      }
      if (quickViewProduct.crusts && quickViewProduct.crusts.length > 0) {
        setSelectedCrust(quickViewProduct.crusts[0]);
      }
      setQuantity(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const isPizza = quickViewProduct.sizes && quickViewProduct.sizes.length > 0;
  const unitPrice = isPizza ? (selectedSize?.price || 0) : (quickViewProduct.basePrice || 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      product: quickViewProduct,
      selectedSize: isPizza ? selectedSize : undefined,
      selectedCrust: isPizza ? selectedCrust : undefined,
      selectedToppings: [],
      quantity,
      estimatedUnitPrice: unitPrice
    }, { openDrawer: true });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 400);
  };

  const handleOpenFullCustomizer = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigate(`/pizza/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-charcoal-900 border border-charcoal-750 rounded-3xl shadow-2xl overflow-hidden glass-panel z-10 space-y-0">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-charcoal-950/80 hover:bg-charcoal-800 text-cream-400 hover:text-white transition-colors border border-charcoal-750 btn-press"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Image */}
        <div className="relative aspect-[16/9] w-full bg-charcoal-950 overflow-hidden">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />

          {quickViewProduct.badge && (
            <div className="absolute top-4 left-4 bg-pizza-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow-red flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{quickViewProduct.badge}</span>
            </div>
          )}

          {quickViewProduct.spicyLevel && quickViewProduct.spicyLevel > 0 ? (
            <div className="absolute bottom-4 left-4 bg-charcoal-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-charcoal-750 text-pizza-red-light text-xs font-bold flex items-center gap-1">
              <span>Heat Level:</span>
              {Array.from({ length: quickViewProduct.spicyLevel }).map((_, i) => (
                <Flame key={i} className="w-3.5 h-3.5 fill-pizza-red text-pizza-red" />
              ))}
            </div>
          ) : null}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-1.5">
            <h3 className="font-display font-black text-2xl text-white">
              {quickViewProduct.name}
            </h3>
            {quickViewProduct.tagline && (
              <p className="text-xs font-semibold text-pizza-amber font-mono">
                "{quickViewProduct.tagline}"
              </p>
            )}
            <p className="text-xs text-cream-300 leading-relaxed">
              {quickViewProduct.description}
            </p>
          </div>

          {/* Detailed What's Included / Ingredients Breakdown */}
          {(quickViewProduct.includesList || quickViewProduct.ingredients) && (
            <div className="p-3.5 rounded-2xl bg-charcoal-950/80 border border-charcoal-800 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-pizza-amber uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pizza-amber" />
                <span>
                  {quickViewProduct.category === "deals" 
                    ? "Feast Includes" 
                    : quickViewProduct.category === "drinks" 
                    ? "Beverage Specs" 
                    : quickViewProduct.category === "desserts" 
                    ? "Dessert Specs" 
                    : quickViewProduct.category === "sides" 
                    ? "Side Specs & Dipping" 
                    : "Chef's Craft Composition"}
                </span>
              </div>

              {quickViewProduct.includesList && (
                <ul className="space-y-1 text-xs text-cream-300">
                  {quickViewProduct.includesList.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pizza-red shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              )}

              {quickViewProduct.ingredients && (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-charcoal-800">
                  {quickViewProduct.ingredients.map((ing, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-charcoal-900 text-[10px] font-mono text-cream-400 border border-charcoal-800">
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Size Selector for Pizzas */}
          {isPizza && quickViewProduct.sizes && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white font-mono uppercase tracking-wider">Select Size</span>
                <span className="text-pizza-amber font-mono">{selectedSize?.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickViewProduct.sizes.map((sz) => {
                  const isSelected = selectedSize?.id === sz.id;
                  return (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? "bg-charcoal-850 border-pizza-red text-white shadow-glow-red scale-[1.02]"
                          : "bg-charcoal-950/60 border-charcoal-800 text-cream-400 hover:border-charcoal-700 hover:text-white"
                      }`}
                    >
                      <span className="font-display font-bold text-xs">{sz.name.split(" ")[0]}</span>
                      <span className="font-mono text-[10px] text-pizza-amber font-bold">{formatPKR(sz.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selector for Pizzas */}
          {isPizza && quickViewProduct.crusts && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider block">
                Select Crust Style
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickViewProduct.crusts.map((cr) => (
                  <button
                    key={cr}
                    onClick={() => setSelectedCrust(cr)}
                    className={`p-2 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                      selectedCrust === cr
                        ? "bg-charcoal-850 border-pizza-red text-white"
                        : "bg-charcoal-950/60 border-charcoal-800 text-cream-400 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{cr}</span>
                    {selectedCrust === cr && <Check className="w-3.5 h-3.5 text-pizza-red flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Row: Quantity + Add Button + Studio Link */}
          <div className="pt-2 border-t border-charcoal-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cream-400">Total Price:</span>
              <span className="font-display font-black text-2xl text-pizza-amber">
                {formatPKR(totalPrice)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <button
                onClick={handleAddToCart}
                className="sm:col-span-8 py-3.5 rounded-2xl bg-pizza-red hover:bg-pizza-red-dark text-white font-bold text-xs shadow-glow-red transition-all flex items-center justify-center gap-2 btn-press"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Stack · {formatPKR(totalPrice)}</span>
              </button>

              <button
                onClick={handleOpenFullCustomizer}
                className="sm:col-span-4 py-3.5 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 text-pizza-amber hover:text-white font-bold text-xs border border-charcoal-750 transition-colors flex items-center justify-center gap-1.5 btn-press"
              >
                <Sliders className="w-3.5 h-3.5 text-pizza-amber" />
                <span>Pizza Forge</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-cream-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stone-Deck Baked Fresh to Order</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

