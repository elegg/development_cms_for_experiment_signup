import type { CollectionConfig } from 'payload'

export const Researcher: CollectionConfig = {
  slug: 'researcher',
   /*auth: {
    loginWithUsername: {
      allowEmailLogin: true, // default: false
      requireEmail: false, // default: false
    },
},*/
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'firstname',
      type: 'text',
    },
    {
      name: 'surname',
      type: 'text',
    },
    {
        name:"type",
        type:"select", 
        options:[
            {label:"student", value:"STUDENT"},
            {label:"staff", value:"STAFF"},
            {label:"visitor", value:"EXTERNAL"}
 
        ]
    }, 
    {
        name:"contact",
        type:"relationship",
        relationTo:"contact",
        hasMany:false
    },
  
    {type:"join", collection:"experiment_researcher", name:"experiment", on:"researcher", maxDepth:2},
                {type:"join", collection:"message_channel", name:"channel", on:"communicators", maxDepth:3}


  ],
}