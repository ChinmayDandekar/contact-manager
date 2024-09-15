import { prismaClient } from "../index.js";
import { NewContactSchema } from "../schema/contact.js";
import { BadRequestsException } from "../execeptions/bad-requests.js";
import { ErrorCode } from "../execeptions/root.js";
export const getContacts = async (req, res, next) => {
    const user = req.user;
    const contacts = await prismaClient.contact.findMany({ where: { userId: user.id } });
    return res.json({ contacts });
};
export const getAllContacts = async (req, res, next) => {
    const user = req.user;
    const contacts = await prismaClient.contact.findMany({ where: {} });
    return res.json({ contacts });
};
export const createContact = async (req, res, next) => {
    console.log(req.body);
    NewContactSchema.parse(req.body);
    const { name, phone } = req.body;
    const user = req.user;
    // check if phone exists for same user
    let contact = await prismaClient.contact.findFirst({ where: { userId: user.id, phone: phone } });
    if (contact) {
        console.log("hello");
        throw new BadRequestsException("Contact Already Exists", ErrorCode.CONTACT_ALREADY_EXISTS);
    }
    contact = await prismaClient.contact.create({
        data: {
            userId: user.id,
            name: name,
            phone: phone,
        }
    });
    // add Contact to global db
    let globalContact = await prismaClient.globalPhoneBook.create({
        data: {
            name: name,
            phone: phone
        }
    });
    return res.json(contact);
};
