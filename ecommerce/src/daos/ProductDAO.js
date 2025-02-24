import Product from "../models/product.model.js";

export default class ProductDAO {
  async getAll() {
    return await Product.find();
  }
  async getById(id) {
    return await Product.findById(id);
  }
  async updateStock(id, quantity) {
    return await Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } }, { new: true });
  }
}
