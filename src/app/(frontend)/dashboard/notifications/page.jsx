'use client'

import {TaskCard} from '../../experimentCard'
import { NavbarSimple } from '../../dashboardBar'
import React, { useEffect, useState } from 'react'
import { CompletedTable } from '../../completedTable'
import { Button , Flex, Stack, Text, Title, Box, Paper, Chip} from '@mantine/core';
import { TextComponent } from '../../textValues'
import {getExperiments} from '../../api/experiments/read'
import { queries } from '../../api/experiments/queries'
import Layout from '../../layouts/dashboardLayout'
import AppShell from '../../components/appShell'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getParticipant } from '../../api/participants/readParticipant'
const PATH = {
    page:"Participate",
    route:["dashboard", "notifications"],
}

import { MessageText, TextTimeline } from '../../components/messageThread'



function OpenList(){

      const queryClient = useQueryClient()
    
      const query = useQuery({ queryKey: ['messages'], queryFn: ()=>getParticipant({}) })
    

      let experiments = query.data

     let [chip, selected] =  useState("1")


   return<Stack >
    <Paper bg="white" p="lg" withBorder>
      <Text fw={800} fs="s" pb="lg">Experiment Channels</Text>
      <Chip.Group multiple = {false} value={chip} onChange={selected}>
        <Flex gap="md">
        
        {[1,2,3,4].map(i=><Chip value ={i.toString()} radius="xs"   variant='light' withBorder>{i}</Chip>)}
        </Flex>
        </Chip.Group>
    </Paper>
   {
          experiments?.docs
              .flatMap(d=>d.channel.docs)
              .flatMap(d=>({messages:d.messages, communicators:d.communicators} )
              
              ).map(msg=>msg.messages)
              .flatMap(msg=><TextTimeline messages={msg}/>)

              
              
              }
              

</Stack>
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