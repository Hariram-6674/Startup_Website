import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 shadow-sm text-black">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/post/create"}>
                <Button variant="link">Create</Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo:"/"});
                }}
              >
                <Button type="submit" variant={"link"}>Log out</Button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button type="submit" variant={"ghost"}>Log in</Button>
              </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
