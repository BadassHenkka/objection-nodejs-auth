import express from 'express';
import UserService from '../service/user';

class UserController {
  async getUser(req: express.Request, res: express.Response) {
    try {
      const user = await UserService.getUser(req.params.id);
      const { id, username, email } = user;
      res.json({
        id,
        username,
        email,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

export default new UserController();
