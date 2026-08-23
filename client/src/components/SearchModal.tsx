import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Pizza, Sparkles, Flame, Film, ArrowRight, CornerDownLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { MenuItem } from "../types";
import { formatPKR } from "../utils/formatters";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 6 Diorama Stages for quick jump in search
  const dioramaStages = [
    { number: "01", name: "The Wheat Mill & Mountain Spring", tag: "Stone-Ground Flour" },
    { number: "02", name: "The 48-Hour Fermentation Vault", tag: "Cold Proofing" },
    { number: "03", name: "The Spice Bazaar & Charcoal Grill", tag: "14 Whole Spices" },
    { number: "04", name: "The 550°F Stone Deck Oven", tag: "Volcanic Hearth" },
    { number: "05", name: "Thermal Heat-Lock Express Dispatch", tag: "35-Min Delivery" },
    { number: "06", name: "The Giant 20\" Monster Feast", tag: "Grand Slices" },
  ];

  // Fetch menu on first search open
  useEffect(() => {
    if (isSearchOpen && items.length === 0) {
      setLoading(true);
      api.getMenu()
        .then((data) => {
          setItems(data.items);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isSearchOpen, items.length]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStages = dioramaStages.filter(
    (stage) =>
      stage.name.toLowerCase().includes(query.toLowerCase()) ||
      stage.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectItem = (item: MenuItem) => {
    setIsSearchOpen(false);
    navigate(`/pizza/${item.id}`);
  };

  const handleSelectDiorama = () => {
    setIsSearchOpen(false);
    navigate("/#odyssey");
    const el = document.getElementById("odyssey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-750 rounded-3xl shadow-2xl overflow-hidden glass-panel z-10 space-y-0">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-charcoal-800 flex items-center gap-3 bg-charcoal-950/60">
          <Search className="w-5 h-5 text-pizza-red flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pizza flavours, 20-inch monster deals, craft stages..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-cream-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-cream-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline px-2 py-1 rounded-lg bg-charcoal-800 text-[10px] font-mono text-cream-400 border border-charcoal-700">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Quick Shortcuts if query is empty */}
          {!query && (
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-400">
                  ⚡ Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {["New York Tikka Blaster", "20\" Monster Pizza", "Broadway Fajita", "Molten Lava Cake", "Cheesy Garlic Bread"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-xs text-cream-300 hover:text-white border border-charcoal-750 transition-colors btn-press"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6-Scene Quick Links */}
              <div className="space-y-2 pt-2 border-t border-charcoal-800">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pizza-amber flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  <span>Interactive 3D Diorama Journey</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dioramaStages.slice(0, 4).map((st) => (
                    <button
                      key={st.number}
                      onClick={handleSelectDiorama}
                      className="p-2.5 rounded-xl bg-charcoal-950/60 hover:bg-charcoal-800 border border-charcoal-800 text-left flex items-center justify-between text-xs text-cream-300 hover:text-white transition-colors"
                    >
                      <span className="font-mono text-pizza-amber font-bold text-[10px] mr-2">
                        {st.number}
                      </span>
                      <span className="truncate flex-1">{st.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cream-500 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Items Filtered */}
          {query && filteredItems.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-400 px-2 block">
                Menu Items ({filteredItems.length})
              </span>
              <div className="space-y-1.5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="p-3 rounded-2xl bg-charcoal-950/50 hover:bg-charcoal-800 border border-charcoal-800 hover:border-charcoal-700 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-charcoal-900 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-pizza-red transition-colors truncate">
                            {item.name}
                          </h4>
                          {item.badge && (
                            <span className="px-2 py-0.2 rounded-full bg-pizza-red/20 text-pizza-red-light text-[9px] font-bold border border-pizza-red/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-cream-400 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-display font-bold text-xs sm:text-sm text-pizza-amber">
                        {formatPKR(item.sizes ? item.sizes[0].price : item.basePrice || 0)}
                      </span>
                      <CornerDownLeft className="w-4 h-4 text-cream-500 group-hover:text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diorama Stages Filtered */}
          {query && filteredStages.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-charcoal-800">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pizza-amber px-2 block">
                Craft Odyssey Stages ({filteredStages.length})
              </span>
              <div className="space-y-1.5">
                {filteredStages.map((st) => (
                  <div
                    key={st.number}
                    onClick={handleSelectDiorama}
                    className="p-3 rounded-2xl bg-charcoal-950/50 hover:bg-charcoal-800 border border-charcoal-800 hover:border-charcoal-700 cursor-pointer flex items-center justify-between text-xs text-cream-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-pizza-amber/10 text-pizza-amber font-mono font-bold text-[10px]">
                        STAGE {st.number}
                      </span>
                      <span className="font-bold text-white">{st.name}</span>
                    </div>
                    <span className="text-[11px] text-cream-500 font-mono">
                      #{st.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query && filteredItems.length === 0 && filteredStages.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <Pizza className="w-10 h-10 text-cream-600 mx-auto" />
              <h3 className="font-display font-bold text-sm text-white">No results found</h3>
              <p className="text-xs text-cream-400">
                No items matched "{query}". Try another flavor name or keyword.
              </p>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-charcoal-950 border-t border-charcoal-800 text-[11px] text-cream-500 flex items-center justify-between px-5 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>14th Street Pizza</span>
        </div>

      </div>
    </div>
  );
};

