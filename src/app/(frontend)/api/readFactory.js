'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getCollection(collection, query={}) {
  const payload = await getPayload({ config })

  try {
    const post = await payload.find({
      collection: collection,
      ...query,
      limit:10
    })
    return post
  } catch (error) {
    throw new Error(`Error finding${collection}: ${error.message}`)
  }
}
