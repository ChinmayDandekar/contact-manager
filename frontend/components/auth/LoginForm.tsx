"use client";

import { InputOptionType, InputType } from "@/lib/types";
import { FormEvent, useState } from "react";
import CommonInput from "../inputs/CommonInput";
import { useRouter } from "next/navigation";
import PrimaryButton from "../buttons/PrimaryButton";
import Link from "next/link";

const inputOptions: InputOptionType[] = [
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

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormType>({
    email: "chinmay2001.cd@gmail.com",
    password: "password",
  });
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
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
        window.localStorage.setItem("token", data.token);
        setErrors("");
        router.push("/");
      }

      setErrors(data.message);

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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] bg-white shadow-s rounded-2x p-5 md:p-  flex flex-col gap-2"
    >
      <h1 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">Login</h1>
      {inputOptions.map((input, index) => (
        <CommonInput
          key={index}
          label={input.label}
          name={input.name}
          onChange={handleOnChange}
          type={input.type}
          value={formData[input.name as keyof LoginFormType]}
        />
      ))}
      <p className="h-5   text-xs text-red-600 font-medium self-center uppercase text">{errors}</p>
      <PrimaryButton className="mb-2">Submit</PrimaryButton>
      <Link href={"/register"} className="self-center text-sm font-medium underline hover:text-indigo-700">Don&apos;t have an Account? Sign Up.</Link>
    </form>
  );
};

export default LoginForm;
