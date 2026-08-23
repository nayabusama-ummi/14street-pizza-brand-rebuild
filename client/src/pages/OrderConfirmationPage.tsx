import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Flame, 
  Truck, 
  Store, 
  Clock, 
  MapPin, 
  Receipt, 
  Copy, 
  Check, 
  ArrowRight, 
  Box, 
  DoorOpen, 
  Sparkles,
  Phone,
  Layers
} from "lucide-react";
import { api } from "../services/api";
import { Order } from "../types";
import { formatPKR } from "../utils/formatters";
import { sound } from "../utils/audio";

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const stateOrder = location.state?.order as Order | undefined;

  const [order, setOrder] = useState<Order | null>(stateOrder || null);
  const [loading, setLoading] = useState(!stateOrder);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    sound.playOrderFired();
  }, []);

  useEffect(() => {
    if (!stateOrder && orderId) {
      setLoading(true);
      api.getOrderById(orderId)
        .then((data: Order) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((err: any) => {
          setError(err.message || "Order not found on dispatch server.");
          setLoading(false);
        });
    }
  }, [orderId, stateOrder]);

  const copyOrderNumber = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-36 min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 border-4 border-[#d32f2f] border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="font-headline text-3xl uppercase tracking-widest text-[#f5a623]">Connecting to Delivery Mission Control...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-36 min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-[#1c1b1b] rounded-3xl p-10 max-w-lg mx-auto border border-[#2a2a2a] space-y-6 shadow-2xl">
          <h1 className="font-headline text-4xl uppercase text-white tracking-tight">
            ORDER NOT FOUND
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#cdc0ad]">
            We couldn't locate order reference #{orderId || "UNKNOWN"}.
          </p>
          <Link to="/menu" className="inline-block px-6 py-2.5 bg-[#D32F2F] text-white font-headline text-lg uppercase rounded-xl">
            Return to Flavor Deck
          </Link>
        </div>
      </div>
    );
  }

  const isDelivery = order.fulfillment === "delivery";

  const deliverySteps = [
    { label: "Received", icon: Receipt, active: true },
    { label: "Preparing", icon: Layers, active: true },
    { label: "In 550°F Oven", icon: Flame, active: true, eta: "30–35 MIN", current: true },
    { label: "Boxed", icon: Box, active: false },
    { label: isDelivery ? "On Road" : "Ready for Pickup", icon: isDelivery ? Truck : Store, active: false },
    { label: isDelivery ? "Delivered" : "Collected", icon: DoorOpen, active: false }
  ];

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#d32f2f] selection:text-white">
      <div className="content-canvas space-y-12">
        
        {/* ================= 1. HERO HEADER ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>Order Confirmed & Fired Up</span>
          </div>

          <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight leading-none">
            THE RUN IS ON.
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#cdc0ad]">
            Your 20-inch creations are on stone deck slabs inside our 550°F ovens.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="font-mono text-xs text-[#cdc0ad] uppercase tracking-wider">Order Reference:</span>
            <button
              onClick={copyOrderNumber}
              className="px-3.5 py-1.5 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] hover:border-[#D32F2F] text-white font-mono font-bold text-sm flex items-center gap-2 transition-all btn-press shadow-md"
              title="Copy Order ID"
            >
              <span className="text-[#ffb955]">#{order.orderNumber}</span>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#cdc0ad]" />}
            </button>
          </div>
        </div>

        {/* ================= 2. MINIATURE DELIVERY JOURNEY DIORAMA ================= */}
        <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-[#2a2a2a] bg-[#0e0e0e]">
          
          {/* Isometric Clay Diorama Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDye4IlZReMoinHGtaHw-V-dP6yCrDsktBu3Ag7J0Jq1L-ZCucZ-yr8sRm6dWkzm4Cd6PEIMJu3k_sKK7vD-JRwkbXOaBs3xVMHvNAzH35H-YdkdR2fDKWyI-04axzJevOwhT0jxcdM7QEUP1SuUenTWOA8IKQaLu4hrG_jbS5OIqP27SLdFzeW6hFNJXm0xyXj2glSQyH0q5flVHII7GEGtCmeYnBdxJmiNjynUUOQg1aNFhMfDRS2gQ')`
            }}
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-[#131313]/70" />

          {/* Glowing Animated Route Line */}
          <div className="absolute top-1/2 left-[6%] w-[88%] h-1 bg-[#2a2a2a] rounded-full -translate-y-1/2 overflow-hidden opacity-90">
            <div className="w-full h-full glowing-line" />
          </div>

          {/* Status Markers Overlaid on Diorama */}
          <div className="absolute inset-0 flex justify-between items-center px-4 sm:px-10 z-20">
            {deliverySteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.label}
                  className={`flex flex-col items-center gap-2 ${
                    step.current
                      ? "transform -translate-y-4 scale-110 sm:scale-125 z-30"
                      : step.active
                      ? "opacity-90"
                      : "opacity-40"
                  }`}
                >
                  <div className="relative">
                    {step.current && (
                      <div className="absolute -inset-3 bg-[#ffb955]/30 rounded-full blur-xl animate-pulse" />
                    )}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                        step.current
                          ? "bg-[#131313] border-2 border-[#ffb955] shadow-[0_0_30px_rgba(245,166,35,0.6)]"
                          : step.active
                          ? "bg-[#1c1b1b] border border-[#D32F2F]"
                          : "bg-[#0e0e0e] border border-[#2a2a2a]"
                      }`}
                    >
                      <StepIcon
                        className={`w-6 h-6 ${
                          step.current ? "text-[#ffb955] animate-pulse" : step.active ? "text-[#ffb3ac]" : "text-[#525866]"
                        }`}
                      />
                    </div>

                    {step.eta && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0e0e0e] border border-[#ffb955] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-xl">
                        <span className="font-mono text-[10px] font-bold text-[#ffb955]">
                          ETA {step.eta}
                        </span>
                      </div>
                    )}
                  </div>

                  <span
                    className={`font-sans text-[11px] uppercase font-bold tracking-wider ${
                      step.current
                        ? "text-[#ffb955] mt-4"
                        : step.active
                        ? "text-white"
                        : "text-[#525866]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= 3. THREE INFORMATION PANELS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Panel 1: Pizza Passport */}
          <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
            <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
              <Sparkles className="w-5 h-5 text-[#ffb955]" />
              <span>Pizza Passport</span>
            </h3>

            <div className="space-y-3 text-xs font-sans text-[#cdc0ad]">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>48h Cold Fermented Dough Base</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Charcoal-Smoked Pakistani Spice Rub</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Stone Deck 550°F Hearth Baked</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Sealed in Corrugated Heat-Lock Kraft</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Packing Slip / Thermal Receipt */}
          <div className="thermal-receipt rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs text-[#0A0A0A]">
            <div className="border-b border-[#0A0A0A]/20 pb-3 text-center">
              <div className="font-headline text-xl uppercase tracking-wider">PACKING SLIP</div>
              <div className="text-[10px] text-[#0A0A0A]/70">RECEIPT #{order.orderNumber}</div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{item.quantity}x {item.name}</span>
                    {item.size && <div className="text-[10px] text-[#0A0A0A]/70">{item.size.name} &bull; {item.crust || "Pan Crust"}</div>}
                  </div>
                  <span className="font-bold shrink-0 ml-2">{formatPKR(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#0A0A0A]/30 pt-3 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPKR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dispatch:</span>
                <span>{formatPKR(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#D32F2F] pt-1 border-t border-[#0A0A0A]/20">
                <span>TOTAL:</span>
                <span>{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Destination Coordinates */}
          <div className="bg-[#1c1b1b] rounded-3xl p-6 border border-[#2a2a2a] space-y-4">
            <h3 className="font-headline text-2xl uppercase tracking-wider text-white flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
              <MapPin className="w-5 h-5 text-[#D32F2F]" />
              <span>Destination Coordinates</span>
            </h3>

            <div className="space-y-3 text-xs font-sans text-[#cdc0ad]">
              <div>
                <span className="text-[#8f8a85] uppercase tracking-wider font-bold block text-[10px]">Recipient:</span>
                <span className="text-white font-bold text-sm">{order.customer.name}</span>
              </div>
              <div>
                <span className="text-[#8f8a85] uppercase tracking-wider font-bold block text-[10px]">Contact:</span>
                <span className="text-white font-mono">{order.customer.phone}</span>
              </div>
              {order.address && (
                <div>
                  <span className="text-[#8f8a85] uppercase tracking-wider font-bold block text-[10px]">Address:</span>
                  <span className="text-white">{order.address.address}, {order.address.area}, {order.address.city}</span>
                </div>
              )}
              <div>
                <span className="text-[#8f8a85] uppercase tracking-wider font-bold block text-[10px]">Payment:</span>
                <span className="text-emerald-400 font-bold">Cash on Delivery (Pending Handover)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2a2a2a]">
              <Link
                to="/menu"
                className="w-full bg-[#131313] hover:bg-[#D32F2F] text-white py-2.5 rounded-xl font-headline text-base uppercase tracking-wider text-center block transition-colors btn-press"
              >
                Order Another Pizza
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
