import { menuRepository } from "../repositories/menuRepository";
import { CartItemConfig, FulfillmentType, OrderQuote, AuthoritativeOrderItem } from "../types";
import { config } from "../config";

export class PricingError extends Error {
  public code: string;
  public status: number;
  public fields?: Record<string, string>;

  constructor(message: string, code = "PRICING_ERROR", status = 400, fields?: Record<string, string>) {
    super(message);
    this.name = "PricingError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

export class PricingService {
  async calculateQuote(fulfillment: FulfillmentType, items: CartItemConfig[]): Promise<OrderQuote> {
    if (!items || items.length === 0) {
      throw new PricingError("Cart cannot be empty.", "EMPTY_CART", 400);
    }

    const calculatedItems: AuthoritativeOrderItem[] = [];
    let subtotal = 0;

    for (let index = 0; index < items.length; index++) {
      const itemConfig = items[index];
      const product = await menuRepository.getById(itemConfig.pizzaId);

      if (!product) {
        throw new PricingError(
          `Product with ID '${itemConfig.pizzaId}' was not found in our menu.`,
          "PRODUCT_NOT_FOUND",
          404,
          { [`items[${index}].pizzaId`]: "Unknown product ID." }
        );
      }

      if (!product.available) {
        throw new PricingError(
          `Product '${product.name}' is currently unavailable.`,
          "PRODUCT_UNAVAILABLE",
          400,
          { [`items[${index}].pizzaId`]: "Product is currently out of stock." }
        );
      }

      let unitPrice = 0;
      let selectedSizeData: AuthoritativeOrderItem["size"] | undefined;
      let selectedSauceData: AuthoritativeOrderItem["sauce"] | undefined;
      const selectedToppingsData: NonNullable<AuthoritativeOrderItem["toppings"]> = [];

      // Customizable item (pizzas / build-your-own)
      if (product.sizes && product.sizes.length > 0) {
        if (!itemConfig.size) {
          throw new PricingError(
            `A size must be selected for '${product.name}'.`,
            "SIZE_REQUIRED",
            400,
            { [`items[${index}].size`]: "Size selection is required for this product." }
          );
        }

        const sizeObj = product.sizes.find(s => s.id === itemConfig.size || s.name.toLowerCase().includes(itemConfig.size!.toLowerCase()));
        if (!sizeObj) {
          const available = product.sizes.map(s => s.id).join(", ");
          throw new PricingError(
            `Size '${itemConfig.size}' is not available for '${product.name}'. Available sizes: ${available}`,
            "INVALID_SIZE",
            400,
            { [`items[${index}].size`]: `Invalid size. Choose from: ${available}` }
          );
        }

        selectedSizeData = {
          id: sizeObj.id,
          name: sizeObj.name,
          inches: sizeObj.inches,
          price: sizeObj.price
        };
        unitPrice += sizeObj.price;

        // Crust validation
        if (itemConfig.crust && product.crusts) {
          const validCrust = product.crusts.find(c => c.toLowerCase() === itemConfig.crust!.toLowerCase());
          if (!validCrust) {
            throw new PricingError(
              `Crust '${itemConfig.crust}' is not valid for '${product.name}'.`,
              "INVALID_CRUST",
              400,
              { [`items[${index}].crust`]: `Invalid crust selection.` }
            );
          }
        }

        // Sauce validation
        if (itemConfig.sauce && product.sauces) {
          const sauceObj = product.sauces.find(s => s.id === itemConfig.sauce || s.name.toLowerCase().includes(itemConfig.sauce!.toLowerCase()));
          if (!sauceObj) {
            throw new PricingError(
              `Sauce '${itemConfig.sauce}' is not valid for '${product.name}'.`,
              "INVALID_SAUCE",
              400,
              { [`items[${index}].sauce`]: "Invalid sauce choice." }
            );
          }
          selectedSauceData = {
            id: sauceObj.id,
            name: sauceObj.name,
            price: sauceObj.price
          };
          unitPrice += sauceObj.price;
        }

        // Toppings validation
        if (itemConfig.toppings && itemConfig.toppings.length > 0) {
          if (!product.toppings) {
            throw new PricingError(
              `Extra toppings are not supported for '${product.name}'.`,
              "TOPPINGS_NOT_ALLOWED",
              400,
              { [`items[${index}].toppings`]: "Toppings cannot be added to this item." }
            );
          }

          for (const toppingId of itemConfig.toppings) {
            const toppingObj = product.toppings.find(t => t.id === toppingId || t.name.toLowerCase().includes(toppingId.toLowerCase()));
            if (!toppingObj) {
              throw new PricingError(
                `Topping '${toppingId}' is not a valid topping option for '${product.name}'.`,
                "INVALID_TOPPING",
                400,
                { [`items[${index}].toppings`]: `Unknown topping: '${toppingId}'` }
              );
            }
            selectedToppingsData.push({
              id: toppingObj.id,
              name: toppingObj.name,
              price: toppingObj.price
            });
            unitPrice += toppingObj.price;
          }
        }
      } else {
        // Fixed price item (sides, drinks, desserts, deals)
        unitPrice = product.basePrice || 0;
      }

      const itemTotal = unitPrice * itemConfig.quantity;
      subtotal += itemTotal;

      calculatedItems.push({
        itemId: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        size: selectedSizeData,
        crust: itemConfig.crust,
        sauce: selectedSauceData,
        toppings: selectedToppingsData.length > 0 ? selectedToppingsData : undefined,
        unitPrice,
        quantity: itemConfig.quantity,
        itemTotal,
        specialInstructions: itemConfig.specialInstructions
      });
    }

    const deliveryFee = fulfillment === "delivery" ? config.deliveryFee : 0;
    const discount = 0;
    const total = subtotal + deliveryFee - discount;
    const estimatedMinutes = fulfillment === "delivery" ? 35 : 20;

    return {
      fulfillment,
      items: calculatedItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      currency: config.currency,
      estimatedMinutes
    };
  }
}

export const pricingService = new PricingService();
