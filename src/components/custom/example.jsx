'use client'

import React from 'react'
    import { useField } from '@payloadcms/ui'

import { useConfig } from '@payloadcms/ui'
export let example = ({exampleProp,field}) =>{

    const { value, setValue } = useField() 



    
     const {config} = useConfig()

     console.log(config)

    return <div>
        <p>{exampleProp}</p>
        <p>{value}</p>
        <button onClick = {()=>setValue(value+1 || 1)}>Press me</button>
    </div>
}