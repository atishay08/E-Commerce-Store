import express from "express";
import {addToCart} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/",protectRoute,addToCart);
router.get("/",protectRoute,getCartProducts);
router.delete("/",protectRoute,removeAllFromCart);
router.put("/:id",protectRoute,updateQuantity);


export default router;