"use client";

import { InputOptionType } from "@/lib/types";
import CommonInput from "../inputs/CommonInput";
import PrimaryButton from "../buttons/PrimaryButton";
import { FormEvent, useState } from "react";
import { InputType } from "zlib";
import { fetchProtectedData } from "@/lib/auth";
import { validateFormData } from "@/lib/zod";
import { NewContactSchema } from "@/schema/contact";
import { useContacts } from "@/context/ContactContext";

const inputOptions: InputOptionType[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
  },
];

type ContactFormType = {
  name: string;
  phone: string;
};

type ContactErrorType = Partial<
  Record<keyof ContactFormType, string> & { overalls?: string }
>;

const AddContact = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<ContactErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerFetchContacts } = useContacts();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = validateFormData(formData, NewContactSchema);
    console.log(data);

    if (!data.valid) {
      setErrors(data.errors!);
      setLoading(false);
      return;
    }

    try {
      const res = await fetchProtectedData("/contact/create-contact", "POST", {
        name: formData.name,
        phone: formData.phone,
      });
      if (!res) return setErrors({ overalls: "Error Fetching" });

      const data = await res.json();
      if (res.ok) {
        // redirect verified user to login
        // router.push("/login");
        triggerFetchContacts();
        alert("Contact created");
        setErrors({});
        return;
      }

      alert(data.message);

      setErrors({ overalls: data.message });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (name: string, value: InputType) => {
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  return (
    <section className="w-full h-auto flex flex-col gap-2">
      <div className="text-lg font-bold ">
        <h1 className="text-lg font-bold ">Add Contact:</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {inputOptions.map((input, index) => (
          <CommonInput
            key={index}
            label={input.label}
            name={input.name}
            type={input.type}
            onChange={handleOnChange}
            value={formData[input.name as keyof ContactFormType]}
            error={errors[input.name as keyof ContactErrorType]}
          />
        ))}

        <PrimaryButton className="md:w-max !h-max  self-end md:mb-1">
          Add
        </PrimaryButton>
      </form>
    </section>
  );
};

export default AddContact;
