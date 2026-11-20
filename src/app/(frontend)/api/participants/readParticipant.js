'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
export async function getParticipant(query) {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  //let query = args.id ? {where:{id:{equals:args.id}}} :{}

  try {
    const post = await payload.find({
      collection: 'participant',
      user:user,
      ...query,
     overrideAccess:false

    })
    return post
  } catch (error) {
    throw new Error(`Error reading participant: ${error.message}`)
  }
}
