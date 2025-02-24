import User from "../models/user.model.js";

export default class UserDAO {
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}