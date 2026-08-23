import React from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Plus, ArrowRight, Eye } from "lucide-react";
import { MenuItem } from "../types";
import { formatPKR } from "../utils/formatters";
import { useCart } from "../context/CartContext";

interface PizzaCardProps {
  item: MenuItem;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ item }) => {
  const { setQuickViewProduct } = useCart();
  const isCustomizable = item.sizes && item.sizes.length > 0;
  
  const startingPrice = isCustomizable 
    ? item.sizes![0].price 
    : (item.basePrice || 0);

  return (
    <div className="group bg-[#1c1b1b] rounded-3xl overflow-hidden border border-[#2a2a2a] flex flex-col justify-between hover:border-[#ffb955]/40 transition-all duration-300 shadow-2xl hover:-translate-y-1.5 relative">
      
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0e0e0e]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-70" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 bg-[#D32F2F] text-white text-[11px] font-sans font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{item.badge}</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={() => setQuickViewProduct(item)}
          className="absolute top-3 right-3 p-2 rounded-xl bg-[#131313]/90 backdrop-blur-md border border-white/10 text-[#cdc0ad] hover:text-white hover:bg-[#D32F2F] opacity-0 group-hover:opacity-100 transition-all shadow-md btn-press"
          title="Quick preview & customize"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Spicy Indicator */}
        {item.spicyLevel && item.spicyLevel > 0 ? (
          <div className="absolute bottom-3 right-3 bg-[#131313]/90 backdrop-blur-md border border-white/10 text-rose-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5">
            {Array.from({ length: item.spicyLevel }).map((_, i) => (
              <Flame key={i} className="w-3 h-3 fill-[#D32F2F] text-[#D32F2F]" />
            ))}
          </div>
        ) : null}

        {/* Size Indicator for Pizzas */}
        {isCustomizable && (
          <div className="absolute bottom-3 left-3 bg-[#131313]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#ffb955] border border-white/10 font-bold">
            10" · 12" · 15" · 20" Monster
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1.5">
          <h3 className="font-headline text-2xl text-white group-hover:text-[#ffb955] transition-colors line-clamp-1">
            {item.name}
          </h3>
          
          <p className="font-sans text-xs text-[#cdc0ad] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#8f8a85] font-semibold">
              {isCustomizable ? "Starts at" : "Price"}
            </span>
            <span className="font-headline text-2xl text-[#ffb955] font-bold">
              {formatPKR(startingPrice)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isCustomizable ? (
              <Link
                to={`/pizza/${item.id}`}
                className="px-4 py-2 rounded-xl bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-base uppercase tracking-wider transition-colors btn-press flex items-center gap-1"
              >
                <span>Customize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => setQuickViewProduct(item)}
                className="px-4 py-2 rounded-xl bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-base uppercase tracking-wider transition-colors btn-press flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
