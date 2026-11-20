'use client'

import {TaskCard} from '../experimentCard'
import { NavbarSimple } from '../dashboardBar'
import React, { useEffect, useState } from 'react'
import { CompletedTable } from '../completedTable'
import { Button , Stack, Text, Title} from '@mantine/core';
import { TextComponent } from '../textValues'
import {getExperiments} from '../api/experiments/read'
import Layout from '../layouts/dashboardLayout'

function OpenList(){

   let [experiments, setExperiments] =  useState({})

    useEffect(()=>{
        getExperiments()
        .then(ex=>setExperiments(ex))
    },[])
   return <>
       <Title order ={1}>Open Experiments</Title>
   
   <TaskCard/>
<TaskCard/>
<TaskCard/>
<div>
<TextComponent/>
<p>{JSON.stringify(experiments)}</p>
</div>
</>
}


function MainPanel({focus}){

    switch(true){

        case focus==="Participate":
            return <OpenList/>
        case focus ==="Completed":
            return <CompletedTable/>
        
        default:
            return <p>No Notifications</p>
    }
}


export default ()=>{
    let [state, setState] = useState("Notifications")

return <Layout 
Nav= {<NavbarSimple onSelect ={setState}/>}
Main = {<Stack gap="lg" p="lg">    
            <MainPanel focus = {state}/>
        </Stack>
}

/>
}