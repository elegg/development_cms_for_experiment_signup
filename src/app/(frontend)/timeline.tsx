'use client'
import { Timeline } from '@mantine/core';

let  MyTimeline = ()=>{
     return <Timeline active={1} bulletSize={25}>
        <Timeline.Item title="testing">A</Timeline.Item>
        <Timeline.Item title="testing">A</Timeline.Item>

        </Timeline>

}
export default MyTimeline