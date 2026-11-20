
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateCollection(collection, id, data) {
  const payload = await getPayload({ config })

   // let query = args.id ? {where:{id:{equals:args.id}}} :{}
console.log("updating")
  try {
    const post = await payload.update({
      collection: collection,
      id,
      data:{ places:10, shortDescription:"NOW UPDATED : V10", title:"NEW TITLE :V10" },
    })
    return post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}
