
import { 
    type Endpoint,
     parseCookies, 
     type PayloadRequest,
  type SanitizedPermissions, 
  generatePayloadCookie, 
  jwtSign,
  type TypedUser
 } from 'payload'

import { clearCookie } from './cookies'
import crypto from 'crypto'

import { msalClient } from './msClient'
interface AuthResult {
  permissions: SanitizedPermissions
  responseHeaders?: Headers
  user:
    | null
    | (TypedUser & {
        _sid?: string
        _strategy?: string
        collection: 'users'
      })
}


const CALLBACK_URL = 'http://localhost:3000/api/users/auth/ms/callback'

export  const msAuthCallback: Endpoint = {
  handler: async (req: PayloadRequest): Promise<Response> => {



     const url = new URL(req.url || "")
     const code = url.searchParams.get('code') || ""
    const error = url.searchParams.get('error')
    const state = url.searchParams.get('state')

    const user_id = url.searchParams.get("user") || null
 
    const cookie = parseCookies(req.headers)
    const codeVerifier = cookie.get('codeVerifier')
    const oauthState = cookie.get('oauthState')
    const clientFlag = cookie.get('clientFlag') === 'true'


 


    const tokenRequest = {
    code: code,
    scopes: ['openid', 'profile'],
    redirectUri: CALLBACK_URL,
    client_secret:process.env.MS_SECRET || ""
  };

  try {
    
 
    const headers = new Headers()
    clearCookie(headers, 'codeVerifier')
    clearCookie(headers, 'oauthState')
    clearCookie(headers, 'clientFlag')
   
    const payload = req.payload

     const authResult = await payload.auth({
            headers: new Headers({
            'x-auth-strategy': 'ms',
            'x-oauth-code': `${0}`,
            'x-oauth-verifier': codeVerifier || "",
            'code':code
        })})


    const { user } = authResult as AuthResult

    if(!user){
        throw Error("No user")
    }



//if(!user){
     // let x = await  payload.db.drizzle.insert(payload.db.tables["users"]).values({email:"edward.legg@uniri.hr", username:"edward.legg@uniri.hr"})

       // console.log(x)

       // let y = await  payload.db.drizzle.select().from(payload.db.tables["session"])
  
        //let x = await  payload.db.drizzle.select().from(payload.db.tables["user_sessions"])
   // }

    /*

    console.log({user})
    
*/
     const now = new Date()
      const tokenExpInMs = (7200) * 1000
      const expiresAt = new Date(now.getTime() + tokenExpInMs)

       const session = {
          createdAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          id: crypto.randomUUID()}

       let user_update =  await payload.db.updateOne({
        collection: 'users',
        data: {
        
          sessions: [session]
        },
        id:user?.id,
        returning: true,
      })

       const collection = payload.collections['users']
      const authConfig = collection.config.auth

      const secret = crypto
        .createHash('sha256')
        .update(payload.config.secret)
        .digest('hex')
        .slice(0, 32)

      const { token } = await jwtSign({
        fieldsToSign: {
          _strategy: user._strategy ?? undefined,
          collection: 'users',
          email: user.email,
          id: user.id,
          sid: session.id,
        },
        secret,
        tokenExpiration: authConfig.tokenExpiration,
      })
 
      const cookies = generatePayloadCookie({
        collectionAuthConfig: authConfig,
        cookiePrefix: payload.config.cookiePrefix,
        token: token!,
      })

      

       // let cookie = await generate_signed_auth_cookie(payload, user_update)
        console.log(cookie)
        


headers.set('Location', 'http://localhost:3000/')
    headers.append('Set-Cookie', cookies)
       
        

    // use token now and save it for call graph api
    return new Response(null, {headers, status:302})//Response.json({v:'Authentication successful!'});
  } catch (error) {
    // Handle the token acquisition error
    console.log(error);
   return Response.json({v:'Authentication successful!'});
  }
},
   method: 'get',
  path: '/auth/ms/callback',



}