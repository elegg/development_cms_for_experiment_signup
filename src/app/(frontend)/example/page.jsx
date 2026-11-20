'use client'

import Schedule from '../components/calendarSchedule'
import { Experiment } from "../public_schemas/experiment";
import { UIFactory, Preview } from "../public_schemas/uiMapping4";
import { useEffect, useState } from 'react';
import Dashboard from '../components/dashboardPages';
import {Editor }  from '../components/editor';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Box , Paper, Stack, Button} from '@mantine/core';
import { createContext } from 'node:vm';
import { atom, computed, effect, batch, map } from 'nanostores'
import {useStore} from '@nanostores/react'
import { nanoquery } from '@nanostores/query';
import { createExperiment,  } from '../api/experiments/update';
import $apiStore from '../api/factory'
import { getExperiments } from '../api/experiments/read';


import { $experimentQuery, $currentExperiment, $experimentId , $updateExperiment} from '../api/experiments/stores';


const PATH = {
    page:"Completed",
    route:["dashboard", "completed"],
}
let $createExperiment = atom({})
let updateExperimentLocal =(data)=> $createExperiment.set({...$createExperiment.get(), ...data})
let UI = new UIFactory(Experiment.fields, Experiment.actions).create(updateExperimentLocal)

let $panel = atom("/experiment/create")
let $panel_version = atom("input")
let $panelDetails = computed([$panel, $panel_version], (panel, version)=>({panel, version}))

let generatePreview = ()=> $panel_version.set("preview")
let implementation = {
    "/experiment/create":{
        "input":({outcome, store})=><UI preview={generatePreview} save = {outcome} store={store} />,
        "preview":({outcome,store})=><p>Preview</p>
    }

}

function Panel({outcome, store}){

   let panel =  useStore($panelDetails)
    let post = useStore($currentExperiment)
    let updatePost = useStore($updateExperiment)

    let experimentDetails=  useStore($createExperiment)
   let Element = implementation[panel.panel][panel.version]

return <><Element outcome ={outcome} store={store}/>

{/*<p>{JSON.stringify(experimentDetails)}</p>
<p>{JSON.stringify(post)}</p>

<Button onClick={()=>{$experimentId.set("2")}}>2</Button>
<Button onClick={()=>{$updateExperiment.mutate({...experimentDetails, id:1})}}></Button>
*/}
</>
}

    let store = "experiment"


let $action = atom("idle")
let $draft = map({title:"...", shortDescription:"...", places:10 })


let merged = computed(
    [$action, $draft], (action, draft)=>({state: action, ...draft})
)

export default function Page(){


   // let participants = useStore($apiStore[store].store)
   // let { mutate, loading, error } = useStore($apiStore[store].updater)
    let a  = useStore(merged)
    let draft = useStore($draft)


    return <>
    {/*
    
    <Button onClick={()=>{$apiStore[store].args.id.set("2")}}>2</Button>
    <Button onClick={()=>{mutate({id:1})}}>1</Button>
*/}


   
    <Dashboard path={PATH} Main ={
        
        
        <><Preview></Preview>
        {/*}
        <Panel store={merged} outcome={a=>{
        batch(()=>{
            $action.set(a.action)
            $draft.set(a.payload)

        })
        }}/> */}

        <p>{JSON.stringify(a)}</p>
        

        
        
        
        </>
        
        
     }/> 

                

        </>

}