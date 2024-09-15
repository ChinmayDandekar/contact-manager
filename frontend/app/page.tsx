"use client";

import AddContact from "@/components/home/AddContact";
import AllContacts from "@/components/home/AllContacts";
import MaxWidthWrapper from "@/components/utils/MaxWidthWrapper";
import useUser from "@/hooks/useUser";
import { isAuthenticated, logout } from "@/lib/auth";
import Link from "next/link";
import {  useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  if (!isAuthenticated()) {
    return router.push("/login");
  }

  const { user } = useUser()
  const handleLogout = () => {
    logout()
    return router.push("/login");
  }

  return (
    <main className="w-full h-full flex flex-col gap-5 p-5 md:p-10">
      <MaxWidthWrapper className="flex flex-col gap-5">
        {/* headding */}
        <section className="w-full flex items-center justify-between gap-5">
          <h1 className="text-4xl font-bold text-indigo-600 mr-auto">Hello, {user.name} </h1>
          <Link href={"/global-phonebook"} className="text-sm font-bold text-indigo-700 hover:text-indigo-500 underline">Go to Global Phonebook</Link>
          <button  className="text-sm font-bold text-indigo-700 hover:text-indigo-500 underline" onClick={handleLogout}> Log Out</button>
        </section>
        {/* Add Contact */}
        <AddContact />
        {/* All Contacts */}
        <AllContacts />
      </MaxWidthWrapper>
    </main>
  );
}
