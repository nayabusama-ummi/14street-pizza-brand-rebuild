import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Orders API & Server Integrity", () => {
  it("18. Delivery without address is rejected", async () => {
    const payload = {
      customer: {
        name: "Usman Tariq",
        phone: "03001234567"
      },
      fulfillment: "delivery",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("19. Pickup works without address", async () => {
    const payload = {
      customer: {
        name: "Usman Tariq",
        phone: "03001234567"
      },
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.fulfillment).toBe("pickup");
  });

  it("20. Invalid email is rejected", async () => {
    const payload = {
      customer: {
        name: "Usman Tariq",
        phone: "03001234567",
        email: "not-a-valid-email"
      },
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("customer.email");
  });

  it("Customer name with less than 2 characters is rejected", async () => {
    const payload = {
      customer: {
        name: "U",
        phone: "03001234567"
      },
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.error.fields).toHaveProperty("customer.name");
  });

  it("Invalid Pakistani phone format is rejected", async () => {
    const payload = {
      customer: {
        name: "Usman Tariq",
        phone: "12345"
      },
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "10", quantity: 1 }]
    };
    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.error.fields).toHaveProperty("customer.phone");
  });

  it("21. Valid order returns 201 Created and 22. Generates readable orderNumber ST-2026-XXXX", async () => {
    const payload = {
      customer: {
        name: "Ayesha Khan",
        phone: "+923219876543",
        email: "ayesha.khan@example.com"
      },
      fulfillment: "delivery",
      address: {
        address: "Apartment 4B, Sunset Boulevard, Phase 2, DHA",
        city: "Karachi",
        instructions: "Call on arrival"
      },
      items: [
        {
          pizzaId: "manhattan-beef-pepperoni",
          size: "12",
          crust: "Original Pan Crust",
          toppings: ["extra-mozzarella"],
          quantity: 2
        },
        {
          pizzaId: "drink-soft-drink-1500ml",
          quantity: 1
        }
      ],
      paymentMethod: "cash-on-delivery"
    };

    const res = await request(app).post("/api/orders").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toMatch(/^ord_/);
    expect(res.body.data.orderNumber).toMatch(/^ST-2026-\d+$/);
    expect(res.body.data.status).toBe("received");
    expect(res.body.data.subtotal).toBe(3718 + 280);
    expect(res.body.data.deliveryFee).toBe(150);
    expect(res.body.data.total).toBe(3998 + 150);
  });

  it("23. Server recalculates order total and 24. Fake client price/total cannot tamper backend total", async () => {
    const maliciousPayload = {
      customer: {
        name: "Hacker Client",
        phone: "03331112233"
      },
      fulfillment: "pickup",
      price: 1,
      subtotal: 10,
      total: 10,
      items: [
        {
          pizzaId: "soho-four-cheese-melt",
          size: "20",
          quantity: 1,
          price: 5,
          itemTotal: 5
        }
      ]
    };

    const res = await request(app).post("/api/orders").send(maliciousPayload);
    expect(res.status).toBe(201);
    expect(res.body.data.subtotal).toBe(3399);
    expect(res.body.data.total).toBe(3399);
    expect(res.body.data.items[0].unitPrice).toBe(3399);
  });

  it("25. Existing order can be retrieved by ID and by public Order Number", async () => {
    const createRes = await request(app).post("/api/orders").send({
      customer: { name: "Bilal Sheikh", phone: "03450001122" },
      fulfillment: "pickup",
      items: [{ pizzaId: "side-peri-peri-wings", quantity: 2 }]
    });
    const order = createRes.body.data;

    const fetchByIdRes = await request(app).get(`/api/orders/${order.id}`);
    expect(fetchByIdRes.status).toBe(200);
    expect(fetchByIdRes.body.data.id).toBe(order.id);
    expect(fetchByIdRes.body.data.customer.name).toBe("Bilal Sheikh");

    const fetchByNumRes = await request(app).get(`/api/orders/${order.orderNumber}`);
    expect(fetchByNumRes.status).toBe(200);
    expect(fetchByNumRes.body.data.id).toBe(order.id);
  });

  it("26. Unknown order returns 404 Not Found", async () => {
    const res = await request(app).get("/api/orders/ord_ghost_non_existent");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("ORDER_NOT_FOUND");
  });

  it("27. Phone numbers with hyphens and spaces are valid", async () => {
    const payloadWithHyphen = {
      customer: { name: "Zubair Ahmed", phone: "0300-1234567" },
      fulfillment: "pickup",
      items: [{ pizzaId: "side-cheesy-garlic-bread", quantity: 1 }]
    };
    const res1 = await request(app).post("/api/orders").send(payloadWithHyphen);
    expect(res1.status).toBe(201);

    const payloadWithSpace = {
      customer: { name: "Zubair Ahmed", phone: "0321 7654321" },
      fulfillment: "pickup",
      items: [{ pizzaId: "side-cheesy-garlic-bread", quantity: 1 }]
    };
    const res2 = await request(app).post("/api/orders").send(payloadWithSpace);
    expect(res2.status).toBe(201);
  });

  it("28. Quote calculates delivery fee (150) for delivery and zero (0) for pickup", async () => {
    const deliveryQuote = await request(app).post("/api/orders/quote").send({
      fulfillment: "delivery",
      items: [{ pizzaId: "ny-tikka-blaster", size: "15", quantity: 1 }]
    });
    expect(deliveryQuote.status).toBe(200);
    expect(deliveryQuote.body.data.deliveryFee).toBe(150);
    expect(deliveryQuote.body.data.total).toBe(deliveryQuote.body.data.subtotal + 150);

    const pickupQuote = await request(app).post("/api/orders/quote").send({
      fulfillment: "pickup",
      items: [{ pizzaId: "ny-tikka-blaster", size: "15", quantity: 1 }]
    });
    expect(pickupQuote.status).toBe(200);
    expect(pickupQuote.body.data.deliveryFee).toBe(0);
    expect(pickupQuote.body.data.total).toBe(pickupQuote.body.data.subtotal);
  });
});
