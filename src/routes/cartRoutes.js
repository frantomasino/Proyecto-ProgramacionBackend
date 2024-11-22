import express from "express";
import CartController from "../controllers/cartController.js";

const router = express.Router();

 router.post("/", CartController.createCart);

 router.post("/add", CartController.addToCart);

 router.post("/purchase", CartController.purchaseCart);

export default router;
