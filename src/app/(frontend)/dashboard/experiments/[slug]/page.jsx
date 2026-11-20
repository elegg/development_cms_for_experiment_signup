'use client'

import { use, useState, useEffect } from 'react'
import { getSlot } from '../../../api/study_slots/readSlots'
import { getExperiments } from '../../../api/experiments/read'
import { queries } from '../../../api/experiments/queries'
import { TextComponent } from '../../../textValues'
import {  Container, Paper, Title, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { NavbarSimple } from '../../../dashboardBar'
import Layout from '../../../layouts/dashboardLayout'
import AppShell from '../../../components/appShell'

const PATH = {
  page: "Experiments",
  route: ["dashboard", "experiments"],

}
function Contents({ params }) {
  let [slots, setSlots] = useState({})
  let { slug } = use(params)

  const [opened, { toggle }] = useDisclosure();

  //const { slug } = use(params)

  useEffect(() => {
    PATH.route.push(slug)
    getExperiments(queries.find(slug))
      .then(s => { setSlots(s) })

  }, [])

  return <Layout path={PATH} Nav={<NavbarSimple onSelect={() => { }} />}


    Main={slots?.docs?.length ? <>
      <Paper shadow="xs" p="md" m="lg">
        <Title order={2}>{slots?.docs[0]?.title}</Title>
        {slots.docs.map(({ experiment_info }) => <TextComponent text_ast={experiment_info} />
        )}

      </Paper>

    </>

      : "Unavailable"}
  />
}

export default function Page({params}){
  return <AppShell>
    <Contents params = {params}/>
  </AppShell>
}