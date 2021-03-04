import { Request, Response } from 'express';
import AuthService, { UsernameError, LoginError } from '../service/auth';

class AuthController {
  async register(req: Request, res: Response) {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json('Incorrect form submission');
    } else
      try {
        const { user, token } = await AuthService.createUser(name, password);
        res.json({ user, token });
      } catch (err) {
        console.error(err);
        if (err instanceof UsernameError) {
          res.status(400).json(err.message);
        } else {
          res.status(500).json(err);
        }
      }
  }

  async login(req: Request, res: Response) {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json('Incorrect form submission');
    } else
      try {
        const { user, token } = await AuthService.loginUser(name, password);
        res.json({ user, token });
      } catch (err) {
        console.error(err);
        if (err instanceof LoginError) {
          res.status(400).json(err.message);
        } else {
          res.status(500).json(err);
        }
      }
  }
}

export default new AuthController();
