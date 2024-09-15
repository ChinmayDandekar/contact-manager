import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { getDetailsByPhone, searchByName, searchByPhone } from "../controllers/search.js";
import { errorHandler } from "../error-handler.js";
export const searchRoutes = Router();
searchRoutes.get("/name", authMiddleware, errorHandler(searchByName));
searchRoutes.get("/phone", authMiddleware, errorHandler(searchByPhone));
searchRoutes.get("/:phone", authMiddleware, errorHandler(getDetailsByPhone));
