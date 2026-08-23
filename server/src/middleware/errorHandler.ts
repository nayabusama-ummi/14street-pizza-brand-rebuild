import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { PricingError } from "../services/pricingService";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ZodError) {
    const formattedFields: Record<string, string> = {};
    err.errors.forEach(e => {
      const fieldPath = e.path.join(".");
      formattedFields[fieldPath] = e.message;
    });

    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please correct the invalid fields in your request.",
        fields: formattedFields
      }
    });
    return;
  }

  if (err instanceof PricingError) {
    res.status(err.status).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        fields: err.fields
      }
    });
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_JSON",
        message: "Malformed JSON payload provided."
      }
    });
    return;
  }

  const isDev = process.env.NODE_ENV !== "production";
  console.error("[Internal Error]:", err);

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: isDev ? (err.message || "An unexpected error occurred.") : "An unexpected internal server error occurred."
    }
  });
}
