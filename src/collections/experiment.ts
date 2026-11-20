import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Experiment: CollectionConfig = {


    slug:"experiment",
    fields:[
        {type:"text",
            name:"title"
        },
        {type:"text", name:"shortDescription"},
        {type:"number",name:"places"},
         {name:"experiment_info",
                    type:"richText",
                    editor: lexicalEditor({
                        features: ({ rootFeatures }) => {
                          return [
                            ...rootFeatures,
                            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                            HorizontalRuleFeature(),
                          ]
                        },
                      }),
                    label:"Experiment Information"
                },
          {
            type:"number",
            "name":"signUps", 
            admin:{hidden:true},
            hooks:{
              afterRead: [({ data }) =>  data?.participant?.docs?.length],
            }
          },
          

        //{type:"relationship", relationTo:"study_slot", name:"slots", hasMany:true},
        //{type:"relationship", relationTo:"researcher", name:"lead_researcher", hasMany:false},
        //{type:"relationship", relationTo:"researcher", name:"research_team", hasMany:true},
        {"type":"join", "name":"participant", collection:"study_slot", "on":"participant", maxDepth:2},
        {"type":"join", "name":"research_team", collection:"experiment_researcher", "on":"experiment", maxDepth:2},








        

    ]
}