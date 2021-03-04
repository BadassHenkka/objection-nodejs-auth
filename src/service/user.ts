import User from '../db/models/user';

class UserService {
  getUser(id: string) {
    return User.query().findById(id);
  }
}

export default new UserService();
