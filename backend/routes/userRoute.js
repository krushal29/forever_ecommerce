import { Router } from "express";
import {AdminUser,signupUser,loginUser,LogOut,userlogin, adminLogout,adminlogin} from '../controllers/userController.js'

const userRouter=Router();
userRouter.post('/signup',signupUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',AdminUser);
userRouter.get('/adminlogout',adminLogout);
userRouter.get('/adminlogin',adminlogin);
userRouter.post('/Logout',LogOut);
userRouter.get('/userlogin',userlogin);

export default userRouter;