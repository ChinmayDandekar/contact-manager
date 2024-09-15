import { SpamReportSchema } from "../schema/spamReport.js";
import { BadRequestsException } from "../execeptions/bad-requests.js";
import { ErrorCode } from "../execeptions/root.js";
import { NotFoundException } from "../execeptions/not-found.js";
import { prismaClient } from "../index.js";
export const generateSpamReport = async (req, res, next) => {
    SpamReportSchema.parse(req.body);
    const { phone } = req.body;
    const user = req.user;
    // check if Phone in global database
    let phoneExists = await prismaClient.globalPhoneBook.findFirst({ where: { phone } });
    if (!phoneExists)
        throw new NotFoundException("Phone Number Not In Global Database", ErrorCode.PHONE_NOT_FOUND);
    // check if user already created spam report
    let spamReport = await prismaClient.spamReport.findFirst({ where: { userId: user.id, phone: phone } });
    if (spamReport)
        throw new BadRequestsException("Report Already Exists", ErrorCode.REPORT_ALREADY_EXISTS);
    // add report against the number
    spamReport = await prismaClient.spamReport.create({
        data: {
            phone: phone,
            userId: user.id
        }
    });
    // calculating spam likelyhood
    const spamCount = await prismaClient.spamReport.count({ where: { phone } });
    const totalUsers = await prismaClient.user.count();
    const spamLikelihood = (spamCount / totalUsers) % 100;
    // update spamlikelihood in Global Db
    await prismaClient.globalPhoneBook.updateMany({
        data: {
            spamLikelihood: spamLikelihood
        },
        where: {
            phone: phone
        }
    });
    return res.json(spamReport);
};
