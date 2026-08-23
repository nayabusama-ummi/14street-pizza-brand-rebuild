import { Request, Response, NextFunction } from "express";
import { pricingService } from "../services/pricingService";
import { orderService } from "../services/orderService";

export class OrderController {
  async getQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fulfillment, items } = req.body;
      const quote = await pricingService.calculateQuote(fulfillment, items);

      res.status(200).json({
        success: true,
        data: quote
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await orderService.createOrder(req.body);

      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);

      if (!order) {
        res.status(404).json({
          success: false,
          error: {
            code: "ORDER_NOT_FOUND",
            message: `Order with ID or reference '${orderId}' was not found.`
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
