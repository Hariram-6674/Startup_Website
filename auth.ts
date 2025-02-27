import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AuthorAuth } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user:{name,email,image},profile:{id,login,bio}}) {
      const existing = await client.withConfig({useCdn:false}).fetch(AuthorAuth,{id});
      if(!existing){
        await writeClient.create({
          _type:"author",
          id,
          name,
          username:login,
          email,
          image,
          bio:bio ||" ",
        });
      }
      return true;
    },
    async jwt({token,account,profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn:false}).fetch(AuthorAuth,{id:profile?.id});
        token.id = user?._id;
      }
      return token;
    },
    async session({session,token}){
      Object.assign(session,{id:token.id});
      return session;
    }
  }
});