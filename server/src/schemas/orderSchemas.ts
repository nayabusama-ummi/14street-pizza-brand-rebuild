import { z } from "zod";

const pakistaniPhoneRegex = /^(?:\+92|92|0)?3[0-9]{2}[-\s]?[0-9]{7}$/;

export const cartItemSchema = z.object({
  pizzaId: z.string({
    required_error: "Product ID (pizzaId) is required."
  }).min(1, "Product ID cannot be empty."),
  size: z.string().optional(),
  crust: z.string().optional(),
  sauce: z.string().optional(),
  toppings: z.array(z.string()).max(10, "Maximum of 10 toppings allowed per pizza.").optional().default([]),
  quantity: z.number({
    required_error: "Quantity is required."
  }).int("Quantity must be an integer.").min(1, "Quantity must be at least 1.").max(10, "Quantity cannot exceed 10 per item."),
  specialInstructions: z.string().max(200, "Special instructions cannot exceed 200 characters.").optional()
});

export const quoteRequestSchema = z.object({
  fulfillment: z.enum(["delivery", "pickup"], {
    required_error: "Fulfillment method must be 'delivery' or 'pickup'."
  }),
  items: z.array(cartItemSchema, {
    required_error: "Cart cannot be empty."
  }).min(1, "Cart must contain at least one item.")
});

export const customerSchema = z.object({
  name: z.string({
    required_error: "Customer name is required."
  })
  .trim()
  .min(2, "Customer name must be at least 2 characters.")
  .max(60, "Customer name cannot exceed 60 characters."),
  
  phone: z.string({
    required_error: "Phone number is required."
  })
  .trim()
  .refine(val => pakistaniPhoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid Pakistani phone number (e.g., 03001234567 or +923001234567)."
  }),
  
  email: z.string().trim().email("Please provide a valid email address.").optional().or(z.literal(""))
});

export const deliveryAddressSchema = z.object({
  address: z.string({
    required_error: "Street address is required for delivery."
  }).trim().min(5, "Address must be at least 5 characters.").max(200, "Address cannot exceed 200 characters."),
  city: z.string({
    required_error: "City is required."
  }).trim().min(2, "City name must be at least 2 characters.").max(50, "City name cannot exceed 50 characters."),
  area: z.string().trim().max(100).optional(),
  instructions: z.string().trim().max(200).optional()
});

export const createOrderSchema = z.object({
  customer: customerSchema,
  fulfillment: z.enum(["delivery", "pickup"], {
    required_error: "Fulfillment method must be 'delivery' or 'pickup'."
  }),
  address: deliveryAddressSchema.optional(),
  items: z.array(cartItemSchema, {
    required_error: "Order must contain at least one item."
  }).min(1, "Order must contain at least one item."),
  paymentMethod: z.literal("cash-on-delivery", {
    invalid_type_error: "Payment method currently supported is 'cash-on-delivery'."
  }).default("cash-on-delivery")
}).superRefine((data, ctx) => {
  if (data.fulfillment === "delivery") {
    if (!data.address || !data.address.address || data.address.address.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A valid delivery address is required when fulfillment is 'delivery'.",
        path: ["address", "address"]
      });
    }
    if (!data.address || !data.address.city || data.address.city.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required when fulfillment is 'delivery'.",
        path: ["address", "city"]
      });
    }
  }
});
