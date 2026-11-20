'use client'

import {useState} from 'react'
import { TextInput , Button, NumberInput, Group} from '@mantine/core';
import { IconDeviceFloppy, IconEye } from '@tabler/icons-react';
import {atom, computed} from 'nanostores'


export class UIFactory{
    constructor(obj, actions=[]){

        this.obj = obj
        this.values = {}
        this.stores = []
        this.output = null
        this.actions = actions
        
    }

    createStores(){

        Object.keys(this.obj).forEach(value=>this.stores.push(atom("")))
        this.output = computed(this.stores, (...stores)=>{

            let res = {}
            this.obj.forEach((k, i)=>{res[k.name]=stores[i]})
            
            return res
        })

    }

    unwrap(){
        let data= this.output.get()
        
        return data

    }

    mapping(item, label, store ){

        switch(item){

            case "text":
                return <TextInput label = {label} onChange={(e)=>{store.set(e.target.value)}} defaultValue={this.values[label]}/>

            case "number":
                return <div><NumberInput w="50%" label= {label} onChange={(e)=>store.set(e)} defaultValue={this.values[label]}/></div>

            
            case "button":
                return

        }

    }

    mapUI(){
        this.createStores()
       return Object.keys(this.obj).map((k, i)=>this.mapping(this.obj[k].type, this.obj[k].name, this.stores[i]))
    }

    create(output){

        return ({preview, save})=>{
                

       return <>{this.mapUI()}
       <Group>

        {this.actions.map(a=>{
                                let callback = ()=>save({action:a, payload:{...this.unwrap()}})


           return  a==="save" ?  <Button color="teal.5"  onClick = {callback} leftSection={<IconDeviceFloppy/>}>Save</Button> :
        <Button color="gray.0"  bd="solid slategray 1px" c="black" leftSection={<IconEye/>}  onClick = {callback }>Preview</Button>
        })}

         </Group></>}
        
    
        }
}
