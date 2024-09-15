"use client";

import { InputOptionType, InputType } from "@/lib/types";
import { FormEvent, useState } from "react";
import CommonInput from "../inputs/CommonInput";
import { useRouter } from "next/navigation";
import PrimaryButton from "../buttons/PrimaryButton";
import Link from "next/link";
import { SignUpSchema } from "@/schema/users";
import { validateFormData } from "@/lib/zod";

const inputOptions: InputOptionType[] = [
  {
    name: "name",
    type: "name",
    label: "Name",
  },
  {
    name: "phone",
    type: "text",
    label: "phone",
  },
  {
    name: "city",
    type: "text",
    label: "City",
  },
  {
    name: "country",
    type: "text",
    label: "Country",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
];

type RegisterFormType = {
  email: string;
  password: string;
  name: string;
  city?: string;
  phone: string;
  country?: string;
};

type RegisterErrorType = Partial<
  Record<keyof RegisterFormType, string> & {
    overalls?: string;
  }
>;

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormType>({
    name: "Test",
    email: "chinmay2001.cd@gmail.com",
    password: "password",
    phone: "9673236657",
  });
  const [errors, setErrors] = useState<RegisterErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = validateFormData(formData, SignUpSchema);
    console.log(data);

    if (!data.valid) {
      setErrors(data.errors!);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        // set token to local storage
        router.push(`/verify-email?email=${formData.email}`);
        setErrors({});
      }

      setErrors({ overalls: data.message });

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name: string, value: InputType) => {
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] bg-white shadow-s rounded-2x p-5 md:p-  flex flex-col gap-2"
    >
      <h1 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">
        Register
      </h1>
      {inputOptions.map((input, index) => (
        <CommonInput
          key={index}
          label={input.label}
          name={input.name}
          onChange={handleOnChange}
          type={input.type}
          value={formData[input.name as keyof RegisterFormType]}
          error={errors[input.name as keyof RegisterErrorType]}
        />
      ))}
      <p className="h-5   text-xs text-red-600 font-medium self-center uppercase text">
        {errors.overalls}
      </p>
      <PrimaryButton className="mb-2" disabled={loading}>
        Submit
      </PrimaryButton>
      <Link
        href={"/login"}
        className="self-center text-sm font-medium underline hover:text-indigo-700"
      >
        Already have an Account? Sign In.
      </Link>
    </form>
  );
};

export default RegisterForm;
