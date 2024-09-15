import { fetchProtectedData } from "@/lib/auth";
import { useEffect, useState } from "react";

export type TContact = {
  name: string;
  phone: string;
};



const useContactsHook = () => {
  const [contacts, setContacts] = useState<TContact[]>([]);
  const [fetchContacts, triggerFetch] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetchProtectedData("/contact/get-contacts", "GET");
      if (!res) return;
      const data = await res.json();
      setContacts([...data.contacts]);
    };

    fetchContacts();
  }, [fetchContacts]);

  const triggerFetchContacts = () => {
    triggerFetch((prev) => prev + 1);
    return;
  };

  return { contacts, triggerFetchContacts };
};

export default useContactsHook;
