
import type { CollectionConfig } from 'payload'

export const StudySlot: CollectionConfig = {
    slug:"study_slot",
    access: {
    read: () => true,
  },
    fields:[
        

       { type:"relationship",
        relationTo:"timeslot",
        name:"start"
    }, 
    { type:"relationship",
        relationTo:"timeslot",
        name:"end"
    }, 
    {type:"relationship", relationTo:"experiment", name:"experiment", hasMany:false},
    {type:"relationship", relationTo:"participant", name:"participant", hasMany:false, admin:{hidden:true}},



 
    ]

}