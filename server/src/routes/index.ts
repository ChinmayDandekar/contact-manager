import { Router } from "express";
import authRoutes from "./auth.js";
import contactRoutes from "./contact.js";
import spamRoutes from "./spam.js";
import { searchRoutes } from "./search.js";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/contact', contactRoutes)
rootRouter.use('/spam', spamRoutes)
rootRouter.use('/search', searchRoutes)


export default rootRouter