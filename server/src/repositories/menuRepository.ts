import { MenuItem, MenuCategory } from "../types";
import { seedMenu } from "../data/menuData";

export interface IMenuRepository {
  getAll(): Promise<MenuItem[]>;
  getByCategory(category: MenuCategory): Promise<MenuItem[]>;
  getById(id: string): Promise<MenuItem | null>;
  getFeatured(): Promise<MenuItem[]>;
}

export class InMemoryMenuRepository implements IMenuRepository {
  private menu: MenuItem[] = [...seedMenu];

  async getAll(): Promise<MenuItem[]> {
    return this.menu.filter(item => item.available);
  }

  async getByCategory(category: MenuCategory): Promise<MenuItem[]> {
    return this.menu.filter(item => item.available && item.category === category);
  }

  async getById(id: string): Promise<MenuItem | null> {
    const item = this.menu.find(i => i.id === id);
    return item ? { ...item } : null;
  }

  async getFeatured(): Promise<MenuItem[]> {
    return this.menu.filter(item => item.available && item.featured);
  }
}

export const menuRepository = new InMemoryMenuRepository();
