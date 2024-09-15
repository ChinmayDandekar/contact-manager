import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../execeptions/bad-requests.js";
import { prismaClient } from "../index.js";
import { ErrorCode } from "../execeptions/root.js";
import { NotFoundException } from "../execeptions/not-found.js";


export const searchByName = async (req:Request , res: Response, next: NextFunction) => {
    
    const { query } = req.query 
    
    const startsWithResults = await prismaClient.globalPhoneBook.findMany({
        where: {
            name: {
                startsWith: query as string,
                mode: "insensitive"
            },
            
        },
        select: {
            name: true,
            phone: true,
            spamLikelihood: true
        }
    });

    const containsWithResults = await prismaClient.globalPhoneBook.findMany({
        where: {
            name: {
                contains: query as string,
                mode: "insensitive"
            },
            NOT: {
                name: {
                  startsWith: query as string,
                  mode: 'insensitive'
                }
              }
            
        },
        
        select: {
            name: true,
            phone: true,
            spamLikelihood: true
        }
    });


    const searchResults = [...startsWithResults, ...containsWithResults]

    return res.json(searchResults);

}

export const searchByPhone = async (req: Request, res: Response, next: NextFunction) => {
    
    const { phone } = req.query
    
    if(typeof phone !== "string" ) throw new BadRequestsException("Invalid Query", ErrorCode.INCORRECT_QUERY)

    const searchResults = await prismaClient.globalPhoneBook.findMany({
        where: {
            phone:phone 
        },
        select: {
            name: true,
            phone: true,
            spamLikelihood: true
        }
    })

    if(searchResults.length == 0) throw new NotFoundException("Contacts not found",ErrorCode.CONTACT_NOT_FOUND)

    return res.json(searchResults)
}
    

export const getDetailsByPhone = async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.params
    const userId = req.user!.id


    // get contact user if registered
    const user = await prismaClient.user.findUnique({
        where: {
            phone: phone
        },
        include: {
            contacts: {
                where: {
                    phone: req.user?.phone
                }
            }
        }
    })
    console.log(user)

    if (user) {
        const isContact = user.contacts.length > 0
        
        return res.json({
            name: user.name,
            phone: user.phone,
            city: user.city,
            country: user.country,
            spamLikelihood: await getSpamLikelihood(user.phone),
            email: isContact ? user.email : null, // Only display email if in contact list
          })
    }

}

const getSpamLikelihood = async (phone: string) => {
    const globalEntry = await prismaClient.globalPhoneBook.findFirst({
      where: { phone:phone },
      select: { spamLikelihood: true }
    });
    
    return globalEntry?.spamLikelihood || 0;
};
  

export const recalculateSpamLikelihoodForAllNumbers = async () => {
    try {
      // Fetch all phone numbers in the global phonebook
      const globalEntries = await prismaClient.globalPhoneBook.findMany({
        select: { phone: true }
      });
  
      // Fetch the total number of registered users
      const totalUsers = await prismaClient.user.count();
  
      // Iterate over each phone number and recalculate the spam likelihood
      for (const entry of globalEntries) {
        const { phone } = entry;
  
        // Count how many spam reports exist for this phone number
        const spamReportsCount = await prismaClient.spamReport.count({
          where: { phone }
        });
  
        // Calculate the new spam likelihood
        const spamLikelihood = (spamReportsCount / totalUsers) % 100;
  
        // Update the spam likelihood in the global phonebook
        await prismaClient.globalPhoneBook.updateMany({
          where: { phone },
          data: { spamLikelihood }
        });
      }
    } catch (error) {
      console.error('Error recalculating spam likelihood:', error);
    }
  };