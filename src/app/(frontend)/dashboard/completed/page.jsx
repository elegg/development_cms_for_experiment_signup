'use client'
import Dashboard from "../../components/dashboardPages";
const PATH = {
    page:"Completed",
    route:["dashboard", "completed"],
}
import AppShell from '../../components/appShell'


import {CompletedTable} from '../../completedTable'
export default function Page({params}){


    return <AppShell><Dashboard params={params} path={PATH} Main={<CompletedTable/>}/></AppShell>



}