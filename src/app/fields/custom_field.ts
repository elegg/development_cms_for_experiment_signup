import type { Field } from 'payload'

export const MyUIField: Field = {
    name:"custom-field",
  type: 'ui',
  admin:{
    
        components: {
          Field: '/components/example#example',
          Cell: '/components/example#example',
        },
      

  }
}