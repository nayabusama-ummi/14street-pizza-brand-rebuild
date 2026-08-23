import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Box, 
  ShoppingBag, 
  Flame, 
  Check, 
  Tag,
  ArrowLeft
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../utils/formatters";
import { sound } from "../utils/audio";

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    estimatedSubtotal, 
    totalItemsCount,
    addToCart
  } = useCart();

  const navigate = useNavigate();
  const deliveryFee = 150;
  const grandTotal = estimatedSubtotal + deliveryFee;

  // Side Quests Upsell Items
  const sideQuests = [
    {
      id: "side-cheesy-garlic-bread",
      name: "Four-Cheese Garlic Bread",
      desc: "Toasted baguette with garlic butter & melted mozzarella.",
      price: 499,
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "side-peri-peri-wings",
      name: "Fiery Peri-Peri Wings (6 Pcs)",
      desc: "Crispy wings tossed in house spicy peri glaze.",
      price: 649,
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dessert-molten-lava-cake",
      name: "Belgian Molten Lava Cake",
      desc: "Warm dark chocolate cake with molten center.",
      price: 499,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const handleAddSide = (side: typeof sideQuests[0]) => {
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
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#131313] pt-36 pb-24 text-center">
        <div className="content-canvas max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 rounded-full bg-[#1c1b1b] border-2 border-[#2a2a2a] flex items-center justify-center mx-auto text-[#cdc0ad]">
            <Box className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-headline text-4xl text-white uppercase">Your Pizza Stack is Empty</h2>
            <p className="font-sans text-sm text-[#cdc0ad]">
              No warm pizza boxes on the dispatch counter yet. Visit the Flavor Deck or Pizza Forge to start building.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-xl uppercase tracking-wider px-8 py-3.5 rounded-full heat-button-glow transition-all btn-press"
          >
            <span>Explore Flavor Deck</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden pt-28 pb-28">
      <div className="content-canvas">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 border-b border-[#201f1f] pb-6">
          <div>
            <span className="font-sans text-xs tracking-[0.25em] text-[#ffb955] uppercase font-bold">
              Dispatch Counter
            </span>
            <h1 className="font-headline text-5xl sm:text-6xl text-white uppercase leading-none mt-1">
              The Order Stack
            </h1>
            <p className="font-sans text-sm text-[#cdc0ad] mt-1">
              {totalItemsCount} {totalItemsCount === 1 ? "Box" : "Boxes"} ready for 550°F oven dispatch.
            </p>
          </div>

          <button
            onClick={() => { sound.playClick(); clearCart(); }}
            className="text-xs font-sans text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Stack</span>
          </button>
        </div>

        {/* Main 2-Column Physical Metaphor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT: PHYSICAL STACK OF PIZZA BOXES (col 7/12) ================= */}
          <div className="lg:col-span-7 space-y-6">
            {items.map((item, idx) => (
              <div 
                key={item.id}
                className="kraft-texture rounded-3xl p-6 shadow-2xl relative border-2 border-[#b8a68f]/40 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Kraft Box Stamp Header */}
                <div className="flex justify-between items-start mb-4 border-b border-[#2D2A26]/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#2D2A26] text-[#E6D5B8] flex items-center justify-center font-mono font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <span className="font-headline text-2xl sm:text-3xl text-[#2D2A26] uppercase leading-tight block">
                        {item.product.name}
                      </span>
                      {item.selectedSize && (
                        <span className="font-mono text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
                          [{item.selectedSize.name} &bull; {item.selectedCrust || "Pan Crust"}]
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { sound.playClick(); removeFromCart(item.id); }}
                    className="text-[#2D2A26]/60 hover:text-[#D32F2F] p-1 transition-colors"
                    title="Remove Box"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Toppings / Modifiers list */}
                {item.selectedToppings && item.selectedToppings.length > 0 && (
                  <div className="mb-4 text-xs font-sans text-[#2D2A26]/80 flex flex-wrap gap-1.5">
                    <span className="font-bold text-[#2D2A26]">Toppings:</span>
                    {item.selectedToppings.map(t => (
                      <span key={t.id} className="px-2 py-0.5 rounded-md bg-[#2D2A26]/10 font-mono text-[11px]">
                        +{t.name}
                      </span>
                    ))}
                  </div>
                )}

                {item.specialInstructions && (
                  <div className="mb-4 text-xs font-mono italic text-[#2D2A26]/70">
                    Note: "{item.specialInstructions}"
                  </div>
                )}

                {/* Quantity Adjuster & Box Total */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2D2A26]/20">
                  <div className="flex items-center gap-3 bg-[#2D2A26]/10 rounded-full px-3 py-1">
                    <button
                      onClick={() => { sound.playClick(); updateQuantity(item.id, item.quantity - 1); }}
                      className="w-6 h-6 rounded-full bg-[#2D2A26] text-white flex items-center justify-center hover:bg-[#D32F2F] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-headline text-lg text-[#2D2A26] font-bold">{item.quantity}</span>
                    <button
                      onClick={() => { sound.playClick(); updateQuantity(item.id, item.quantity + 1); }}
                      className="w-6 h-6 rounded-full bg-[#2D2A26] text-white flex items-center justify-center hover:bg-[#D32F2F] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-headline text-2xl text-[#2D2A26] font-bold">
                      {formatPKR(item.estimatedUnitPrice * item.quantity)}
                    </span>
                  </div>
                </div>

              </div>
            ))}

            {/* Link back to Menu */}
            <div className="pt-4 text-center sm:text-left">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs font-sans text-[#ffb955] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Boxes From Flavor Deck</span>
              </Link>
            </div>
          </div>

          {/* ================= RIGHT: THERMAL RECEIPT MANIFEST TICKET (col 5/12) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Printed Thermal Receipt */}
            <div className="thermal-receipt rounded-t-2xl p-6 sm:p-8 relative shadow-2xl">
              
              {/* Receipt Header */}
              <div className="text-center space-y-1 border-b-2 border-dashed border-[#0A0A0A]/20 pb-4 mb-5">
                <div className="font-headline text-3xl uppercase tracking-wider text-[#0A0A0A]">
                  14TH STREET PIZZA
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#0A0A0A]/70">
                  ORDER STACK MANIFEST TICKET
                </div>
              </div>

              {/* Itemized Lines */}
              <div className="space-y-3 mb-6 font-mono text-xs text-[#0A0A0A]">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold">{item.quantity}x {item.product.name}</span>
                      {item.selectedSize && (
                        <div className="text-[10px] text-[#0A0A0A]/70">
                          {item.selectedSize.name} &bull; {item.selectedCrust}
                        </div>
                      )}
                    </div>
                    <span className="font-bold shrink-0 ml-2">
                      {formatPKR(item.estimatedUnitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal, Delivery, Total calculation */}
              <div className="border-t border-[#0A0A0A]/20 pt-4 space-y-2 font-mono text-xs text-[#0A0A0A]">
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">Stack Subtotal:</span>
                  <span>{formatPKR(estimatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">Motorcycle Dispatch:</span>
                  <span>{formatPKR(deliveryFee)}</span>
                </div>

                {/* Final Total */}
                <div className="border-t-2 border-dashed border-[#0A0A0A]/30 pt-3 flex justify-between items-baseline">
                  <span className="font-headline text-2xl uppercase tracking-wider">TOTAL ESTIMATE</span>
                  <span className="font-headline text-3xl text-[#D32F2F] font-bold">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Primary Mission Control Proceed CTA */}
              <div className="mt-8">
                <button
                  onClick={() => { sound.playClick(); navigate("/checkout"); }}
                  className="w-full bg-[#D32F2F] hover:bg-[#be123c] text-white py-4 rounded-2xl font-headline text-2xl uppercase tracking-wider heat-button-glow transition-all btn-press shadow-xl flex items-center justify-center gap-3"
                >
                  <span>PROCEED TO MISSION CONTROL</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Zig-Zag Thermal Perforated Edge */}
            <div className="receipt-edge -mt-2 shadow-lg" />

          </div>

        </div>

        {/* ================= BOTTOM: SIDE QUESTS UPSELL ================= */}
        <div className="mt-24 pt-12 border-t border-[#201f1f]">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
            <span className="font-sans text-xs tracking-widest text-[#ffb955] uppercase font-bold">
              Add To Your Stack
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-white uppercase">
              Side Quests & Sweets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sideQuests.map((side) => (
              <div 
                key={side.id}
                className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-3xl p-4 flex items-center gap-4 hover:border-[#ffb955]/40 transition-colors"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2a2a2a] shrink-0 bg-[#0e0e0e]">
                  <img src={side.image} alt={side.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline text-lg text-white uppercase truncate">{side.name}</h4>
                  <span className="font-headline text-lg text-[#ffb955]">{formatPKR(side.price)}</span>
                </div>
                <button
                  onClick={() => handleAddSide(side)}
                  className="p-2.5 rounded-full bg-[#D32F2F] hover:bg-[#be123c] text-white transition-colors btn-press"
                  title="Add to Stack"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
