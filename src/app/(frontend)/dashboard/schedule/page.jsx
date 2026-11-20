'use client'
import Dashboard from "../../components/dashboardPages";
const PATH = {
    page:"Schedule",
    route:["dashboard", "schedule"],
}

import Schedule from '../../components/calendarSchedule'


import { DaySlots } from "../../components/slotPicker";
import AppShell from "../../components/appShell";
export default function Page({params}){


    return  <AppShell><Dashboard 
                    params={params} 
                    path={PATH} 
                    Main={<Schedule/>}
            />
            </AppShell>
            


}