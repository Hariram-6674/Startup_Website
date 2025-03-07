"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions";

const ResetButton = () => {
  const reset = () => {
    const select = document.querySelector(".search-form") as HTMLFormElement;
    if (select) select.reset();
  };
  return (
    <>
      <Button type="reset" onClick={reset} className="search-btn text-white">
        <Link href={"/"}>
          <X strokeWidth={4} size={60} />
        </Link>
      </Button>
    </>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const result = await deletePost(id);
    if (result.success) {
      toast.info("Deleted Successfully");
      redirect("/");
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="hover:bg-red-400 bg-red-500 text-white fixed bottom-14 right-6 py-2 px-10 rounded-lg ">
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              startup.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="hover:bg-red-600 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResetButton;
