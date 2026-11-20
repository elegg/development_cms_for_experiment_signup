import { Schedule } from "@mantine/schedule"
import { Title , RangeSlider, Group, Stack, Text, Modal, Button, useModalsStack, Box} from "@mantine/core"
import { InlineDateTimePicker, DateTimePicker } from '@mantine/dates';

import { IntText, useLanguage } from "../i18n/store"
import { useStore } from "@nanostores/react"
import { useState, useEffect } from "react"
import { atom ,map, batch, computed, effect} from "nanostores"
import dayjs from "dayjs";
let confirm = atom(false)
let selected_times = map({start:"", end:""})
let current_slots = atom([])
let update_event_id = atom(null)

let is_registeredFirst = (name, registry)=>registry?.length && registry[0] ===name

export let $modal_register = atom([])

effect($modal_register, (m)=>console.log(m))
let add_to_modal_register = (name)=>$modal_register.set([name, ...$modal_register.get()])
let remove_from_modal_register = (name)=>$modal_register.set([...$modal_register.get()].filter(m=>m!==name))

let items_for_update = computed([update_event_id, current_slots], (id, curr)=>{

    if(id){
        return curr.filter((s, i)=>i===id)[0] || null
    }

    return null
})

let $events = computed(current_slots, (curr)=>{

    return curr.map((c, i)=>{


        return {id:i, start:c.start, end:c.end, title:"Available", color:"cyan"}
    })
})

function MyModal({children, name, ...args}){

   //let m =  useStore(store)
   let register = useStore($modal_register)


   

   return <><Modal   size="xl" {...args}  opened={is_registeredFirst(name, register)}  h="lg" onClose={()=>remove_from_modal_register(name)}>{children}</Modal></>
}


let AddEventModal = ({name, args})=>{
    
             let times = useStore(selected_times)
    return <MyModal name={name} p="lg" title={<Text>Confirm Slot</Text>} {...args} >

<Stack p="lg">
        <DateTimePicker type="range" valueFormat={(date) => dayjs(date).format('dddd, MMMM D [at] h:mm A')}
      defaultValue={[times.start, times.end]}/>
      <Group>
      <Button w="max-content" onClick={()=>{
        
        batch(
        ()=>{
            current_slots.set([...current_slots.get(), selected_times.get()])
            remove_from_modal_register(name)
        }
        )
        
        }}>Confirm</Button>
        <Button bg="white" c="black" bd="grey 1px solid" w="max-content" onClick={()=>remove_from_modal_register(name)}>Cancel</Button>
</Group>
</Stack>
        
        
       </MyModal>

}

let UpdateEventModal = ({name, ...args})=>{
             let times = useStore(items_for_update)
             
    return <>{times && <MyModal name={name} p="lg" title={<Text>Update Slot</Text>} {...args} >

                        <Stack p="lg">
                                <DateTimePicker type="range" valueFormat={(date) => dayjs(date).format('dddd, MMMM D [at] h:mm A')}
                            defaultValue={[times.start, times.end]}/>
                            <Group>
                            <Button w="max-content" onClick={()=>{
                                
                                batch(
                                ()=>{

                                    update_event_id.set(false)
                                    remove_from_modal_register(name)
                                }
                                )
                                
                                }}>Update</Button>
                                <Button bg="white" c="black" bd="grey 1px solid" w="max-content" onClick={()=>{
                                    
                                    remove_from_modal_register(name)
                                    update_event_id.set(false)}
                                    }>Cancel</Button>
                        </Group>
                        </Stack>
        
        
       </MyModal>}</>

} 
let ConfirmationModal = ({...args})=>{



    return <>
    <AddEventModal {...args}/>
    <UpdateEventModal {...args}/>
    </>
}


export const SlotSchedule = ({modal})=>{

    let lang = useLanguage()

    let events = useStore($events)

    let [view, setView] = useState("month")
    let [date, setDate] = useState(new Date())

    return <>
    <Title ><IntText>Slots</IntText></Title>
    <Stack w="50%" bg="white" bdrs="md" p="md">
        <Text fw="600">
    <IntText>Duration</IntText>
    </Text>
    <RangeSlider />
    </Stack>
        <Schedule locale ={"hr-HR"}
        events = {events}
        onEventClick={(e)=>{
            
            add_to_modal_register("update.event")
            update_event_id.set(e.id)}}

        onViewChange={setView}
        
        
        onDayClick={(e)=>{

            setDate(e)
            
            setView("day")
        }
            } onDateChange={(newDate) => setDate(new Date(newDate))} date={date} view={view} withDragSlotSelect onSlotDragEnd ={(s, e)=>{
                
                batch(()=>{
                add_to_modal_register("add.event")
                selected_times.set({start:s, end:e})


                })
            
            }} ></Schedule>

    </>
}

export let SetSlotModal = ()=>{



return <>
        <MyModal key="1" name="timetable" ><SlotSchedule ></SlotSchedule></MyModal>
        <AddEventModal key="2"  name="add.event" />
        <UpdateEventModal key="3" name="update.event"/>
</>
}

