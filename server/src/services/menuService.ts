import { menuRepository } from "../repositories/menuRepository";
import { MenuItem, MenuCategory } from "../types";

export class MenuService {
  async getMenu(category?: string): Promise<{ items: MenuItem[]; categories: string[] }> {
    let items: MenuItem[];
    if (category) {
      items = await menuRepository.getByCategory(category as MenuCategory);
    } else {
      items = await menuRepository.getAll();
    }

    const categories: MenuCategory[] = [
      "pizzas",
      "build-your-own",
      "deals",
      "sides",
      "drinks",
      "desserts"
    ];

    return {
      items,
      categories
    };
  }

  async getPizzaById(id: string): Promise<MenuItem | null> {
    return menuRepository.getById(id);
  }

  async getFeatured(): Promise<MenuItem[]> {
    return menuRepository.getFeatured();
  }
}

export const menuService = new MenuService();
