import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  deliveryFee: 150, // Standard flat PKR 150 delivery fee
  currency: "PKR" as const,
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "500", 10)
};
