'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSlot(query) {
  const payload = await getPayload({ config })

  try {
    const post = await payload.find({
      collection: 'study_slot',
      ...query

    })
    return post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}

