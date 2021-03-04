import { Request } from 'express';
const jwt = require('express-jwt');

const getTokenFromHeader = (req: Request) => {
  if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
};

export default jwt({
  secret: process.env.TOKEN_SIGNATURE,
  userProperty: 'token',
  getToken: getTokenFromHeader,
  algorithms: ['HS256'],
});
