"use client";

import LoginForm from "@/components/auth/LoginForm";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  if (isAuthenticated()) {
    redirect("/");
  }
  return (
    <main className="w-full min-h-full flex flex-col items-center justify-center ">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
