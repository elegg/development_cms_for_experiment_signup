import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {


    slug:"message",
    fields:[
        {
            type:"text",
            name:"text"

        }, 
        {
            type:"relationship", relationTo:["participant", "researcher"], name:"author",
        }, 
        {
            type:"relationship", relationTo:"message_channel", name:"channel",
        }, 

        
    ]
}