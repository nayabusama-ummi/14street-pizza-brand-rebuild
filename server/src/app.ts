import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { config } from "./config";
import { apiRateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import healthRoutes from "./routes/healthRoutes";
import menuRoutes from "./routes/menuRoutes";
import orderRoutes from "./routes/orderRoutes";
import { swaggerDocument } from "./docs/swaggerSpec";

export function createApp(): Express {
  const app = express();

  app.use(helmet({
    contentSecurityPolicy: false
  }));

  app.use(cors({
    origin: config.corsOrigin === "*" ? true : config.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "14th Street Pizza API Documentation",
    customCss: ".swagger-ui .topbar { background-color: #121316; }"
  }));

  app.get("/api/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });

  app.use("/api", apiRateLimiter);

  app.use("/api", healthRoutes);
  app.use("/api", menuRoutes);
  app.use("/api", orderRoutes);

  app.use("/api/*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `The requested endpoint '${req.method} ${req.originalUrl}' does not exist on this server.`
      }
    });
  });

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "14th Street Pizza API — Concept Rebuild",
      docs: "/api/docs",
      health: "/api/health"
    });
  });

  app.use(errorHandler);

  return app;
}

export const app = createApp();
