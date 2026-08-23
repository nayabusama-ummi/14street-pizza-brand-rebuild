import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Menu API", () => {
  it("2. Menu endpoint GET /api/menu returns 200", async () => {
    const res = await request(app).get("/api/menu");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("3. Menu returns structured JSON with items and categories", async () => {
    const res = await request(app).get("/api/menu");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.data).toHaveProperty("items");
    expect(res.body.data).toHaveProperty("categories");
    expect(Array.isArray(res.body.data.items)).toBe(true);
    expect(res.body.data.items.length).toBeGreaterThan(5);
  });

  it("Menu supports category filtering (e.g. ?category=pizzas)", async () => {
    const res = await request(app).get("/api/menu?category=pizzas");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const allPizzas = res.body.data.items.every((item: any) => item.category === "pizzas");
    expect(allPizzas).toBe(true);
  });

  it("4. Existing pizza returns 200 with customization options", async () => {
    const res = await request(app).get("/api/pizzas/ny-tikka-blaster");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("ny-tikka-blaster");
    expect(res.body.data.sizes.length).toBe(4);
    expect(res.body.data.toppings.length).toBeGreaterThan(5);
  });

  it("5. Unknown pizza returns 404 Not Found with error envelope", async () => {
    const res = await request(app).get("/api/pizzas/ghost-pizza-999");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("PRODUCT_NOT_FOUND");
  });
});
