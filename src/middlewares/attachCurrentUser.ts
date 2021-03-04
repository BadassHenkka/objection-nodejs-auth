import { Request, Response, NextFunction } from 'express';
import User from '../db/models/user';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedUser = req.token.data;
    const { id, username, email } = await User.query().findOne({
      id: decodedUser.id,
    });
    if (!username) {
      res.status(401).end();
    }
    req.currentUser = { id, username, email };
    return next();
  } catch (e) {
    return res.status(500).json(e);
  }
};
