'use client'

import { IconUpload , IconContract, IconInfoSquare} from '@tabler/icons-react';
import { ActionIcon, Avatar, Badge, Card, Group, Progress, Text, Button, Divider , Title} from '@mantine/core';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import {DaySlots} from './components/slotPicker'
import { Accordion , Stack, Drawer} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {TextComponent} from './textValues'




export function TaskCard({experiment}) {

   let [opened, setOpened] =  useState(false)
     const [openDraw, { open, close }] = useDisclosure(false);
     console.log({experiment})


  return (
    <Card withBorder padding="sm" radius="sm" >
                <Modal size="lg"
                centered
                opened = {opened} onClose={()=>setOpened(false)}>
                    <DaySlots completed = {()=>setOpened(false)} experiment={experiment.id}/>
                </Modal>
<Stack gap="sm">
      <Group   mt="xs" justify="flex-end">
        <Badge radius="sm" bg = "yellow.2" c="dark">OPEN</Badge>
      </Group>

      <Text fz="lg" fw={800} mt="md">
        {experiment.title}
      </Text>
      <Text fz="sm" c="dimmed" mt={5}>
        {experiment.shortDescription}
      </Text>


      <Text c="dimmed" fz="sm" mt="md">
        Places Filled:{' '}
        <Text span fw={500} c="bright">
          {`${experiment.signUps}/${experiment.places}`}
        </Text>
      </Text>
      


      <Progress value={(experiment.signUps / experiment.places) * 100} mt={5} aria-label="Task completion" color="teal.2"/>
       <Drawer  position="right" size="lg" 
       
       
       opened={openDraw} onClose={close} 
       title={<Title>Details</Title>}

       >
        <Stack>
        <TextComponent text_ast={experiment.experiment_info} />
        <Divider my="md"/>
            <Text fw={600}>Researchers</Text>
        </Stack>
        {/* Drawer content */}
      </Drawer>

     

      <Group justify="left" mt="md">
        <Button 
        variant="default"
        onClick={open}
        leftSection = {<IconInfoSquare size={24}/>}
        >
        Details
      </Button>
              <Button
              //component="a"
              // 
              // 
              // 
              // href="./experiments/1"
              onClick={()=>setOpened(true)}
              
              leftSection={<IconContract size={18} />} >Sign up</Button>
               

       
        
      </Group>
      </Stack>
    </Card>
  );
}