import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Pricing Engine & Order Quote API", () => {
  it("6. Valid quote returns 200", async () => {
    const payload = {
      fulfillment: "delivery",
      items: [
        {
          pizzaId: "ny-tikka-blaster",
          size: "10",
          quantity: 1
        }
      ]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total).toBeGreaterThan(0);
  });

  it("7. Quote calculates correct base price for 10\" (PKR 1199)", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [
        {
          pizzaId: "ny-tikka-blaster",
          size: "10",
          quantity: 1
        }
      ]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.data.subtotal).toBe(1199);
    expect(res.body.data.deliveryFee).toBe(0);
    expect(res.body.data.total).toBe(1199);
  });

  it("8. Quote calculates topping prices correctly (1199 + 180 + 160 = 1539)", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [
        {
          pizzaId: "ny-tikka-blaster",
          size: "10",
          toppings: ["chicken-tikka", "extra-mozzarella"],
          quantity: 1
        }
      ]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.data.subtotal).toBe(1199 + 180 + 160);
    expect(res.body.data.items[0].toppings.length).toBe(2);
  });

  it("9. Quote calculates quantity correctly (unitPrice * quantity)", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [
        {
          pizzaId: "ny-tikka-blaster",
          size: "10",
          quantity: 3
        }
      ]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.data.subtotal).toBe(1199 * 3);
  });

  it("10. Quote calculates delivery fee correctly (PKR 150 for delivery, PKR 0 for pickup)", async () => {
    const deliveryPayload = {
      fulfillment: "delivery",
      items: [{ pizzaId: "side-cheesy-garlic-bread", quantity: 1 }]
    };
    const deliveryRes = await request(app).post("/api/orders/quote").send(deliveryPayload);
    expect(deliveryRes.status).toBe(200);
    expect(deliveryRes.body.data.deliveryFee).toBe(150);
    expect(deliveryRes.body.data.total).toBe(499 + 150);

    const pickupPayload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "side-cheesy-garlic-bread", quantity: 1 }]
    };
    const pickupRes = await request(app).post("/api/orders/quote").send(pickupPayload);
    expect(pickupRes.status).toBe(200);
    expect(pickupRes.body.data.deliveryFee).toBe(0);
    expect(pickupRes.body.data.total).toBe(499);
  });

  it("11. Invalid product is rejected with 404 or 400", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "fake-product-xyz", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("PRODUCT_NOT_FOUND");
  });

  it("12. Invalid size is rejected", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "99-giant-size", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("INVALID_SIZE");
  });

  it("13. Invalid crust is rejected", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", crust: "Chocolate Stuffed Crust", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("INVALID_CRUST");
  });

  it("14. Invalid topping is rejected", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", toppings: ["gold-flakes-topping"], quantity: 1 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("INVALID_TOPPING");
  });

  it("15. Quantity zero is rejected by validation schema", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 0 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("16. Excessive quantity (> 10) is rejected", async () => {
    const payload = {
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 15 }]
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("17. Empty cart is rejected", async () => {
    const payload = {
      fulfillment: "delivery",
      items: []
    };
    const res = await request(app).post("/api/orders/quote").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
