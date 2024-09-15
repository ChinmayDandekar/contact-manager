"use client";

import VerifyForm from "@/components/auth/VerifyForm";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

const VerifyPage = () => {
  if (isAuthenticated()) {
    redirect("/");
  }
  return (
    <main className="w-full min-h-full flex flex-col items-center justify-center ">
      <VerifyForm />
    </main>
  );
};

export default VerifyPage;