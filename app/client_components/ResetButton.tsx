"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";

const ResetButton = () => {
  const reset = () => {
    const select = document.querySelector(".search-form") as HTMLFormElement;
    if (select) select.reset();
  };
  return (
    <Button type="reset" onClick={reset} className="search-btn text-white">
      <Link href={"/"}>
        <X strokeWidth={4} size={60}/>
      </Link>
    </Button>
  );
};

export default ResetButton;
