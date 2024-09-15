import { Router } from "express";
import {  login, me, resendOtp, signup, verify } from "../controllers/auth.js";
import { errorHandler } from "../error-handler.js";
import { authMiddleware } from "../middlewares/auth.js";

const authRoutes:Router = Router()

authRoutes.post('/signup', errorHandler(signup)) 
authRoutes.post('/login', errorHandler(login)) 
authRoutes.post('/verify', errorHandler(verify)) 
authRoutes.post('/resend-otp', errorHandler(resendOtp)) 
authRoutes.get('/me', authMiddleware, errorHandler(me)) 

export default authRoutes