"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  if (isAuthenticated()) {
    redirect("/");
  }
  return (
    <main className="w-full min-h-full flex flex-col items-center justify-center ">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
