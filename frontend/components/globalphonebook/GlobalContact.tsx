import { TGlobalContact } from "./GlobalContacts";

type GlobalContactProps = {
    contact: TGlobalContact;
    id: number;
    toggleDetails: (phone: string) => void;
  };
  
  export const GlobalContact = ({ contact, id,toggleDetails }: GlobalContactProps) => {
    return (
      <div
        onClick={() => toggleDetails(contact.phone)}
        className="w-full flex gap-2 items-center justify-between rounded-xl px-4 py-4 border border-gray-300 border-solid bg-white shadow-sm hover:shadow-lg cursor-pointer"
      >
        <h1 className="text-sm text-black font-bold">{id}.</h1>
        <div className=" flex flex-col sm:flex-row sm:gap-2 mr-auto">
          <span className="text-xs sm:text-sm font-bold text-black">Name:</span>
          <h3 className="text-sm text-indigo-700 font-bold ">{contact.name}</h3>
        </div>
        <div className=" flex flex-col sm:flex-row sm:gap-2 mr-[10%] ">
          <span className="text-xs sm:text-sm font-bold text-black">Phone:</span>
          <h3 className="text-sm text-indigo-700 font-bold ">{contact.phone}</h3>
        </div>
        <div className="w-[170px] flex flex-col sm:flex-row sm:gap-2 ">
          <span className="text-xs sm:text-sm font-bold text-black">
            Spam Likelihood:
          </span>
          <h3 className="text-sm text-indigo-700 font-bold self-center">
            {contact.spamLikelihood}
          </h3>
        </div>
       
      </div>
    );
  };