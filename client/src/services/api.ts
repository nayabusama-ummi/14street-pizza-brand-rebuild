import { MenuItem, Order, OrderQuote, FulfillmentType, CartItemConfig, CustomerInfo, DeliveryAddress } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  let data: any;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}. Please check connection and try again.`);
    }
    throw new Error("Unable to parse server response. Please try again.");
  }
  if (!res.ok || !data?.success) {
    const errorMsg = data?.error?.message || "An unexpected error occurred. Please try again.";
    const err: any = new Error(errorMsg);
    err.code = data?.error?.code;
    err.fields = data?.error?.fields;
    err.status = res.status;
    throw err;
  }
  return data.data;
}

export const api = {
  async getHealth(): Promise<{ status: string; version: string; uptimeSeconds: number }> {
    const res = await fetch(`${BASE_URL}/health`);
    return handleResponse(res);
  },

  async getMenu(category?: string): Promise<{ items: MenuItem[]; categories: string[] }> {
    const url = category ? `${BASE_URL}/menu?category=${encodeURIComponent(category)}` : `${BASE_URL}/menu`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getFeaturedPizzas(): Promise<MenuItem[]> {
    const res = await fetch(`${BASE_URL}/menu/featured`);
    return handleResponse(res);
  },

  async getPizzaById(id: string): Promise<MenuItem> {
    const res = await fetch(`${BASE_URL}/pizzas/${encodeURIComponent(id)}`);
    return handleResponse(res);
  },

  async getQuote(fulfillment: FulfillmentType, items: CartItemConfig[]): Promise<OrderQuote> {
    const res = await fetch(`${BASE_URL}/orders/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fulfillment, items })
    });
    return handleResponse(res);
  },

  async createOrder(payload: {
    customer: CustomerInfo;
    fulfillment: FulfillmentType;
    address?: DeliveryAddress;
    items: CartItemConfig[];
    paymentMethod?: string;
  }): Promise<Order> {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  async getOrderById(orderId: string): Promise<Order> {
    const res = await fetch(`${BASE_URL}/orders/${encodeURIComponent(orderId)}`);
    return handleResponse(res);
  }
};
