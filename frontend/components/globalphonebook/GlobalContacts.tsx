"use client";

import { TContact } from "@/hooks/useContactsHook";
import { fetchProtectedData } from "@/lib/auth";
import { useEffect, useState } from "react";
import DialogBox from "../dialog/DialogBox";
import { SearchBar } from "./SearchBar";
import { GlobalContact } from "./GlobalContact";

export type TGlobalContact = TContact & {
  spamLikelihood: string;
};

// {
//     "name": "Test",
//     "phoneNumber": "9673236657",
//     "city": null,
//     "country": null,
//     "spamLikelihood": 0.25,
//     "email": null
// }

type DetailsBoxProps = {
  isOpen: boolean;
  toggleIsOpen: (phone: string) => void;
  phone: string;
  handleSpam: (phone: string) => void;
};
type TContactDetails = {
  name?: string;
  phone?: string;
  city?: string;
  country?: string;
  spamLikelihood?: string;
  email?: string;
};

const DetailsBox = ({
  isOpen,
  toggleIsOpen,
  phone,
  handleSpam,
}: DetailsBoxProps) => {
  const [details, setDetails] = useState<TContactDetails>({});
  const handleGetDetails = async (phone: string) => {
    try {
      const res = await fetchProtectedData(`/search/${phone}`, "GET");

      if (!res) return;
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setDetails(data);
      } else alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (phone == "") return;
    handleGetDetails(phone);
  }, [isOpen]);
  return (
    <DialogBox isOpen={isOpen}>
      <section
        className="w-full max-w-[500px] bg-white rounded-xl p-10 flex flex-col gap-2"
        onClick={() => toggleIsOpen("")}
      >
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">
          {details.name}
        </h1>

        {details.city && (
          <div className="w-full flex items-center justify-between">
            <h2 className="text-base font-bold text-black">City:</h2>
            <h2 className="text-base font-bold text-black">{details.city}</h2>
          </div>
        )}
        <div className="w-full flex items-center justify-between">
          <h2 className="text-base font-bold text-black">Phone:</h2>
          <h2 className="text-base font-bold text-black">{details.phone}</h2>
        </div>
        {details.country && (
          <div className="w-full flex items-center justify-between">
            <h2 className="text-base font-bold text-black">Country:</h2>
            <h2 className="text-base font-bold text-black">
              {details.country}
            </h2>
          </div>
        )}
        <div className="w-full flex items-center justify-between">
          <h2 className="text-base font-bold text-black">Spam Likelihood:</h2>
          <h2 className="text-base font-bold text-black">
            {details.spamLikelihood}
          </h2>
        </div>
        {details.email && (
          <div className="w-full flex items-center justify-between">
            <h2 className="text-base font-bold text-black">Email:</h2>
            <h2 className="text-base font-bold text-black">{details.email}</h2>
          </div>
        )}

        <button
          onClick={() => handleSpam(phone)}
          className="bg-red-500 px-5 py-2 text-xs rounded-xl text-white font-bold active:bg-red-900 mt-5"
        >
          Spam
        </button>
      </section>
    </DialogBox>
  );
};

const GlobalContacts = () => {
  const [contacts, setContacts] = useState<TGlobalContact[]>([]);
  const [searchMethod, setSearchMethod] = useState<"name" | "phone">("name");
  const [searchText, setSearchText] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [selectedPhone, setSelectPhone] = useState<string>("");

  const handleMarkSpam = async (phone: string) => {
    try {
      const res = await fetchProtectedData(`/spam/generate-report`, "POST", {
        phone: phone,
      });

      if (!res) return;
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        await handleSearch();
        alert("Spam report Generated");
      } else alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const url =
        searchMethod == "name"
          ? `/search/name?query=${searchText}`
          : `/search/phone?phone=${searchText}`;
      const res = await fetchProtectedData(url, "GET");

      if (!res) return;
      const data = await res.json();
      setContacts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const changeMethod = (value: "name" | "phone") => setSearchMethod(value);
  const toggleDetails = (phone = "") => {
    if (phone != "") setSelectPhone(phone);
    setIsDetailsOpen((prev) => !prev);
  };

  useEffect(
    () => console.log(searchMethod, searchText),
    [searchMethod, searchText]
  );

  return (
    <section className="w-full h-auto flex flex-col gap-5">
      {/* Dialog box */}
      <DetailsBox
        isOpen={isDetailsOpen}
        toggleIsOpen={toggleDetails}
        handleSpam={handleMarkSpam}
        phone={selectedPhone}
      />
      {/* Search Bar */}
      <SearchBar
        onClick={handleSearch}
        changeMethod={changeMethod}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {contacts.length > 0 && (
        <div className="w-full h-auto flex flex-col gap-2">
          <div className="text-lg font-bold ">
            <h1 className="text-lg font-bold ">Search Results:</h1>
          </div>

          <div className="flex flex-col gap-2">
            {contacts.map((contact, index) => (
              <GlobalContact
                key={index}
                contact={contact}
                id={index + 1}
                toggleDetails={toggleDetails}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GlobalContacts;
