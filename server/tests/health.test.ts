import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Health & System API", () => {
  it("1. Health endpoint GET /api/health returns 200 and healthy status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("healthy");
    expect(res.body.data.service).toBe("14th-street-pizza-api");
    expect(res.body.data.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it("27. Unknown API route returns 404 with structured error envelope", async () => {
    const res = await request(app).get("/api/non-existent-endpoint");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.error.message).toContain("does not exist");
  });
});
