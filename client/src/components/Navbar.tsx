import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  Flame, 
  Search, 
  Menu as MenuIcon, 
  X,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../utils/formatters";
import { sound } from "../utils/audio";

export const Navbar: React.FC = () => {
  const { 
    totalItemsCount, 
    estimatedSubtotal, 
    openCartDrawer, 
    setIsSearchOpen, 
    soundEnabled, 
    setSoundEnabled 
  } = useCart();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      sound.playAddToCart();
    }
  };

  const navLinks = [
    { label: "Flavor Deck", href: "/menu", isRoute: true },
    { label: "Pizza Forge", href: "/pizza/build-your-own-pizza", isRoute: true },
    { label: "The Big Ones", href: "/#big-ones", isRoute: false },
    { label: "Flour to Fire", href: "/#flour-to-fire", isRoute: false },
    { label: "Deals", href: "/menu?category=deals", isRoute: true }
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1240px] z-50 transition-all duration-300">
      <div className="bg-[#131313]/90 backdrop-blur-md border border-white/10 rounded-full px-5 sm:px-6 py-2.5 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden group/nav">
        
        {/* Subtle Ambient Bottom Glow Line */}
        <div className="nav-glow-line opacity-50 group-hover/nav:opacity-100 group-hover/nav:shadow-[0_-2px_15px_rgba(211,47,47,0.8)]" />

        {/* Left: Brand Lockup with Pizza Disc Motif */}
        <Link to="/" onClick={closeMobile} className="flex items-center gap-3 group/brand shrink-0">
          <div className="relative w-9 h-9 rounded-full border-2 border-[#dc9100] bg-[#FFF8E7] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover/brand:rotate-[20deg] shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-1.5 left-1.5" />
            <div className="w-2 h-2 bg-[#D32F2F] rounded-full absolute bottom-1.5 right-2" />
            <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full absolute top-4 left-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xl sm:text-2xl text-white uppercase tracking-wider leading-none mt-0.5">
              14th Street <span className="text-[#D32F2F]">Pizza</span>
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links with Pizza Slice Indicator & Melt Line */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isMenuRoot = link.href === "/menu" && location.pathname === "/menu" && !location.search;
            const isForge = link.href.includes("/pizza/") && location.pathname.includes("/pizza/");
            const isDeals = link.href.includes("deals") && location.search.includes("deals");
            const isHome = link.href === "/" && location.pathname === "/";
            const isActive = isMenuRoot || isForge || isDeals || (link.href === "/" && isHome);

            return link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="relative group/link nav-link-group flex flex-col items-center justify-center py-1.5"
              >
                <span className={`font-sans text-xs tracking-wider uppercase font-semibold transition-colors duration-200 ${
                  isActive ? "text-white font-bold" : "text-[#cdc0ad] group-hover/link:text-white"
                }`}>
                  {link.label}
                </span>
                {isActive ? (
                  <div className="pizza-slice-indicator" />
                ) : (
                  <div className="nav-melt-line" />
                )}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="relative group/link nav-link-group flex flex-col items-center justify-center py-1.5"
              >
                <span className="font-sans text-xs tracking-wider uppercase font-semibold text-[#cdc0ad] group-hover/link:text-white transition-colors duration-200">
                  {link.label}
                </span>
                <div className="nav-melt-line" />
              </a>
            );
          })}
        </div>

        {/* Right: Actions (Search, Sound, Cart Stack, Order Now CTA) */}
        <div className="flex items-center gap-3">
          
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="hidden sm:flex text-[#cdc0ad] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            title={soundEnabled ? "Mute audio" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#525866]" />
            )}
          </button>

          {/* Search Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-[#cdc0ad] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            title="Search menu (Cmd+K / Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart / Stack Trigger with Badge */}
          <button 
            onClick={openCartDrawer}
            className="relative group/cart w-9 h-9 rounded-full border border-white/15 bg-[#1c1b1b] flex items-center justify-center hover:border-[#ffb955] transition-colors btn-press"
            aria-label="View Order Stack"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            {totalItemsCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#131313] animate-pulse">
                {totalItemsCount}
              </div>
            )}
          </button>

          {/* Order Now CTA */}
          <Link
            to="/menu"
            className="hidden sm:flex items-center gap-1.5 bg-[#D32F2F] hover:bg-[#be123c] text-white font-headline text-base tracking-wider uppercase px-4 py-1.5 rounded-full heat-button-glow transition-all duration-300 relative overflow-hidden group/btn btn-press"
          >
            <span className="relative z-10">Order Now</span>
            <Flame className="w-3.5 h-3.5 text-[#ffb955] relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5A623]/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#e5e2e1] hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#131313]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3 animate-fade-in">
          <Link
            to="/menu"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-white border-b border-[#2a2a2a] hover:text-[#D32F2F]"
          >
            The Flavor Deck (Menu)
          </Link>
          <Link
            to="/pizza/build-your-own-pizza"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-[#ffb955] border-b border-[#2a2a2a]"
          >
            The Pizza Forge (Customizer)
          </Link>
          <a
            href="/#big-ones"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-white border-b border-[#2a2a2a]"
          >
            The Big Ones (20" Monster)
          </a>
          <a
            href="/#flour-to-fire"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-white border-b border-[#2a2a2a]"
          >
            Flour to Fire (Craft Odyssey)
          </a>
          <Link
            to="/menu?category=deals"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-[#ffb3ac] border-b border-[#2a2a2a]"
          >
            The Pizza Drop (Deals)
          </Link>
          <Link
            to="/cart"
            onClick={closeMobile}
            className="block py-2 font-headline text-xl uppercase tracking-wider text-white flex items-center justify-between"
          >
            <span>The Order Stack (Cart)</span>
            {totalItemsCount > 0 && (
              <span className="bg-[#D32F2F] text-white text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                {totalItemsCount} ({formatPKR(estimatedSubtotal)})
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};
