import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
                <Button className="max-sm:hidden" variant="link">Create</Button>
                <BadgePlus className="size-6 sm:hidden "/>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo:"/"});
                }}
              >
                <Button type="submit" variant={"link"}>
                  <span className="max-sm:hidden">Log Out</span>
                <LogOut className="size-6 sm:hidden text-red-500"/> 
                </Button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
