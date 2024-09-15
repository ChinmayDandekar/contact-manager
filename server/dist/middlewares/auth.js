import { UnauthorizedException } from "../execeptions/unauthorized.js";
import { ErrorCode } from "../execeptions/root.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets.js";
import { prismaClient } from "../index.js";
export const authMiddleware = async (req, res, next) => {
    // extract token from header
    const token = req.headers.authorization;
    // if token not present throw an error
    if (!token) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
    }
    try {
        // if token present, verify that token and extract paylod
        const payload = jwt.verify(token, JWT_SECRET);
        // to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
        }
        // to attach the user to the current request object
        req.user = user;
        return next();
    }
    catch (error) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHRORIZED));
    }
};
