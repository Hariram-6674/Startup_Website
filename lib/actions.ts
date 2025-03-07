"use server";

import { auth } from "@/auth";
import { parseAction } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPost = async(state:any, form:FormData, pitch:string) => {
    const session =await auth();
    if(!session) return parseAction({error:"Not Signed in",status:"ERROR"});
    const {title,description,category,link} = Object.fromEntries(
        Array.from(form).filter(([keys]) => keys != "pitch"),
    );
    const slug = slugify(title as string,{lower:true,strict:true});
    try {
        const startup = {
            title,
            description,
            image:link,
            category,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:"reference",
                _ref:session?.id
            },
            pitch
        };
        const result = await writeClient.create({_type:"startup",...startup});
        return parseAction({...result,error:"",status:"SUCCESS"});
    } catch (error) {
        console.log(error);
        return parseAction({error:JSON.stringify(error),status:"ERROR"});
    }
};

export const deletePost = async(id:string) => {
    try {
        await writeClient.delete(id);
        return { success: true };
      } catch (error) {
        console.error("Delete error:", error);
        return { success: false, error: "Failed to delete the document" };
      }
};
