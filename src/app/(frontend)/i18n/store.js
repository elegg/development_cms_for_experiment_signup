import {atom, computed, batch, map, mapCreator, effect} from 'nanostores'
import { useStore } from '@nanostores/react';
import { TextInput , Button, NumberInput, Group, Stack, Text, Title} from '@mantine/core';


let  $i18n_mappings = map({
    save:{"en":"Save", hr:"Snimi"},
     preview:{"en":"Preview", hr:"Pregled"},
     edit:{"en":"Edit", hr:"Uredi"},
     places:{"en":"Places", hr:"Mjesto"},
     title:{"en":"Title", hr:"Title"},
    shortdescription:{"en": "Short Description", hr:"Kratki opis"}


})



let $language = atom("hr")

export let useLanguage =()=> useStore($language)

export let $labels = computed([$i18n_mappings, $language], (mappings, language)=>{

    let res = {}
    Object.keys(mappings).forEach(m=>res[m]=mappings[m][language])
    return res
})

export let IntButton = (args)=>{

        let labels =  useStore($labels)

    return <Button {...args} >{labels[args.children.toLowerCase()]}</Button>
}

export let IntText = ({children})=>{
            let labels =  useStore($labels)
            return labels[children.toLowerCase()] || children
}
