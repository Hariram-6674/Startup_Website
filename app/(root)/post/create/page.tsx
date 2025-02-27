import { auth } from "@/auth";
import CreatePost from "@/components/client_components/CreatePost";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="container !min-h-[250px]">
        <h1 className="heading">Time to pitch your idea!</h1>
      </section>
      <CreatePost/>
    </>
  );
};

export default page;
