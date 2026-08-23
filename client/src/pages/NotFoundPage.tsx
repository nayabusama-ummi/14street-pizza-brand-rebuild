import React from "react";
import { Link } from "react-router-dom";
import { Pizza, ArrowLeft, Sparkles } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-24 max-w-lg mx-auto px-4 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-charcoal-900 border border-charcoal-750 flex items-center justify-center mx-auto text-pizza-red shadow-card-dark animate-float-slow">
        <Pizza className="w-12 h-12 transform -rotate-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-pizza-amber uppercase tracking-widest">
          404 · Page Not Found
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          This Slice Has Disappeared
        </h1>
        <p className="text-xs sm:text-sm text-cream-400">
          The page you are looking for might have been eaten, moved, or never existed. Let's get you back to fresh pizza!
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-pizza-red hover:bg-pizza-red-dark text-white text-xs font-bold shadow-glow-red transition-all btn-press flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/menu"
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 text-pizza-amber text-xs font-bold border border-charcoal-750 transition-all btn-press"
        >
          Explore Full Menu
        </Link>
      </div>
    </div>
  );
};
