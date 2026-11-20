'use client'

import {TaskCard} from '../../experimentCard'
import { NavbarSimple } from '../../dashboardBar'
import React, { useEffect, useState } from 'react'
import { CompletedTable } from '../../completedTable'
import { Button , Stack, Text, Title} from '@mantine/core';
import { TextComponent } from '../../textValues'
import {getExperiments} from '../../api/experiments/read'
import { queries } from '../../api/experiments/queries'
import Layout from '../../layouts/dashboardLayout'
import AppShell from '../../components/appShell'
import { useQuery, useQueryClient } from '@tanstack/react-query'
const PATH = {
    page:"Participate",
    route:["dashboard", "participate"],
}


function OpenList(){

   //let [experiments, setExperiments] =  useState({})
   /*

    useEffect(()=>{
        getExperiments(queries.notTaken(1))
        .then(ex=>{
            console.log(ex)
            setExperiments(ex)})

*/
      const queryClient = useQueryClient()
    
      const query = useQuery({ queryKey: ['id'], queryFn: ()=>getExperiments(queries.notTaken(1)) })
    

      let experiments = query.data


   return <>
       <Title order ={1}>Open Experiments</Title>
       {experiments?.docs && experiments?.docs.map(e=><TaskCard experiment={e}/>)}
   
 
<div>
<TextComponent/>
<p>{JSON.stringify(experiments?.docs)}</p>
</div>
</>
}



let Contents = ()=>{

return <Layout 
path = {PATH}
Nav= {<NavbarSimple onSelect ={()=>{}} selected="Participate"/>}
Main = { <OpenList/>}

/>
}

export default function Page({params}){
  return <AppShell>
    <Contents params = {params}/>
  </AppShell>
}