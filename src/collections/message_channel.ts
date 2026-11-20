/*

Connects message to participant and experiment

*/


import type { CollectionConfig } from 'payload'

export const MessageChannel: CollectionConfig = {


    slug:"message_channel",
    fields:[
        {
            type:"relationship", relationTo:["researcher", "participant"], name:"communicators", hasMany:true
        }, 
         {
            type:"relationship", relationTo:"message", name:"messages", hasMany:true
        }, 
        
        
        
    ]
}