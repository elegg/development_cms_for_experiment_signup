import type { CollectionConfig } from 'payload'
import type { Where } from 'payload'

const query: Where = {
  id: {
    equals: '1',
  },
}
export const Participant: CollectionConfig = {

    slug:"participant",
    
    access:{
       read: async ({ req: { user }, data, doc }) => {
        console.log({user})
        let is_passing = user?.id ===14
        console.log(data, doc)
        console.log(user, user?.id, user?.id===14, user?.email.includes("ed"))
        return  {id:{equals:1}} // change to user id
      
      //Boolean(user)
3
    }
},

    fields:[
        {
            type:"text",
            name:"Name"
        },
        {
            relationTo:"contact",
            name:"contact",
            type:"relationship",
            hasMany:false
        },
        /*
        { 
            type:"relationship", 
            name:"slot",
            relationTo:"study_slot",
            hasMany:true
        },*/

            {type:"join", collection:"study_slot", name:"study_slot", on:"participant", maxDepth:3},
            {type:"join", collection:"message_channel", name:"channel", on:"communicators", maxDepth:3}


        //{"type":"join", "name":"study_slot", collection:"participant_study", on:"participant" }

        
    ]
}
