import { Router } from "express";
import { AdminUser, signupUser, loginUser, LogOut, userlogin, adminLogout, adminlogin } from '../controllers/userController.js';
import { authUser, authAdmin } from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', AdminUser);
userRouter.get('/adminlogout', adminLogout);
userRouter.get('/adminlogin', authAdmin, adminlogin);
userRouter.post('/Logout', authUser, LogOut);
userRouter.get('/userlogin', authUser, userlogin);

export default userRouter;