import ProductDAO from "../daos/ProductDAO.js";

export default class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }
  async getAllProducts() {
    return await this.dao.getAll();
  }
  async getProductById(id) {
    return await this.dao.getById(id);
  }
}