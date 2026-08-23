import { Order } from "../types";

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  getById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
}

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Map<string, Order> = new Map();

  async create(order: Order): Promise<Order> {
    this.orders.set(order.id, { ...order });
    return { ...order };
  }

  async getById(id: string): Promise<Order | null> {
    const order = this.orders.get(id);
    return order ? { ...order } : null;
  }

  async getAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const orderRepository = new InMemoryOrderRepository();
