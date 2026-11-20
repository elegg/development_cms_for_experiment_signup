
import {
  generatePayloadCookie,
  jwtSign,
  Payload,
  

} from 'payload'
import crypto from 'crypto'

import { type User } from '@/payload-types'

export async function generate_signed_auth_cookie(payload: Payload, user:User){
const collection = payload.collections['users']
      const authConfig = collection.config.auth


      console.log({collection, authConfig})
      const secret = crypto
        .createHash('sha256')
        .update(payload.config.secret)
        .digest('hex')
        .slice(0, 32)
 
      const { token } = await jwtSign({
        fieldsToSign: {
          _strategy: undefined,//user._strategy ?? undefined,
          collection: 'users',
          email: "testing@test-insert.com",//user.email,
          id: 6,///user.id,
          sid: user?._sid || undefined,
        },
        secret,
        tokenExpiration: authConfig.tokenExpiration,
      })
 
      const cookies = generatePayloadCookie({
        collectionAuthConfig: authConfig,
        cookiePrefix: payload.config.cookiePrefix,
        token: token 
      })


      
      
 
      // 'client' can be adjusted to your client-facing dashboard.
      //headers.set('Location', `${getServerSideURL()}/${clientFlag ? 'client' : 'admin'}`)
      return cookies
    }