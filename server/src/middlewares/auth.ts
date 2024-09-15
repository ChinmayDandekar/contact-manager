import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../execeptions/unauthorized.js";
import { ErrorCode } from "../execeptions/root.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js";
import { prismaClient } from "../index.js";
import { User } from "@prisma/client";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // extract token from header
    const token = req.headers.authorization


    // if token not present throw an error
    if (!token) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
    }


    try {
        
        // if token present, verify that token and extract paylod
        const payload = jwt.verify(token as string, JWT_SECRET) as any ;
        
        // to get the user from the payload
        const user:User | null = await prismaClient.user.findFirst({ where: { id: payload.userId } }) 
        
        if (!user) {
            return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
        }

        // to attach the user to the current request object
        req.user = user
        return next()


    } catch (error) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
    }



}