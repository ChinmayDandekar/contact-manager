import { NextFunction, Request,Response } from "express"
import { prismaClient } from "../index.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { CLIENT_BASE_URL, EMAIL_PASS, EMAIL_USER, JWT_SECRET } from "../secrets.js";
import { BadRequestsException } from "../execeptions/bad-requests.js";
import { ErrorCode } from "../execeptions/root.js";
import { SignUpSchema, VerifySchema } from "../schema/users.js";
import { NotFoundException } from "../execeptions/not-found.js";
import nodemailer from "nodemailer"
import { UnauthorizedException } from "../execeptions/unauthorized.js";
import { recalculateSpamLikelihoodForAllNumbers } from "./search.js";


// Sign UP
export const signup = async (req:Request, res:Response, next: NextFunction) => {
    
    SignUpSchema.parse(req.body)
    const { email, password, name, phone, city, country } = req.body;


    let user = await prismaClient.user.findFirst({ where: { email: email } })
    
    if (user) {
        throw new BadRequestsException("User already Exists!", ErrorCode.USER_ALREADY_EXISTS);
    };

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Set OTP expiry to 10 minutes
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    
    
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            city,
            country,
            phone,
            password: hashSync(password, 10),
            otp: otp,
            otpExpiry: otpExpiry,
        }
    });
    
    // generate verify token and send it to users email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })


    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Verify your account with OTP',
        html: `<h1>Verify Link</h1></br><a href="${CLIENT_BASE_URL}/verify-email?email=${email}">Click here to Verify</a></br><p>Your OTP is: <b>${otp}</b></p> </br>`,
    };
    
    await transporter.sendMail(mailOptions)

    res.json(user)
   
    
}


// Verify Email
export const verify = async (req: Request, res: Response, next: NextFunction) => {

    VerifySchema.parse(req.body)

    const {email, otp} = req.body
    
    // fetch user
    const user = await prismaClient.user.findFirst({where: {otp:otp, email:email, otpExpiry:{gt: new Date()}}})

    if (!user) {
     throw new BadRequestsException("Invalid or Expired Otp", ErrorCode.INVALID_OTP)
    }
    

    const updatedUser = await prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            isVerified: true,
            otp: null,
            otpExpiry: null
        }
    })

    // Add Verfied User Details to Global db
    let globalContact = await prismaClient.globalPhoneBook.create({
        data: {
            name: user.name,
            phone: user.phone,
            city: user.city,
            country: user.country,
            isUser: true,
        }
    })
    
    await recalculateSpamLikelihoodForAllNumbers()


    res.json({user})
}


// Login
export const login = async (req:Request, res:Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email: email } })

    
    if (!user) {
        throw new NotFoundException("User not found",ErrorCode.USER_NOT_FOUND)
    }
    if (!user.isVerified) {
        throw new UnauthorizedException("Email Not Verified", ErrorCode.UNAUTHRORIZED)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect Password", ErrorCode.INCORRECT_PASSWORD)
    }

    const token = jwt.sign({ userId: user.id } , JWT_SECRET);

    res.json({user, token})
}


// Get Current User
export const me = async (req:Request, res:Response, next: NextFunction) => {
    
    const formattedUser = {
        name: req.user?.name,
        email: req.user?.email,
        city: req.user?.city,
        country: req.user?.country,
        phone: req.user?.phone,
    }
    res.json(formattedUser)
}



// Resend otp
export const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await prismaClient.user.findFirst({ where: { email: email } })
    
    if (!user) {
        throw new BadRequestsException("Invalid Email", ErrorCode.INCORRECT_EMAIL)
    }

     // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Set OTP expiry to 10 minutes
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    
    // generate verify token and send it to users email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Verify your account with OTP',
        html: `<p>Your OTP is: <b>${otp}</b></p>`,
    };
    
    await transporter.sendMail(mailOptions)
    const updatedUser = await prismaClient.user.update({
        where: {
            email: email
        },
        data: {
            isVerified: false,
            otp: otp,
            otpExpiry: otpExpiry
        }
    })


    return res.json({
        message: "Otp Resend Successfully"
    });
}