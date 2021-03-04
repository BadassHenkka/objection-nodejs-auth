import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';

export class UsernameError extends Error {}
export class LoginError extends Error {}

class AuthService {
  async createUser(username: string, password: string) {
    const userExists = await User.query().findOne({ username });

    if (userExists) {
      throw new UsernameError('Username taken');
    }

    return await User.transaction(async (trx) => {
      const salt = randomBytes(32);
      const hash = await argon2.hash(password, { salt });

      const user = await User.query(trx).insert({
        username: username,
        password: hash,
        salt: salt.toString('hex'),
      });

      return {
        user: {
          id: user.id,
          username: user.username,
        },
        token: this.generateToken(user),
      };
    });
  }

  async loginUser(username: string, password: string) {
    const user = await User.query().findOne({ username });

    if (!user) {
      throw new LoginError('User not found.');
    } else {
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        throw new LoginError('Incorrect credentials.');
      }
    }

    return {
      user: {
        id: user.id,
        username: user.username,
      },
      token: this.generateToken(user),
    };
  }

  private generateToken(user: User) {
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const signature = `${process.env.TOKEN_SIGNATURE}`;
    const expiration = process.env.TOKEN_EXPIRATION;

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  }
}

export default new AuthService();
