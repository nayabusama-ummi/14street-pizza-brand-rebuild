export type MenuCategory = 
  | "pizzas" 
  | "build-your-own" 
  | "deals" 
  | "sides" 
  | "drinks" 
  | "desserts";

export interface PizzaSize {
  id: string;
  name: string;
  inches: number;
  slices: number;
  serves: string;
  price: number;
}

export interface SauceOption {
  id: string;
  name: string;
  spicyLevel?: number;
  price: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  category: "meat" | "cheese" | "veggie" | "sauce";
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  category: MenuCategory;
  image: string;
  available: boolean;
  featured?: boolean;
  badge?: string;
  spicyLevel?: number;
  sizes?: PizzaSize[];
  crusts?: string[];
  sauces?: SauceOption[];
  toppings?: ToppingOption[];
  basePrice?: number;
  ingredients?: string[];
  includesList?: string[];
}

export type FulfillmentType = "delivery" | "pickup";
export type PaymentMethod = "cash-on-delivery";

export type OrderStatus = 
  | "received" 
  | "preparing" 
  | "baking" 
  | "out-for-delivery" 
  | "ready-for-pickup" 
  | "delivered";

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface DeliveryAddress {
  address: string;
  city: string;
  area?: string;
  instructions?: string;
}

export interface CartItemConfig {
  pizzaId: string;
  size?: string;
  crust?: string;
  sauce?: string;
  toppings?: string[];
  quantity: number;
  specialInstructions?: string;
}

export interface AuthoritativeOrderItem {
  itemId: string;
  name: string;
  category: MenuCategory;
  image: string;
  size?: {
    id: string;
    name: string;
    inches: number;
    price: number;
  };
  crust?: string;
  sauce?: {
    id: string;
    name: string;
    price: number;
  };
  toppings?: {
    id: string;
    name: string;
    price: number;
  }[];
  unitPrice: number;
  quantity: number;
  itemTotal: number;
  specialInstructions?: string;
}

export interface OrderQuote {
  fulfillment: FulfillmentType;
  items: AuthoritativeOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: "PKR";
  estimatedMinutes: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  fulfillment: FulfillmentType;
  address?: DeliveryAddress;
  items: AuthoritativeOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: "PKR";
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}
