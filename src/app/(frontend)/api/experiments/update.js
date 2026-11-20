

'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function createExperiment(query = {}) {
  const payload = await getPayload({ config })

   // let query = args.id ? {where:{id:{equals:args.id}}} :{}
console.log("updating", query)
  try {
    const post = await payload.update({
      collection: 'experiment',
      id:"1",
      data:{id:"1", places:query.places, shortDescription:query.shortDescription, title:query.title },
    })
    return post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}