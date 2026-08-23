import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { validateBody } from "../middleware/validateRequest";
import { quoteRequestSchema, createOrderSchema } from "../schemas/orderSchemas";

const router = Router();

router.post("/orders/quote", validateBody(quoteRequestSchema), orderController.getQuote.bind(orderController));
router.post("/orders", validateBody(createOrderSchema), orderController.createOrder.bind(orderController));
router.get("/orders/:orderId", orderController.getOrderById.bind(orderController));

export default router;
