
import { Avatar, Divider, Group, Paper, Text, Typography, Container, Box, Timeline, Stack } from '@mantine/core';
import { Editor } from './editor';

export function MessageText({text}) {
  return (
    <Paper withBorder radius="md" /*className={classes.comment}*/>
      <Box p="md"  bg="teal.0" >
        <Container >
          <Text fz="sm" fw="600">Jacob Warnhalter</Text>
          <Text fz="xs" c="dimmed">
            10 minutes ago
          </Text>
        </Container>
      </Box>
      <Box p="md">
      <Text>{text}</Text>
      </Box>
    </Paper>
  );
}

export function TextTimeline({messages}){

    return <><Timeline p="xs" m="xs" active={-1} bulletSize={24} lineWidth={2}>
       
        {messages.map((m, i)=><Timeline.Item opposite alternate ={i ==1}>
        <MessageText text={m.text} />
         </Timeline.Item>)
        
        }
       </Timeline>
           <Editor/>
           </>

}

export function TextTimeline1({messages}){

    return <Stack style={{borderLeft:"black 1px dashed"}}>{messages.map(m=>
    <MessageText text={m.text}  />
    



)}</Stack>
   
  
}