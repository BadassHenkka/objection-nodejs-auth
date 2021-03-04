import { Model } from 'objection';

export default class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  salt!: string;

  email?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['username', 'password', 'salt'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 255 },
      password: { type: 'string', minLength: 1, maxLength: 255 },
      salt: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
      createdAt: { type: 'date' },
      updatedAt: { type: 'date' },
    },
  };
}
