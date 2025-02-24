import CartDAO from "../daos/CartDAO.js";

export default class CartRepository {
  constructor() {
    this.dao = new CartDAO();
  }
  async getCartById(id) {
    return await this.dao.getCartById(id);
  }
}
