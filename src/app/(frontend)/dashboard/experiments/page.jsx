'use client'

import { use , useState, useEffect} from 'react'
import { getSlot } from '../../api/study_slots/readSlots'
import {TextComponent} from '../../textValues'
import { useDisclosure } from '@mantine/hooks';
import {NavbarSimple} from '../../dashboardBar'
import Layout from '../../layouts/dashboardLayout'
import {  Container, Paper, Title, Burger } from '@mantine/core'

import { useQuery, useQueryClient } from '@tanstack/react-query';
import AppShell from '../../components/appShell'

const PATH = {
    page:"Experiments",
    route:["dashboard", "experiments"],
}

function Contents({params}){
        let {slug} = use(params)

   const [opened, { toggle }] = useDisclosure();
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['id'], queryFn: ()=>getSlot({id:slug}) })
    
    let slots = query.data

  return <Layout Nav = {<NavbarSimple onSelect ={()=>{}} />}
  path = {PATH}
  

       
        Main = {slots?.docs?.length ? <>
  <Paper shadow="xs" p="md" m="lg">
    <Title order = {2}>{slots?.docs[0]?.title}</Title>
  {slots.docs.map(({experiment_info})=><TextComponent text_ast={experiment_info}/>
  )}

  </Paper>
  
  </>

 : "Unavailable"}
/>
}



export default function Page({params}) {
        //let [slots, setSlots] = useState({})
        
 
  return <AppShell>
    <Contents params = {params}></Contents>
</AppShell>
}
