'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateParticipantSlot(id) {
  const payload = await getPayload({ config })

 // let query = args.id ? {where:{id:{equals:args.id}}} :{}

  try {
    const post = await payload.update({
      collection: 'study_slot',
      id:id,
      data:{participant:1}

    })
    console.log(post)
    return post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}

