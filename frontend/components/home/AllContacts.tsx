"use client";

import { useContacts } from "@/context/ContactContext";
import  { TContact } from "@/hooks/useContactsHook";

const Contact = ({ contact, id }: { contact: TContact; id: number }) => {
  return (
    <div className="w-full flex gap-2 items-center justify-between rounded-xl px-4 py-4 border border-gray-300 border-solid bg-white shadow-sm">
      <h1 className="text-sm text-black font-bold">{id}.</h1>
      <div className=" flex flex-col sm:flex-row sm:gap-2 mr-auto">
        <span className="text-xs sm:text-sm font-bold text-black">Name:</span>
        <h3 className="text-sm text-indigo-700 font-bold ">{contact.name}</h3>
      </div>
      <div className=" flex flex-col sm:flex-row sm:gap-2 ">
        <span className="text-xs sm:text-sm font-bold text-black">Phone:</span>
        <h3 className="text-sm text-indigo-700 font-bold ">{contact.phone}</h3>
      </div>
    </div>
  );
};

const AllContacts = () => {
  const { contacts } = useContacts();
  console.log(contacts);
  return (
    <section className="w-full h-auto flex flex-col gap-2">
      <div className="text-lg font-bold ">
        <h1 className="text-lg font-bold ">Your Contacts:</h1>
      </div>
      <div className="flex flex-col gap-2">
        {contacts.map((contact, index) => (
          <Contact key={index} contact={contact} id={index + 1} />
        ))}
      </div>
    </section>
  );
};

export default AllContacts;
