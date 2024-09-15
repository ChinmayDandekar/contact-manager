import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import { generateSpamReport } from "../controllers/spam.js";
import { authMiddleware } from "../middlewares/auth.js";
const spamRoutes = Router();
spamRoutes.post('/generate-report', authMiddleware, errorHandler(generateSpamReport));
// spamRoutes.post('/login', errorHandler(login)) 
// spamRoutes.post('/verify', errorHandler(verify)) 
// spamRoutes.post('/resend-otp', errorHandler(resendOtp)) 
// spamRoutes.get('/me', authMiddleware, errorHandler(me)) 
export default spamRoutes;
