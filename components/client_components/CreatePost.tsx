"use client";
import React, { useActionState, useState } from "react";
import InputField from "../ui/InputField";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions";

const CreatePost = () => {
  const [errors,setError] = useState<Record<string,string>>({});
  const [pitch, setPitch] = useState<string>("");
  const router = useRouter();
  const handlePitchChange = (newPitch: string) => {
    setPitch(newPitch);
  };
  const handleFormSubmit = async (prevState:any,formData:FormData) =>{
    try {
      const formValues = {
        title:formData.get("title") as string,
        description:formData.get("description") as string,
        category:formData.get("category") as string,
        link:formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);
      const result = await createPost(prevState,formData,pitch);
      if (result.status == "SUCCESS"){
        toast.success("Successfully submitted");
      router.push(`/post/${result?._id}`);
      }
      return result;
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string,string>);
        toast.error("Check Inputs again");
        return { ...prevState,error:"Validation failed",status:"ERROR"};
      }
      toast.error("An unexpected error");
      return {...prevState,error:"An unexpected error",status:"ERROR"};
    } finally {

    }
  };
  const [state,formAction,isPending] = useActionState(handleFormSubmit,{error:"",status:"INITIAL"});
  return (
    <form action={formAction} className="startup-form">
      <InputField label="Title" id="title" name="title" required={true} error={errors.title} placeholder="Name of your Startup" type="input"/>
      <InputField label="Description" id="description" name="description" required={true} error={errors.description} placeholder="Set the scene" type="textarea"/>
      <InputField label="Category" id="category" name="category" required={true} error={errors.category} placeholder="(Technology, Education, HealthCare, etc.)" type="input"/>
      <InputField label="Image URL" id="link" name="link" required={true} error={errors.link} placeholder="Add a snapshot of your startup" type="input"/>
      <InputField label="Pitch" id="pitch" name="pitch" required={true} error={errors.pitch} placeholder="What makes your startup a game-changer?" type="" onChange={(e) => handlePitchChange(e.target.value)}/>
      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending? <div className="w-9 h-9 border-4 border-white border-l-transparent rounded-full animate-spin"></div> :<p>Submit your Idea<Send className="size-8 ml-2 inline-block"/></p>}
      </Button>
    </form>
  );
};

export default CreatePost;
