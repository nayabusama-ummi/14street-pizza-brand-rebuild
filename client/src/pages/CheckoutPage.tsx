import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Truck, 
  Store, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Box, 
  Flame
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { FulfillmentType, OrderQuote, CustomerInfo, DeliveryAddress } from "../types";
import { formatPKR } from "../utils/formatters";
import { sound } from "../utils/audio";

export const CheckoutPage: React.FC = () => {
  const { 
    items, 
    cartItemConfigs, 
    clearCart, 
    estimatedSubtotal, 
    selectedCity, 
    setSelectedCity 
  } = useCart();

  const navigate = useNavigate();

  const [fulfillment, setFulfillment] = useState<FulfillmentType>("delivery");
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: ""
  });
  const [address, setAddress] = useState<DeliveryAddress>({
    address: "",
    city: selectedCity || "Karachi",
    area: "",
    instructions: ""
  });
  const [needChangeFor5000, setNeedChangeFor5000] = useState(false);

  // Server-authoritative Quote State
  const [quote, setQuote] = useState<OrderQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync address city with selectedCity
  useEffect(() => {
    setAddress(prev => ({ ...prev, city: selectedCity }));
  }, [selectedCity]);

  // Request authoritative quote from server
  useEffect(() => {
    if (cartItemConfigs.length === 0) return;

    setQuoteLoading(true);
    setQuoteError(null);

    api.getQuote(fulfillment, cartItemConfigs)
      .then((data) => {
        setQuote(data);
        setQuoteLoading(false);
      })
      .catch((err) => {
        setQuoteError(err.message || "Failed to calculate authoritative quote.");
        setQuoteLoading(false);
      });
  }, [fulfillment, cartItemConfigs]);

  const handleFulfillmentChange = (mode: FulfillmentType) => {
    sound.playClick();
    setFulfillment(mode);
    if (mode === "pickup") {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next.address;
        delete next.city;
        delete next.area;
        return next;
      });
    }
  };

  const pakistaniPhoneRegex = /^(?:\+92|92|0)?3[0-9]{2}[-\s]?[0-9]{7}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customer.name.trim() || customer.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    const cleanPhone = customer.phone.trim().replace(/\s+/g, "");
    if (!cleanPhone || !pakistaniPhoneRegex.test(cleanPhone)) {
      errors.phone = "Enter a valid Pakistani mobile number (e.g. 03001234567 or +923001234567).";
    }

    if (customer.email && customer.email.trim()) {
      if (!emailRegex.test(customer.email.trim())) {
        errors.email = "Enter a valid email address (e.g. name@example.com).";
      }
    }

    if (fulfillment === "delivery") {
      if (!address.address.trim() || address.address.trim().length < 5) {
        errors.address = "Please enter complete street address (at least 5 characters).";
      }
      if (!address.city.trim()) {
        errors.city = "Please select a dispatch city hub.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDispatchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      sound.playClick();
      return;
    }

    setSubmitting(true);
    sound.playOrderFired();

    try {
      const order = await api.createOrder({
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email?.trim() || undefined
        },
        fulfillment,
        address: fulfillment === "delivery" ? address : undefined,
        items: cartItemConfigs,
        paymentMethod: "cash-on-delivery"
      });

      clearCart();
      navigate(`/order/${order.orderNumber}`, { state: { order } });
    } catch (err: any) {
      if (err.fields) {
        const mappedErrors: Record<string, string> = {};
        Object.entries(err.fields).forEach(([key, val]) => {
          const fieldKey = key.split(".").pop() || key;
          mappedErrors[fieldKey] = String(val);
        });
        setFormErrors(prev => ({ ...prev, ...mappedErrors }));
      }
      setQuoteError(err.message || "Order dispatch could not be processed. Please review details.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-36 min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-[#1c1b1b] rounded-3xl p-10 max-w-md mx-auto border border-[#2a2a2a] space-y-4">
          <p className="text-sm text-[#cdc0ad]">Your order stack is empty. Please add items to dispatch.</p>
          <Link to="/menu" className="px-6 py-2.5 rounded-xl bg-[#d32f2f] text-white font-headline text-lg uppercase inline-block">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"];

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#d32f2f] selection:text-white">
      <div className="content-canvas">
        
        {/* Header Title */}
        <div className="mb-10 pb-6 border-b border-[#201f1f] space-y-2">
          <span className="font-sans text-xs tracking-[0.25em] text-[#ffb955] uppercase font-bold">
            Dispatch Center
          </span>
          <h1 className="font-headline text-5xl sm:text-6xl text-white uppercase leading-none">
            Delivery Mission Control
          </h1>
          <p className="font-sans text-sm text-[#cdc0ad]">
            Confirm your delivery coordinates. 550°F volcanic stone deck ovens are fired up and awaiting launch.
          </p>
        </div>

        {/* Main 2-Column Form & Manifest Grid */}
        <form onSubmit={handleDispatchOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT: CUSTOMER & LOCATION PARAMETERS (col 7/12) ================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Fulfillment Mode Selector */}
            <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
              <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffb955] text-black font-mono text-xs font-bold flex items-center justify-center">1</span>
                <span>Dispatch Mode</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => handleFulfillmentChange("delivery")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    fulfillment === "delivery"
                      ? "bg-[#D32F2F]/15 border-[#D32F2F] ring-1 ring-[#D32F2F]"
                      : "bg-[#131313] border-[#2a2a2a] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D32F2F] text-white flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xl text-white uppercase">Express Delivery</h4>
                    <p className="font-sans text-xs text-[#cdc0ad]">35-Minute Thermal Run</p>
                  </div>
                </div>

                <div
                  onClick={() => handleFulfillmentChange("pickup")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    fulfillment === "pickup"
                      ? "bg-[#D32F2F]/15 border-[#D32F2F] ring-1 ring-[#D32F2F]"
                      : "bg-[#131313] border-[#2a2a2a] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ffb955] text-black flex items-center justify-center shrink-0">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xl text-white uppercase">Direct Pickup</h4>
                    <p className="font-sans text-xs text-[#cdc0ad]">Direct Hearth Handover</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
              <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffb955] text-black font-mono text-xs font-bold flex items-center justify-center">2</span>
                <span>Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Asad Khan"
                      value={customer.name}
                      onChange={(e) => {
                        setCustomer({ ...customer, name: e.target.value });
                        if (formErrors.name) setFormErrors(prev => { const n = { ...prev }; delete n.name; return n; });
                      }}
                      className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 pl-10 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                    />
                    <User className="w-4 h-4 text-[#8f8a85] absolute left-3.5 top-3.5" />
                  </div>
                  {formErrors.name && <p className="text-rose-400 text-[11px] mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                    Pakistani Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={customer.phone}
                      onChange={(e) => {
                        setCustomer({ ...customer, phone: e.target.value });
                        if (formErrors.phone) setFormErrors(prev => { const n = { ...prev }; delete n.phone; return n; });
                      }}
                      className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 pl-10 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                    />
                    <Phone className="w-4 h-4 text-[#8f8a85] absolute left-3.5 top-3.5" />
                  </div>
                  {formErrors.phone && <p className="text-rose-400 text-[11px] mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="asad@example.com"
                    value={customer.email}
                    onChange={(e) => {
                      setCustomer({ ...customer, email: e.target.value });
                      if (formErrors.email) setFormErrors(prev => { const n = { ...prev }; delete n.email; return n; });
                    }}
                    className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 pl-10 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                  />
                  <Mail className="w-4 h-4 text-[#8f8a85] absolute left-3.5 top-3.5" />
                </div>
                {formErrors.email && <p className="text-rose-400 text-[11px] mt-1">{formErrors.email}</p>}
              </div>
            </div>

            {/* Delivery Address Form */}
            {fulfillment === "delivery" && (
              <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
                <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#ffb955] text-black font-mono text-xs font-bold flex items-center justify-center">3</span>
                  <span>Delivery Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                      Dispatch City Hub *
                    </label>
                    <select
                      value={address.city}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setAddress({ ...address, city: e.target.value });
                        if (formErrors.city) setFormErrors(prev => { const n = { ...prev }; delete n.city; return n; });
                      }}
                      className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city} className="bg-[#1c1b1b]">
                          {city} Dispatch Hub
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                      Area / Sector
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase 6 / PECHS / F-7"
                      value={address.area}
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                      className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                    Street Address & House Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. House 42-B, Street 14, Block 2"
                    value={address.address}
                    onChange={(e) => {
                      setAddress({ ...address, address: e.target.value });
                      if (formErrors.address) setFormErrors(prev => { const n = { ...prev }; delete n.address; return n; });
                    }}
                    className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                  />
                  {formErrors.address && <p className="text-rose-400 text-[11px] mt-1">{formErrors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#cdc0ad] mb-1.5">
                    Rider Delivery Notes / Nearby Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring bell twice, near the main mosque gate"
                    value={address.instructions}
                    onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                    className="w-full bg-[#131313] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#ffb955]"
                  />
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
              <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffb955] text-black font-mono text-xs font-bold flex items-center justify-center">4</span>
                <span>Payment Settlement</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#131313] border border-[#ffb955]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb955]/20 text-[#ffb955] flex items-center justify-center font-bold">
                    COD
                  </div>
                  <div>
                    <h4 className="font-headline text-lg uppercase text-white">Cash on Delivery</h4>
                    <p className="font-sans text-xs text-[#cdc0ad]">
                      {fulfillment === "delivery" ? "Pay the rider upon arrival" : "Pay at counter upon collection"}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>

              <label className="flex items-center gap-2 text-xs font-sans text-[#cdc0ad] cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={needChangeFor5000}
                  onChange={(e) => setNeedChangeFor5000(e.target.checked)}
                  className="rounded border-[#2a2a2a] text-[#D32F2F] focus:ring-[#D32F2F]"
                />
                <span>Rider should carry change for PKR 5,000 note</span>
              </label>
            </div>

          </div>

          {/* ================= RIGHT: THERMAL DISPATCH MANIFEST (col 5/12) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Printed Thermal Manifest */}
            <div className="thermal-receipt rounded-t-2xl p-6 sm:p-8 relative shadow-2xl space-y-6">
              
              {/* Manifest Header */}
              <div className="text-center space-y-1 border-b-2 border-dashed border-[#0A0A0A]/20 pb-4">
                <div className="font-headline text-3xl uppercase tracking-wider text-[#0A0A0A]">
                  14TH STREET PIZZA
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#0A0A0A]/70">
                  DISPATCH CONTROL MANIFEST
                </div>

                {/* Verified Price Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>KITCHEN PRICE VERIFIED</span>
                </div>
              </div>

              {/* Itemized Stack List */}
              <div className="space-y-3 font-mono text-xs text-[#0A0A0A]">
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

              {/* Authoritative Server Quote Calculations */}
              <div className="border-t border-[#0A0A0A]/20 pt-4 space-y-2 font-mono text-xs text-[#0A0A0A]">
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">Stack Subtotal:</span>
                  <span>{formatPKR(quote ? quote.subtotal : estimatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0A0A0A]/70">
                    {fulfillment === "delivery" ? "Dispatch Delivery:" : "Pickup Charge:"}
                  </span>
                  <span>{formatPKR(quote ? quote.deliveryFee : (fulfillment === "delivery" ? 150 : 0))}</span>
                </div>

                {/* Grand Total */}
                <div className="border-t-2 border-dashed border-[#0A0A0A]/30 pt-3 flex justify-between items-baseline">
                  <span className="font-headline text-2xl uppercase tracking-wider">PAYMENT DUE</span>
                  <span className="font-headline text-3xl text-[#D32F2F] font-bold">
                    {formatPKR(quote ? quote.total : (estimatedSubtotal + (fulfillment === "delivery" ? 150 : 0)))}
                  </span>
                </div>
              </div>

              {quoteError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                  {quoteError}
                </div>
              )}

              {/* High Intent Main CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || quoteLoading}
                  className="w-full bg-[#D32F2F] hover:bg-[#be123c] text-white py-4 rounded-2xl font-headline text-2xl uppercase tracking-wider heat-button-glow transition-all btn-press shadow-2xl flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <Flame className="w-5 h-5 text-[#ffb955]" />
                  <span>{submitting ? "DISPATCHING..." : "DISPATCH MY ORDER"}</span>
                </button>
              </div>

            </div>

            {/* Zig-Zag Thermal Edge */}
            <div className="receipt-edge -mt-2 shadow-lg" />

          </div>

        </form>

      </div>
    </div>
  );
};
