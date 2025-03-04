import { Router } from 'express';
import UserController from "../controllers/userController.js";
const userRouter = Router();

// Register a new user
userRouter.post('/register', UserController.register);

// Login user
userRouter.post('/login', UserController.login);

export default userRouter;
