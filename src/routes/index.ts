import express from 'express';
import AuthController from '../controller/auth';
import UserController from '../controller/user';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const router = express.Router();

router.post('/api/register', AuthController.register);
router.post('/api/login', AuthController.login);
router.get('/api/user/:id', isAuth, attachCurrentUser, UserController.getUser);

export default router;
