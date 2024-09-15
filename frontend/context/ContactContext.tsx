"use client";

import useContactsHook, { TContact } from "@/hooks/useContactsHook";
import { Children, createContext, useContext } from "react";

type InvoiceFormTypes = {
  contacts: TContact[];
  triggerFetchContacts: () => void;
};

const ContactContext = createContext<InvoiceFormTypes>({
  contacts: [],
  triggerFetchContacts: () => {},
});

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contacts, triggerFetchContacts } = useContactsHook();

  return (
    // return provider using context
    <ContactContext.Provider value={{ contacts, triggerFetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  if (!ContactContext) throw new Error("Context me lafda");
  return useContext(ContactContext);
};
