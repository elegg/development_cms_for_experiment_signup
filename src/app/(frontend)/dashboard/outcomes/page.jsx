'use client'
import Dashboard from "../../components/dashboardPages";

import {Panel} from './components/images'
const PATH = {
    page:"Outcomes",
    route:["dashboard", "completed"],
}


import AppShell from '../../components/appShell'


import {CompletedTable} from '../../completedTable'






export default function Page({params}){


    return <AppShell><Dashboard params={params} path={PATH} Main={<Panel></Panel>}/></AppShell>



}