import Cart from "../models/cart.model.js";

export default class CartDAO {
  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }
  async updateCart(id, products) {
    return await Cart.findByIdAndUpdate(id, { products }, { new: true });
  }
}