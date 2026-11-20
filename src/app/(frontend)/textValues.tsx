import React from 'react'
import { RichText , JSXConvertersFunction} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Text, Title } from '@mantine/core'


let api_data = {
"id": 1,
"title": "Ex1",

"experiment_info": {

"root": {
"type": "root",
"format": "",
"indent": 0,
"version": 1,

"children": [

{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,

"children": [

{
"mode": "normal",
"text": "My experiment details here",
"type": "text",
"style": "",
"detail": 0,
"format": 0,
"version": 1
}
],
"direction": null,
"textStyle": "",
"textFormat": 0
},

{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,

"children": [],
"direction": null,
"textStyle": "",
"textFormat": 0
},

{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,

"children": [

{
"mode": "normal",
"text": "ans more",
"type": "text",
"style": "",
"detail": 0,
"format": 0,
"version": 1
},

{
"mode": "normal",
"text": "jjnajn ",
"type": "text",
"style": "",
"detail": 0,
"format": 1,
"version": 1
}
],
"direction": null,
"textStyle": "",
"textFormat": 0
},

{
"tag": "h1",
"type": "heading",
"format": "",
"indent": 0,
"version": 1,

"children": [

{
"mode": "normal",
"text": "title",
"type": "text",
"style": "",
"detail": 0,
"format": 0,
"version": 1
}
],
"direction": null
},

{
"type": "relationship",

"value": {
"id": 14,

"externalId": {

"authStrategies": []
},
"updatedAt": "2026-09-28T20:06:40.710Z",
"createdAt": "2026-09-28T20:06:40.710Z",
"email": "edward.legg@ffri.uniri.hr",
"username": "edward.legg@ffri.uniri.hr",

"sessions": [

{
"id": "ff125d29-f24a-4871-8de0-9af6985057bd",
"createdAt": "2026-11-03T20:52:22.885Z",
"expiresAt": "2026-11-03T22:52:22.885Z"
}
],
"collection": "users"
},
"format": "",
"version": 2,
"relationTo": "users"
},

{
"tag": "h1",
"type": "heading",
"format": "",
"indent": 0,
"version": 1,

"children": [],
"direction": null
}
],
"direction": null
}
},

"slots": [],
"lead_researcher": null,

"research_team": [],

"participant": [],
"updatedAt": "2026-11-03T20:54:10.884Z",
"createdAt": "2026-11-03T20:52:57.155Z"
}


/*

[EWL] For each node returned by payload's lexical editor it is possible to customise the render
for the moment I just passed in the mantine text component and headings: 
        note: payload returns headings as "h1", "h2" but mantine uses int for the heading order
*/

const converters= ({defaultConverters})=>{
    console.log(defaultConverters)
    return {
    ...defaultConverters,
    paragraph:({node, nodesToJSX})=><Text>{nodesToJSX({ nodes: node.children })}</Text>,
    heading:({node, nodesToJSX})=><Title order = {parseInt(node.tag[1]) }>{nodesToJSX({ nodes: node.children })}</Title>,


}}
export const TextComponent = ({text_ast= api_data.experiment_info}) => {
  return <RichText data={text_ast} converters={converters}  />
}
