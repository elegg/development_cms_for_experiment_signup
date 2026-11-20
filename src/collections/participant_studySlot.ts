import type { CollectionConfig } from 'payload'


/*

IMPORTANT:

The relationship to a slot is to the junction table 'experiment_slot'
NOT the table 'study_slot'

The logic is that the full details of an experimental session can be described as a join
on the experiment_slot table. Saving the need to join participant via slot to experiment



*/

export const Participant_Study: CollectionConfig = {


    slug:"participant_study",
    fields:[
        {
            type:"checkbox",
            name:"completed"
        },
        {
            type:"relationship",
            name:"slot",
            relationTo:"study_slot"
        },
        {
            type:"relationship",
            name:"participant",
            relationTo:"participant"
        }
    ]

}
