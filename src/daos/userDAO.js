import User from '../models/User.js';

class UserDAO {
  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default new UserDAO();
