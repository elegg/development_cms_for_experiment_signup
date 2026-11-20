import type { CollectionConfig } from 'payload'

export const TimeSlot: CollectionConfig = {

    slug:"timeslot",
    fields:[
        {name:"time",
                type:"date",
                admin:{
            date:{
            timeIntervals:5,
            pickerAppearance: 'dayAndTime',
            }}
        }
    ]



}