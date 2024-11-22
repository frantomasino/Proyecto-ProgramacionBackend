import express from "express";
import { createProduct, deleteProduct, updateProduct } from "../controllers/productController.js"; 

const router = express.Router();

router.post("/", createProduct);

 router.delete("/:id", deleteProduct);

 router.put("/:id", updateProduct); 
export default router;
