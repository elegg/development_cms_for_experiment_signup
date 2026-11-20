import type { CollectionConfig } from 'payload'
import {msAuth} from '../auth/msAuthRoute'
import { msAuthCallback } from '@/auth/msCallback'

const CLIENT_ID = '545f79f5-16f5-481e-9a57-3880c714a2b0'  //Replace with your Application (client) ID
const REDIRECT_URI = 'http://localhost:8000/callback'
const AUTH_BASE_URL = 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize'
const TOKEN_URL = 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'


export const AuthUsers: CollectionConfig = {
  slug: 'authusers',
  fields:[],
 /* auth:{
    cookies: {
      domain: process.env.NEXT_PUBLIC_SERVER_HOSTNAME!,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: true,
    },
    maxLoginAttempts: 5,
    //strategies: [],
    tokenExpiration: 60 * 60 * 24 * 7,
    useSessions: true,
  },
  },
  
  
  //auth: true,


  fields: [
    // Email added by default
    // Add more fields as needed
  ],
   endpoints:[
    msAuth,
    msAuthCallback,
   


{
      path: '/custom_auth',
      method: 'get',
      handler: async (req) => {
        
        return Response.json({
          message: `Hello WORLD`,
        })
      },
    },
{
    path: '/custom_auth',
      method: 'post',
      handler: async (req) => {

        //const d = await req.json()

        //console.log(d)




        
        return Response.json({
          message: `Hello WORLD`,
        })
      },
    }
]
*/
}
