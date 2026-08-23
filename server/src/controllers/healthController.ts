import { Request, Response } from "express";

export class HealthController {
  getHealth(req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      data: {
        status: "healthy",
        service: "14th-street-pizza-api",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || "development"
      }
    });
  }
}

export const healthController = new HealthController();
