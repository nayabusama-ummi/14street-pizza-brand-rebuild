import { Request, Response, NextFunction } from "express";
import { menuService } from "../services/menuService";

export class MenuController {
  async getMenu(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = typeof req.query.category === "string" ? req.query.category : undefined;
      const result = await menuService.getMenu(category);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getPizzaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await menuService.getPizzaById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          error: {
            code: "PRODUCT_NOT_FOUND",
            message: `Pizza or menu item with ID '${id}' was not found.`
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeatured(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const featured = await menuService.getFeatured();
      res.status(200).json({
        success: true,
        data: featured
      });
    } catch (error) {
      next(error);
    }
  }
}

export const menuController = new MenuController();
