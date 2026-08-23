import React from "react";
import { 
  ClipboardCheck, 
  Sparkles, 
  Flame, 
  Truck, 
  Store, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { OrderStatus, FulfillmentType } from "../types";

interface StatusTimelineProps {
  status: OrderStatus;
  fulfillment: FulfillmentType;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ status, fulfillment }) => {
  const isDelivery = fulfillment === "delivery";

  const stages = [
    {
      id: "received",
      label: "Order Verified",
      subtext: "Kitchen Confirmed",
      icon: ClipboardCheck
    },
    {
      id: "preparing",
      label: "Dough Crafting",
      subtext: "48-Hr Sourdough Stretched",
      icon: Sparkles
    },
    {
      id: "baking",
      label: "Stone Hearth Bake",
      subtext: "550°F Volcanic Deck Oven",
      icon: Flame
    },
    {
      id: isDelivery ? "out-for-delivery" : "ready-for-pickup",
      label: isDelivery ? "Express Dispatch" : "Ready at Counter",
      subtext: isDelivery ? "20\" Thermal Bag Transit" : "Fresh at Counter",
      icon: isDelivery ? Truck : Store
    },
    {
      id: "delivered",
      label: isDelivery ? "Feast Delivered" : "Picked Up",
      subtext: "Molten 20\" Slices Ready",
      icon: CheckCircle2
    }
  ];

  const statusOrder: Record<string, number> = {
    received: 0,
    preparing: 1,
    baking: 2,
    "out-for-delivery": 3,
    "ready-for-pickup": 3,
    delivered: 4
  };

  const currentStepIdx = statusOrder[status] ?? 0;

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {stages.map((st, idx) => {
          const isDone = idx <= currentStepIdx;
          const isCurrent = idx === currentStepIdx;
          const Icon = st.icon;

          return (
            <div key={st.id} className="flex flex-row md:flex-col items-center md:items-center gap-3 relative z-10">
              
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isCurrent
                    ? "bg-pizza-red text-white shadow-glow-red scale-110 ring-4 ring-pizza-red/20 animate-pulse"
                    : isDone
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-charcoal-900 text-cream-600 border border-charcoal-800"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Text Info */}
              <div className="text-left md:text-center space-y-0.5">
                <div className={`text-xs font-bold ${isDone ? "text-white" : "text-cream-500"}`}>
                  {st.label}
                </div>
                <div className="text-[10px] text-cream-400 font-mono">
                  {st.subtext}
                </div>
              </div>

              {/* Connector line on desktop */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 -z-10 bg-charcoal-800">
                  <div
                    className={`h-full transition-all duration-700 ${
                      idx < currentStepIdx ? "bg-emerald-500" : "bg-transparent"
                    }`}
                  />
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
