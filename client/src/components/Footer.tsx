import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Pizza, ShieldAlert, Heart, ArrowUpRight, Code2, Sparkles, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname === "/odyssey" || location.pathname === "/lets-scroll") {
    return null;
  }
  return (
    <footer className="bg-[#0e0e0e] border-t border-[#201f1f] pt-16 pb-12 text-[#cdc0ad] text-xs font-sans">
      <div className="content-canvas space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Concept Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-[#dc9100] bg-[#FFF8E7] flex items-center justify-center overflow-hidden shadow-sm">
                <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-1.5 left-1.5" />
                <div className="w-2 h-2 bg-[#D32F2F] rounded-full absolute bottom-1.5 right-2" />
                <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-4 left-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl text-white uppercase tracking-wider leading-none">
                  14TH STREET <span className="text-[#D32F2F]">PIZZA</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#f5a623] font-bold mt-0.5">
                  20" Monster Slices
                </span>
              </div>
            </div>
            <p className="text-xs text-[#cdc0ad] leading-relaxed">
              New York style 20-inch foldable slices, 48-hour cold-fermented dough, and charcoal-smoked Pakistani fusion flavors baked on 550°F volcanic stone deck hearths.
            </p>
          </div>

          {/* Quick Experience Links */}
          <div className="space-y-3">
            <div className="font-headline text-xl text-white uppercase tracking-wider">
              Experience Flow
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  The Flavor Deck (Menu)
                </Link>
              </li>
              <li>
                <Link to="/pizza/build-your-own-pizza" className="hover:text-[#f5a623] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#f5a623]" />
                  <span>The Pizza Forge (Customizer)</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  The Order Stack (Cart)
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Delivery Mission Control
                </Link>
              </li>
              <li>
                <a href="/#big-ones" className="hover:text-white transition-colors">
                  The 20" Monster Slices
                </a>
              </li>
              <li>
                <a href="/#flour-to-fire" className="hover:text-white transition-colors">
                  Flour to Fire Odyssey
                </a>
              </li>
            </ul>
          </div>

          {/* Hub Cities in Pakistan */}
          <div className="space-y-3">
            <div className="font-headline text-xl text-white uppercase tracking-wider">
              Dispatch Hubs
            </div>
            <ul className="space-y-1.5 text-xs text-[#cdc0ad]">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#d32f2f]" />
                <span>Karachi (PECHS, Clifton, Gulshan)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#d32f2f]" />
                <span>Lahore (DHA, Gulberg, Johar Town)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#d32f2f]" />
                <span>Islamabad & Rawalpindi (F-7, Bahria)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#d32f2f]" />
                <span>Faisalabad, Multan, Peshawar</span>
              </li>
            </ul>
          </div>

          {/* Legal / Portfolio Disclaimer */}
          <div className="space-y-3">
            <div className="font-headline text-xl text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Project Notice</span>
            </div>
            <div className="p-4 rounded-xl bg-[#161515] border border-[#262525] space-y-2 text-[11px] leading-relaxed text-[#cdc0ad]">
              <p>
                Independent concept project created for portfolio and educational purposes. Not affiliated with or endorsed by 14th Street Pizza.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#201f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f8a85]">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 14th Street Pizza Concept. Handcrafted with passion & flavor.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
            <span>&bull;</span>
            <Link to="/pizza/build-your-own-pizza" className="hover:text-white transition-colors">Forge</Link>
            <span>&bull;</span>
            <Link to="/cart" className="hover:text-white transition-colors">Order Stack</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
