'use client'

import {useState} from 'react'
import { TextInput , Button, NumberInput, Group, Stack, Text, Box,Title} from '@mantine/core';
import { IconDeviceFloppy, IconEye } from '@tabler/icons-react';
import {atom, computed, batch, map, mapCreator, effect} from 'nanostores'
import { useStore  } from '@nanostores/react';
import Dashboard from '../components/dashboardPages';

let $focusedExperiment = atom("")
let $taskExperiment = atom(null)
let $events = map({action:"init"})


const PATH = {
    page:"Completed",
    route:["dashboard", "completed"],
}

let $experimentEvent = atom(null)
let $stateExperiment = effect([$focusedExperiment, $taskExperiment, $events], (selected, task, event )=>{
    switch(true){
       case event.action ==="focus":
        $focused.set(event.payload.id)
        break
        case event.action ==="defocus":
             $focused.set(event.payload.id)
             break

    }
})



let $panel = atom("experiment")

let $panelVersion = atom("*")

let $focusedVersion = atom("preview")
let AllExperimentPanel = ()=>{

   let value =  useStore($panelVersion)


   return <>{value==="*" && <p>{value}</p>}</>
}



let PreviewPanel = ()=>{
   let preview =  useStore($focusedVersion)

   return <>{preview ==="preview" && <p>This is a preview {preview}</p>}</>
}
let FocusedExperimentPanel = ()=>{

   let value =  useStore($panelVersion)


   return <>{value!=="*" && <><p>This is the focus panel: {value}</p><PreviewPanel/></>} 
   
   
   </>
}


let ExperimentPanel = ()=>{



    return <>
    <AllExperimentPanel/>
    <FocusedExperimentPanel/>
    <Button onClick={()=>$panelVersion.set("Something")} >Focus </Button>
        <Button onClick={()=>$focusedVersion.set("edit")} >Focus </Button>


    </>

}

let P1 = function({Title, Prop, Text}){

   return  <Stack>
    <Title>{title}</Title>
    <Text> {text}</Text>
    <Box bg="black" h="20px" w={`${prop*100}px`}></Box>
   </Stack>
}
let $int = atom("title")
let schema = {
    title:({title})=> <Title>{title}</Title>,
    text:({shortDescription})=>{
        let title =useStore($int)
        
       return <Text>{title} {shortDescription}</Text>},
    prop:({places})=>  <Box bg="black" h="20px" w={`${places*100}px`}></Box>,
    button:({})=><Button onClick={()=>$events.set({action:"$y"})}>Event.y </Button>
}

let Layout = (Els) =>{

    return ()=><>
    <Stack p="lg" c="white" bg="gray.7" w="50%" m="lg" bdrs={"lg"} bd="gray 1px dashed">
        <Els.button></Els.button>
        <Els.prop></Els.prop>
        <Els.text/>
        <Els.title/>
    </Stack>
    
    </>



}

let experimentHandler = ( event)=>{
    // performs any side effects on an event
   switch (true) {
    case event.action ==="x":
        $experiment.setKey("title", "UPDATED MORE")
        break
        
   case event.action ==="y":
        $experiment.setKey("shortDescription", "Nothing to say here")
    
    case event.action==="$y":
        let n = 0
        $experiment.set({...$experiment.get(), places:$experiment.get().places+1})
   }

}



function ApplyLayout({schema, layout, data}){
    console.log(schema, data)
    let res = {}
    Object.keys(schema).forEach(k=>{res[k] =()=> schema[k](data)})
    let El = layout(res)
    return  <>MORE<El></El></>
}

let Preview = function({experiment}){ 

    let e = useStore(experiment)

    return <>{e.render && <ApplyLayout schema = {schema} layout={Layout} data = {e}/>}</>
}


let $tree = map({
    value:0
})

let $experiment = map({title:"MY title", shortDescription:"something here", places:0.5, render:true})

let $eventNumber =effect([$events], (event)=>{
    console.log(event)
    if(event.action.includes("add")){
       let v =  $tree.get().value
    $tree.setKey('value', v+1)
    }

    experimentHandler(event)

    if(event.action.includes("focus")){
        $experiment.set({title:"UPDATED", shortDescription:"something here", places:0.5, render:true})
         $tree.setKey('value', event.action.split(".")[1])
        $tree.setKey('subSet', event.action.split(".")[2])

    }

}) 


let ui = computed($tree, (tree)=>{

    return tree.value ==="experiment" ? "dash" : "init"
})

let values = $tree
let $i18_mappings = map({
    experiment:{en:"Experiment", hr:"Istraz..."}
})

let $language = atom("hr")

let $i18n = computed([$language, $i18_mappings], (language, mappings)=>{
    let res = {}
     Object.keys(mappings).forEach(k=>res[k] = mappings[k][language])
    return res
})


let imp = {
    dash:({value, i18n})=>{

    

    return <><Title>{i18n.experiment}</Title><Text>{value}</Text></>},
    int:()=><><Text>Hello</Text></>

}
let Exp =()=>{
            let {value} = useStore($tree)
            let i18n = useStore($i18n)


    return <>
    {Object.keys(imp).map(k=>{let EL = imp[k]; return <EL value ={value} i18n = {i18n}/>})}
    

    </>
}


export default function Page(){
    let data = useStore(ui)

    return <Dashboard path={PATH} Main={ <Stack>
                        {data==="dash" &&<Preview experiment = {$experiment}/>}
                        <Button onClick={()=>$events.set({action:"add."+performance.now()}) }>Add</Button>
                        <Button onClick={()=>$events.set({action:"focus.experiment.create"}) }>Add</Button>
                                <Button onClick={()=>$events.set({action:"$x"}) }>Add</Button>
                                                <Button onClick={()=>$events.set({action:"$y", payload:"1"}) }>Add</Button>


    <ExperimentPanel/>
    </Stack>}/>


}