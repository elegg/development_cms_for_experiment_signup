'use client'


import { useState , useEffect} from 'react';
import { MiniCalendar } from '@mantine/dates';
import dayjs from 'dayjs';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {getSlot} from '../api/study_slots/readSlots'
import {updateParticipantSlot} from '../api/participants/updateParticipantStudySlots'
import { Chip, Flex , Chips, Stack, Button} from '@mantine/core';
import {notifications} from '@mantine/notifications'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useQuery } from '@tanstack/react-query';
import {queries} from '../api/study_slots/queries'
function SlotsToChips({data}){

    return data.map(slot=><Chip value={slot.id.toString()}>{`${dayjs(slot.start.time).format("hh:mm")} - ${dayjs(slot.end.time).format("hh:mm")}`}</Chip>)

}


export function DaySlots({completed, experiment=1}) {
  const [value, onChange] = useState(dayjs());
  const [selectedSlot, setSlot] = useState(null)
    //const [slots, setSlots] = useState(false)

    //

    let query = useQuery({queryKey:["slots", experiment], queryFn:async()=> await getSlot(queries.allExperimentSlots(experiment))})
    let slots = query.data
    console.log({query, slots})
  /*useEffect(() => {
    getSlot({ id: "1" })
      .then(s => {console.log(s); setSlots(s) })

  }, [])*/
  return <Stack justify='center' align='center'>
    <MiniCalendar size='lg' value={value} onChange={onChange} numberOfDays={5} bg='teal.0' 
        getDayProps={(date) => ({
        style: {
          color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-gray-5)' : undefined,
        },
      })}/>

<Chip.Group onChange={setSlot} value={selectedSlot}>
    <Flex gap="lg" p="lg" justify="center">
        {<SlotsToChips data= {slots?.docs || []}/>}
       </Flex>
</Chip.Group>


        <Button onClick={
            async()=>{
                try{
            let res = await updateParticipantSlot(selectedSlot)
            notifications.show({title:"Updated", message:"Experiment Scheduled"})
            completed()
                } catch{
                    notifications.show({title:"Error", message:"Could not schedule experiment", color:"red"})


                }
            
        
        
        
        }}>
        Confirm</Button>
      </Stack>
      
      ;
}