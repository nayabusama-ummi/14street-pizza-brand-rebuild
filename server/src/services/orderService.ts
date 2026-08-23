import { orderRepository } from "../repositories/orderRepository";
import { pricingService } from "./pricingService";
import { Order, CartItemConfig, CustomerInfo, DeliveryAddress, FulfillmentType, PaymentMethod } from "../types";
import { generateOrderId, generateOrderNumber } from "../utils/orderNumber";

export interface CreateOrderInput {
  customer: CustomerInfo;
  fulfillment: FulfillmentType;
  address?: DeliveryAddress;
  items: CartItemConfig[];
  paymentMethod?: PaymentMethod;
}

export class OrderService {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const quote = await pricingService.calculateQuote(input.fulfillment, input.items);

    const now = new Date();
    const eta = new Date(now.getTime() + quote.estimatedMinutes * 60 * 1000);

    const orderId = generateOrderId();
    const orderNumber = generateOrderNumber();

    const order: Order = {
      id: orderId,
      orderNumber,
      customer: {
        name: input.customer.name.trim(),
        phone: input.customer.phone.trim(),
        email: input.customer.email ? input.customer.email.trim() : undefined
      },
      fulfillment: input.fulfillment,
      address: input.fulfillment === "delivery" ? input.address : undefined,
      items: quote.items,
      subtotal: quote.subtotal,
      deliveryFee: quote.deliveryFee,
      discount: quote.discount,
      total: quote.total,
      currency: quote.currency,
      paymentMethod: input.paymentMethod || "cash-on-delivery",
      status: "received",
      estimatedDeliveryTime: eta.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    return orderRepository.create(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    let order = await orderRepository.getById(id);
    if (!order) {
      const allOrders = await orderRepository.getAll();
      order = allOrders.find(o => o.orderNumber.toUpperCase() === id.toUpperCase() || o.id === id) || null;
    }
    return order;
  }
}

export const orderService = new OrderService();
