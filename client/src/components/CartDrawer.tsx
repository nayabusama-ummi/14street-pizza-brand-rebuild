import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Flame,
  Box
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../utils/formatters";
import { sound } from "../utils/audio";

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartDrawerOpen, 
    closeCartDrawer, 
    removeFromCart, 
    updateQuantity, 
    estimatedSubtotal, 
    totalItemsCount
  } = useCart();

  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const deliveryFee = 150;
  const grandTotal = estimatedSubtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop Scrim */}
      <div 
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131313] border-l border-[#201f1f] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#201f1f] flex items-center justify-between bg-[#1c1b1b]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-headline text-2xl uppercase tracking-wider text-white">The Order Stack</h3>
                <span className="font-sans text-xs text-[#ffb955] font-bold">
                  {totalItemsCount} {totalItemsCount === 1 ? "Box" : "Boxes"} in Queue
                </span>
              </div>
            </div>

            <button 
              onClick={closeCartDrawer}
              className="p-2 rounded-full text-[#cdc0ad] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Box Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1b1b] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#cdc0ad]">
                  <Box className="w-8 h-8" />
                </div>
                <p className="font-headline text-2xl text-white uppercase">Your stack is empty</p>
                <button
                  onClick={() => { closeCartDrawer(); navigate("/menu"); }}
                  className="bg-[#D32F2F] text-white font-headline text-base uppercase px-6 py-2.5 rounded-full"
                >
                  Explore Flavor Deck
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={item.id}
                  className="kraft-texture rounded-2xl p-4 shadow-lg border border-[#b8a68f]/50 relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-headline text-xl text-[#2D2A26] uppercase leading-tight">
                        {item.product.name}
                      </h4>
                      {item.selectedSize && (
                        <div className="font-mono text-[11px] font-bold text-[#D32F2F] uppercase">
                          {item.selectedSize.name} &bull; {item.selectedCrust}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#2D2A26]/50 hover:text-[#D32F2F] p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.selectedToppings && item.selectedToppings.length > 0 && (
                    <div className="text-[11px] font-mono text-[#2D2A26]/75 mb-3 flex flex-wrap gap-1">
                      {item.selectedToppings.map(t => (
                        <span key={t.id} className="bg-[#2D2A26]/10 px-1.5 py-0.5 rounded">
                          +{t.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/20">
                    <div className="flex items-center gap-2 bg-[#2D2A26]/10 rounded-full px-2.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-full bg-[#2D2A26] text-white flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-headline text-base text-[#2D2A26] font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-full bg-[#2D2A26] text-white flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-headline text-xl text-[#2D2A26] font-bold">
                      {formatPKR(item.estimatedUnitPrice * item.quantity)}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Thermal Receipt Summary Footer */}
          {items.length > 0 && (
            <div className="thermal-receipt p-6 border-t border-black/10 space-y-4">
              <div className="space-y-1.5 font-mono text-xs text-[#0A0A0A]">
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">Stack Subtotal:</span>
                  <span>{formatPKR(estimatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">Delivery Dispatch:</span>
                  <span>{formatPKR(deliveryFee)}</span>
                </div>
                <div className="border-t border-dashed border-[#0A0A0A]/30 pt-2 flex justify-between items-baseline font-bold">
                  <span className="font-headline text-xl uppercase">Total</span>
                  <span className="font-headline text-2xl text-[#D32F2F]">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => { closeCartDrawer(); navigate("/checkout"); }}
                className="w-full bg-[#D32F2F] hover:bg-[#be123c] text-white py-3.5 rounded-2xl font-headline text-xl uppercase tracking-wider flex items-center justify-center gap-2 heat-button-glow transition-all btn-press shadow-xl"
              >
                <span>Proceed to Mission Control</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
