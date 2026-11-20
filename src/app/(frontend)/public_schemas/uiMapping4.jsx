'use client'

import {useState} from 'react'
import { TextInput , Button, NumberInput, Group, Stack, Text, Title, Modal} from '@mantine/core';
import { IconDeviceFloppy, IconEye } from '@tabler/icons-react';
import {atom, computed, batch, map, mapCreator, effect} from 'nanostores'
import { useStore } from '@nanostores/react';
import { IntButton, IntText } from '../i18n/store';
import { SlotSchedule, SetSlotModal, $modal_register  } from './slots';


let modalOpen = atom(false)
let modalContent = atom("slots.edit")



let $events = atom(null)
let $experiments = atom([
    {id:1, title:"First exp", shortDescription:"somehing", places:10},
    {id:2, title:"Second exp", shortDescription:"somehing", places:12},
    {id:3, title:"Third exp", shortDescription:"somehing else", places:20},
    {id:4, title:"Another", shortDescription:"somehing4", places:14},

])

let $focusedExperimentID = atom(3)
let $focusedExperiment = computed([$experiments, $focusedExperimentID], (exps, id)=>id ? exps.filter(exp=>exp.id===id)[0] : null)

let $focusType = atom("preview")


let $typedExperimentFocus = computed([$focusedExperiment, $focusType], (exp, type)=>({...exp, panel:type}))

let warn = effect([$events], (event)=>{


    if(event==="alert"){
        alert("OH NO!!")
    }
})


let $draftExperiment = map({id:"NEW", title:"", shortDescription:"", "places":0})


let edit_implementation = {
    slug:"edit",
    fields:[
        {"title": ({label, text})=><TextInput label = {<IntText>{label}</IntText>} onChange={(e)=>{$draftExperiment.setKey(label, e.target.value)}} />},
        {"shortDescription": ({label, text})=><TextInput label = {<IntText>{label}</IntText>} onChange={(e)=>{$draftExperiment.setKey(label, e.target.value)}} />},
        {"places": ({label, text})=><NumberInput label = {<IntText>{label}</IntText>} onChange={(e)=>{$draftExperiment.setKey(label, e)}} />},
        {"addSlots":()=><SlotSchedule/>}
        ]
}

let implementation = {
    slug:"preview",
    fields:[
        {"title": ({text})=><Title fz="lg">{text}</Title>},
        {"shortDescription": ({text})=><Text>{text}</Text>},
        {"places": ({text})=><Text><IntText>Places</IntText>: {text}</Text>},
        ]
}


let buttons = {
    save:({state})=><IntButton color="teal.5" disabled={false} onClick = {()=>{}} p="xs" leftSection={<IconDeviceFloppy/>}>save</IntButton>,
    preview:({state})=> <IntButton color="gray.4" c="black"  disabled={state==="preview"}  p="xs" leftSection={<IconEye/>}  onClick = {()=>$focusType.set("preview") }>preview</IntButton>,
    edit:({state}) =><IntButton color="gray.4"  c="black" disabled={state==="edit"}  p="xs" leftSection={<IconEye/>}  onClick = {()=>$focusType.set("edit") }>Edit</IntButton>
}

let Edit = ()=>{
        let data = useStore($typedExperimentFocus)

    return <>{data.panel==="edit" && <>{edit_implementation.fields.flatMap(field=>{

            return Object.keys(field).map(k=>{
             let El = ()=>field[k]({text:data[k], label:k})

             return <El  />
            })})
        } </>
    
}
    
    </>
}

let ControlBar = ()=>{
        let data = useStore($typedExperimentFocus)

    return  <>{Object.keys(buttons).map((button, i)=>{
       let  El =()=>buttons[button]({state:data.panel})
       return <El key ={i} ></El>
    })}</>
}

let P1 = ()=>{

    let data = useStore($typedExperimentFocus)

    return <>{data.panel==="preview" &&
<Stack bg="white" p="md">
         {implementation.fields.flatMap(field=>{

            return Object.keys(field).map(k=>{
                console.log(data)
             let El = ()=>field[k]({text:data[k]})

             return <El  />
             
    })
    
    }
  
    )

    }
    </Stack>
}
    </>
   

}
export let Preview = ()=>{


    return <>
    <Button onClick={()=>$modal_register.set(["timetable"])}>Open Modal</Button>
    <SetSlotModal />
    <Group>
    <ControlBar/>
    </Group>
    <Edit/>
    <P1/>
    
    </>
   

}


function map_factory(schema){

    let defaults = {}
    schema.forEach(s=>{defaults[s.name]=s.default || ""})
   
    return map(defaults)/*mapCreator((store)=>{
        store.set({... defaults})
    })*/
}





export class UIFactory{
    constructor(obj, actions=[]){

        this.obj = obj
        this.values = {}
        this.store = map_factory(this.obj)
        this.output = null
        this.actions = actions
        
    }


    mapping(item, label, store ){

        switch(item){

            case "text":
                return <TextInput label = {label} onChange={(e)=>{store.setKey(label, e.target.value)}} defaultValue={this.values[label]}/>

            case "number":
                return <div><NumberInput w="50%" label= {label} onChange={(e)=>store.setKey(label, e)} defaultValue={this.values[label]}/></div>

            
            case "button":
                return

        }

    }

    mapUI(){
        this.values = this.store.get()
       return Object.keys(this.obj).map((k, i)=>this.mapping(this.obj[k].type, this.obj[k].name, this.store))
    }

    
    create(output){

        return ({preview, save, store})=>{

         let s =   useStore(store)
                
            console.log({s})
       return <>
       <Group bg="white" bd="lightgray solid 1px" p="4px">

        {this.actions.map(a=>{
                                let callback = ()=>{
                                    $events.set("alert")
                                    save({action:a, payload:{...this.store.get()}})
                                }

                                let El = buttons[a]
           return  <El callback={callback} state = {a===s.state} />})}

       
         </Group>
          <Stack>
                    { s.state==="save" && this.mapUI()}
                            <Preview store={store}/>


          </Stack> </>
        
        
        }
    }}
