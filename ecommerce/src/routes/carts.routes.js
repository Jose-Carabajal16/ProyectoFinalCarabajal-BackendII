// src/routes/cartsRouter.js
import { Router } from "express";
import Ticket from "../models/ticket.model.js";
import CartRepository from "../repositories/CartRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";

const router = Router();
const cartService = new CartRepository();
const productService = new ProductRepository();


router.post("/:cid/purchase", async (req, res) => {
  try {

    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
    }

    let total = 0;
    let productosNoComprados = [];

    for (let item of cart.products) {
      const product = await productService.getProductById(item.product._id);
      if (!product) {
        productosNoComprados.push(item.product._id);
        continue; 
      }

      if (product.stock >= item.quantity) {

        await productService.dao.updateStock(item.product._id, item.quantity);
        total += product.price * item.quantity; 
      } else {

        productosNoComprados.push(item.product._id);
      }
    }

    //ticket de compra
    const ticket = await Ticket.create({
      amount: total,
      purchaser: req.user.email,
    });


    cart.products = cart.products.filter(
      (p) => !productosNoComprados.includes(p.product._id)
    );
    await cart.save(); 


    res.json({ ticket, productosNoComprados });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
