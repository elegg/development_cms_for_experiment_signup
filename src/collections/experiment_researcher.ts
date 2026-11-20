import type { CollectionConfig } from 'payload'




export const Experiment_Researcher: CollectionConfig = {


    slug:"experiment_researcher",
    fields:[
        {
            type:"checkbox",
            name:"lead"
        },
        {
            type:"relationship",
            name:"experiment",
            relationTo:"experiment"
        },
        {
            type:"relationship",
            name:"researcher",
            relationTo:"researcher"
        },

    ]

}
