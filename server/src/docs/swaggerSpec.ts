export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "14th Street Pizza API — Concept Rebuild",
    version: "1.0.0",
    description: "Backend REST API for 14th Street Pizza concept ordering experience. Features server-authoritative pricing validation, Zod schemas, catalog discovery, and order management.",
    contact: {
      name: "14th Street Pizza Engineering Team"
    }
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Development Server"
    }
  ],
  tags: [
    { name: "Health", description: "API health and uptime monitoring" },
    { name: "Menu", description: "Catalog discovery and pizza customization options" },
    { name: "Orders", description: "Authoritative pricing quote, order placement, and status lookup" }
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Check API service status",
        description: "Returns uptime, server timestamp, and environment status.",
        responses: {
          "200": {
            description: "API is healthy",
            content: {
              "application/json": {
                example: {
                  success: true,
                  data: {
                    status: "healthy",
                    service: "14th-street-pizza-api",
                    version: "1.0.0",
                    timestamp: "2026-08-22T22:40:00.000Z",
                    uptimeSeconds: 120,
                    environment: "development"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/menu": {
      get: {
        tags: ["Menu"],
        summary: "Retrieve menu items and categories",
        description: "Fetch all available pizzas, build-your-own options, deals, sides, drinks, and desserts. Supports filtering by category.",
        parameters: [
          {
            name: "category",
            in: "query",
            description: "Filter by category: 'pizzas', 'build-your-own', 'deals', 'sides', 'drinks', 'desserts'",
            required: false,
            schema: {
              type: "string",
              enum: ["pizzas", "build-your-own", "deals", "sides", "drinks", "desserts"]
            }
          }
        ],
        responses: {
          "200": {
            description: "Menu retrieved successfully"
          }
        }
      }
    },
    "/api/pizzas/{id}": {
      get: {
        tags: ["Menu"],
        summary: "Get specific pizza/item customization details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Product ID (e.g., 'ny-tikka-blaster', 'build-your-own-pizza')",
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Product details returned successfully" },
          "404": { description: "Product not found" }
        }
      }
    },
    "/api/orders/quote": {
      post: {
        tags: ["Orders"],
        summary: "Calculate authoritative server-side price quote",
        description: "Validates customer's cart configuration, sizes, crusts, sauces, and toppings against server menu data and calculates accurate subtotal, delivery fee, and total.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                fulfillment: "delivery",
                items: [
                  {
                    pizzaId: "ny-tikka-blaster",
                    size: "15",
                    crust: "Original Pan Crust",
                    sauce: "marinara",
                    toppings: ["extra-mozzarella", "jalapenos"],
                    quantity: 1
                  }
                ]
              }
            }
          }
        },
        responses: {
          "200": { description: "Authoritative quote generated" },
          "400": { description: "Validation error or invalid configuration" }
        }
      }
    },
    "/api/orders": {
      post: {
        tags: ["Orders"],
        summary: "Create a new food order",
        description: "Validates customer details, delivery address, cart contents, and independently re-calculates server pricing before generating an order.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                customer: {
                  name: "Ahmed Ali",
                  phone: "03001234567",
                  email: "ahmed@example.com"
                },
                fulfillment: "delivery",
                address: {
                  address: "House 42, Street 7, Block 4, Clifton",
                  city: "Karachi",
                  instructions: "Ring doorbell twice"
                },
                items: [
                  {
                    pizzaId: "ny-tikka-blaster",
                    size: "15",
                    crust: "Original Pan Crust",
                    sauce: "marinara",
                    toppings: ["extra-mozzarella"],
                    quantity: 1
                  }
                ],
                paymentMethod: "cash-on-delivery"
              }
            }
          }
        },
        responses: {
          "201": { description: "Order placed successfully" },
          "400": { description: "Validation error or missing delivery address" }
        }
      }
    },
    "/api/orders/{orderId}": {
      get: {
        tags: ["Orders"],
        summary: "Retrieve order details and status by ID or Order Number",
        parameters: [
          {
            name: "orderId",
            in: "path",
            required: true,
            description: "Order ID (e.g. 'ord_ks892_f91') or public Order Number (e.g. 'ST-2026-1042')",
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Order details returned successfully" },
          "404": { description: "Order not found" }
        }
      }
    }
  }
};
