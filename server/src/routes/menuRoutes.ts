import { Router } from "express";
import { menuController } from "../controllers/menuController";

const router = Router();

router.get("/menu", menuController.getMenu.bind(menuController));
router.get("/menu/featured", menuController.getFeatured.bind(menuController));
router.get("/pizzas/:id", menuController.getPizzaById.bind(menuController));
router.get("/menu/:id", menuController.getPizzaById.bind(menuController));

export default router;
