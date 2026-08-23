import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, MenuItem, PizzaSize, SauceOption, ToppingOption, CartItemConfig } from "../types";
import { sound } from "../utils/audio";

interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  cartItemConfigs: CartItemConfig[];
  addToCart: (item: Omit<CartItem, "id">, options?: { openDrawer?: boolean; silent?: boolean }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  estimatedSubtotal: number;
  finalEstimatedTotal: number;
  toCartPayload: () => CartItemConfig[];
  
  // Drawer & Modal States
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  quickViewProduct: MenuItem | null;
  setQuickViewProduct: (item: MenuItem | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Preferences
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "14th_street_pizza_cart_v2";
const SOUND_STORAGE_KEY = "14th_street_pizza_sound_v1";
const CITY_STORAGE_KEY = "14th_street_pizza_city_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(item => item && typeof item === "object" && item.id && item.product && item.quantity > 0);
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<MenuItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [selectedCity, setSelectedCityState] = useState<string>(() => {
    try {
      return localStorage.getItem(CITY_STORAGE_KEY) || "Karachi";
    } catch {
      return "Karachi";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(enabled));
    } catch {
      // ignore
    }
  };

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    try {
      localStorage.setItem(CITY_STORAGE_KEY, city);
    } catch {
      // ignore
    }
  };

  const addToCart = (
    itemData: Omit<CartItem, "id">,
    options: { openDrawer?: boolean; silent?: boolean } = { openDrawer: true, silent: false }
  ) => {
    const newItem: CartItem = {
      ...itemData,
      id: "cart_item_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now()
    };

    setCart(prev => [...prev, newItem]);

    if (!options.silent && soundEnabled) {
      sound.playAddToCart();
    }

    if (options.openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    if (soundEnabled) sound.playClick();
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    if (soundEnabled) sound.playClick();
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.min(10, quantity) } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const estimatedSubtotal = cart.reduce((sum, item) => {
    return sum + item.estimatedUnitPrice * item.quantity;
  }, 0);

  const finalEstimatedTotal = estimatedSubtotal;

  const toCartPayload = (): CartItemConfig[] => {
    return cart.map(item => ({
      pizzaId: item.product.id,
      size: item.selectedSize?.id,
      crust: item.selectedCrust,
      sauce: item.selectedSauce?.id,
      toppings: item.selectedToppings.map(t => t.id),
      quantity: item.quantity,
      specialInstructions: item.specialInstructions
    }));
  };

  const cartItemConfigs = toCartPayload();

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart,
        cartItemConfigs,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        estimatedSubtotal,
        finalEstimatedTotal,
        toCartPayload,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        soundEnabled,
        setSoundEnabled,
        selectedCity,
        setSelectedCity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
