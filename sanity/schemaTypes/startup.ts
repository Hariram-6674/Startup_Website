import { defineField, defineType } from "sanity";

export const startup = defineType({
    name:"startup",
    title:"Startup",
    type:"document",
    fields:[
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"title"
            }
        })
    ]
})