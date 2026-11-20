'use client'

import {useState} from 'react'
import { TextInput , Button, NumberInput, Group, Stack, Text, Title} from '@mantine/core';
import { IconDeviceFloppy, IconEye } from '@tabler/icons-react';
import {atom, computed, batch, map, mapCreator, effect} from 'nanostores'
import { useStore } from '@nanostores/react';
let $events = atom(null)



let warn = effect([$events], (event)=>{


    if(event==="alert"){
        alert("OH NO!!")
    }
})





let implementation = {
    slug:"preview",
    fields:[
        {"title": ({text})=><Title fz="lg">{text}</Title>},
        {"shortDescription": ({text})=><Text>{text}</Text>},
        {"places": ({text})=><Text>Places: {text}</Text>},
        ]
}


let Preview = ({store})=>{

    let data = useStore(store)

    return <>{data.state===implementation.slug ? <>
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
   
    </> :"NOT PREVIEW"}</>

}


function map_factory(schema){

    let defaults = {}
    schema.forEach(s=>{defaults[s.name]=s.default || ""})
   
    return map(defaults)/*mapCreator((store)=>{
        store.set({... defaults})
    })*/
}


let buttons = {
    save:({state, callback})=><Button color="teal.5" disabled={state} onClick = {callback} p="xs" leftSection={<IconDeviceFloppy/>}>Save</Button>,
    preview:({state, callback})=> <Button color="gray.4" c="black"  disabled={state}  p="xs" leftSection={<IconEye/>}  onClick = {callback }>Preview</Button>,
    edit:({state, callback}) =><Button color="gray.4"  c="black" disabled={state}  p="xs" leftSection={<IconEye/>}  onClick = {callback }>Edit</Button>
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
