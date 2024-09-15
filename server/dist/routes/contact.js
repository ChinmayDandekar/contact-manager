import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createContact, getAllContacts, getContacts } from "../controllers/contact.js";
const contactRoutes = Router();
contactRoutes.get('/get-contacts', authMiddleware, errorHandler(getContacts));
contactRoutes.get('/get-all-contacts', authMiddleware, errorHandler(getAllContacts));
contactRoutes.post('/create-contact', authMiddleware, errorHandler(createContact));
export default contactRoutes;
