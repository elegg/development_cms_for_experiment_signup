'use client'

import {useState} from 'react'
import { TextInput , Button, NumberInput, Group} from '@mantine/core';
import { IconDeviceFloppy, IconEye } from '@tabler/icons-react';
import { useStore } from '@nanostores/react';


let implementation = {
     "title": ({text})=><p>{text}</p>,
    "shortDescription": ({text})=><p>{text}</p>,
    "places": ({text})=><p>{text}</p>

}


let Preview = ({store})=>{

    let data = useStore(store)



    return <>
    {Object.keys(implementation).map(k=>{
        let EL = implementation[k](data[k])

        return <El/>
    
    
    })}
    
    </>

}

export class UIFactory{
    constructor(obj){

        this.obj = obj
        this.values = {}
        
    }

    mapping(item, label, ){

        switch(item){

            case "text":
                return <TextInput label = {label} onChange={(e)=>this.values[label] =e.target.value} defaultValue={this.values[label]}/>

            case "number":
                return <div><NumberInput w="50%" label= {label} onChange={(e)=>this.values[label] =e } defaultValue={this.values[label]}/></div>

            
            case "button":
                return

        }

    }

    mapUI(){
       return Object.keys(this.obj).map(k=>this.mapping(this.obj[k].type, this.obj[k].name))
    }

    create(updateStore){

        return ({preview, save})=>{
        

          //let [values, setValues] =  useState({})
        
        
       return <>{this.mapUI()}
       <Group>

        
         <Button color="teal.5"  onClick = {()=>{
            updateStore({...this.values})
            save()
        
        }} leftSection={<IconDeviceFloppy/>}>Save</Button>
        <Button color="gray.0"  bd="solid slategray 1px" c="black" leftSection={<IconEye/>}  onClick = {()=>{
            updateStore({...this.values})
            preview()
        }
            
            } >Preview</Button>

            <Preview store={store}/>
            <p>Somwething</p>

         </Group></>}
        
    
        }
}
