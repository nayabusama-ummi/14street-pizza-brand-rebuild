import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export const validateBody = (schema: AnyZodObject | ZodEffects<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
