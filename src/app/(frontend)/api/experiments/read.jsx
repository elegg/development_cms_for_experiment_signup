'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getExperiments(query = {}) {
  const payload = await getPayload({ config })

   // let query = args.id ? {where:{id:{equals:args.id}}} :{}

  try {
    const post = await payload.find({
      collection: 'experiment',
      ...query,
      limit:10
      //...{where:{"participant.id":{not_equals:1}}}
    })
    return post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}