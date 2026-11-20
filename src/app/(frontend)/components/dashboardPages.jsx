
//import { use , useState, useEffect} from 'react'
import { getSlot } from '../api/study_slots/readSlots'
import {TextComponent} from '../textValues'
import { AppShell, AppShellMain, Container, Paper, Title, Burger } from '@mantine/core'
//import { useDisclosure } from '@mantine/hooks';
import {NavbarSimple} from '../dashboardBar'
import Layout from '../layouts/dashboardLayout'




export default function Dashboard({path, Main}) {
       // let [slots, setSlots] = useState({})

 // const [opened, { toggle }] = useDisclosure();

    //const { slug } = use(params)

   /* useEffect(()=>{


       getSlot({id:slug})
       .then(s=>{setSlots(s)})

    },[]*/

  return  <Layout Nav = {<NavbarSimple onSelect ={()=>{}} selected= {path.page}/>}

       path = {path}
        Main = {Main}
        
        />
  

}
