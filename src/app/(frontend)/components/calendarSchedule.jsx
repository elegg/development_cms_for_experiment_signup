'use client'

import { useState, useEffect } from 'react';
import { Schedule } from '@mantine/schedule';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/schedule/styles.css';
import { Modal, Text, Stack, Group, Button, Box } from '@mantine/core';
import dayjs from 'dayjs';
import { removeSlot } from '../api/study_slots/updateSlots'

import { getSlot } from '../api/study_slots/readSlots';
import { queries } from '../api/study_slots/queries'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';


import { useStore } from '@nanostores/react';
import {$currentSlot, $removeSlot} from '../api/study_slots/stores'

let timeComponents = [
    { text: "Day", "key": "start", "format": "dddd MMMM D" },
    { text: "Start", "key": "start", "format": "HH:mm" },
    { text: "End", "key": "end", "format": "HH:mm" }



]

function TimeInfo({ details }) {
    return <Group>
        <Text fw={800} component="span"> {details.text}: </Text>
        <Text>{` ${dayjs(details.time).format(details.format)}`}</Text>
    </Group>
}

function TimeInformation({ timeComponents, opened, options}) {

    return <Stack>

        {timeComponents.map(t => <TimeInfo key={t.text} details={{ ...t, day: opened[t.key], time: opened[t.key] }} />)}

        <Group>
            {options.map(OPT=><OPT/>)}
        </Group>


    </Stack>
}

function ModalOptions({ state, timeComponents, opened, setState }) {
            const { mutate, loading, error } = useStore($removeSlot)

    switch (true) {
        case state=== "idle":
            return <TimeInformation timeComponents={timeComponents} opened={opened} options={[ 
                ()=><Button key ="cancel" bg="red.5"  onClick={() => setState("cancel-requested")}>Cancel</Button>
            ,()=><Button key="contact">Contact</Button>]} />

        case state=== "confirm-cancel":
            return <Box>Are you sure you want to cancel this slot?<Group>
                <Button bg="red.6" onClick={() => {

                            mutate({id:opened.id})
                            .then(()=>
                            setState("success"))}
                        }


                            >Confirm</Button>
                <Button bg="white" bd="slategray solid 2px" c="black" onClick={() => setState("idle")}>Do not Cancel</Button></Group></Box>
        case loading:
            return <p>Cancelling...</p>

        case state==="cancelling" && loading===false:
            setState("sucess")
    }
}

function EventModal({ opened, setOpened }) {

    let [state, setState] = useState("idle")




    useEffect(() => {
        console.log({ state })
        if (state === "cancel-requested") {
            setState("confirm-cancel")
        }

        if (state === "confirmed-cancel") {
            setState("cancelling")

        }

        if (state=== "success") {
            notifications.show({ "title": "success" });
            setOpened(false)


        }


    }

        , [state])

    return <Modal centered
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title={opened.title}



    > <ModalOptions state={state} timeComponents={timeComponents} opened={opened} setState={setState} /></Modal>
}

let events = [
    {
        "id": 1,
        "title": "My first slot",

        "start": "2026-11-10T13:30:00.000Z",
        "end": "2026-11-10T13:45:00.000Z",
        "color": "pink"
    }




]

export default function ({ participant = { id: 1 } }) {

    const [opened, setOpened] = useState(false);
   // const queryClient = useQueryClient()
   // const query = useQuery({ queryKey: ['slot_id'], queryFn: async () => await getSlot(queries.allParticipantSlots(1)) })

    const slotState = useStore($currentSlot)
    console.log({slotState})

    return <>

        <EventModal opened={opened} setOpened={setOpened} />

        <Schedule

            onEventClick={(e) => { setOpened(e) }}


            events={slotState?.data?.docs.map(slot => ({ id: slot.id, start: slot.start.time, end: slot.end.time, title: "Scheduled Experiment", color: "blue" })) || []}

            dayViewProps={{
                startTime: '07:00:00',
                endTime: '20:00:00',
                intervalMinutes: 15,
            }}
            weekViewProps={{
                startTime: '07:00:00',
                endTime: '20:00:00',
                withWeekendDays: false,
            }}
            monthViewProps={{
                withWeekNumbers: true,
                firstDayOfWeek: 1,
            }}
            yearViewProps={{
                withWeekNumbers: true,
            }}

        />
    </>
}