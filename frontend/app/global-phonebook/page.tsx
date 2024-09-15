"use client";

import GlobalContacts from "@/components/globalphonebook/GlobalContacts";
import AddContact from "@/components/home/AddContact";
import AllContacts from "@/components/home/AllContacts";
import MaxWidthWrapper from "@/components/utils/MaxWidthWrapper";
import useUser from "@/hooks/useUser";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlobalPhoneBookPage() {
  const router = useRouter();
  if (!isAuthenticated()) {
    return router.push("/login");
  }

  const { user } = useUser();

  return (
    <main className="w-full h-full flex flex-col gap-5 p-5 md:p-10">
      <MaxWidthWrapper className="flex flex-col gap-5">
        {/* headding */}
        <section className="w-full flex items-center justify-between">
          <h1 className="text-4xl font-bold text-indigo-600">
            Global Phonebook
          </h1>
          <Link
            href={"/"}
            className="text-sm font-bold text-indigo-700 hover:text-indigo-500 underline"
          >
            Go to Home
          </Link>
        </section>
        {/* Add Contact */}
        {/* <AddContact /> */}

        {/* All Contacts */}
        <GlobalContacts />
      </MaxWidthWrapper>
    </main>
  );
}
