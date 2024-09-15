import express from "express";
import { PORT } from "./secrets.js";
import rootRouter from "./routes/index.js";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors.js";
import cors from 'cors';
const app = express();
// {
//     origin: ['http://www.localhost:3000'],
//     optionsSuccessStatus: 200,
//     po
// }
// Cors Middleware
app.use(cors());
// Parse Request Body
app.use(express.json());
app.use('/api', rootRouter);
export const prismaClient = new PrismaClient({
    log: ['query']
});
app.use(errorMiddleware);
app.listen(PORT, () => console.log('Server listening'));
