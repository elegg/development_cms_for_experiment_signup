



import crypto from 'crypto'
import { type Endpoint, type PayloadRequest } from 'payload'
import { msalClient } from './msClient'

const CALLBACK_URL = 'http://localhost:3000/api/users/auth/ms/callback'


export  const msAuth: Endpoint = {
  handler: async (req: PayloadRequest): Promise<Response> => {

const authCodeUrlParameters = {
    scopes: ['openid', 'profile'],
    redirectUri: CALLBACK_URL
  };

  // Generate the authorization URL
          const authUrl = await msalClient.getAuthCodeUrl(authCodeUrlParameters);

           return  Response.redirect(authUrl);
        },
    





  
    /*
    const url = new URL(req.url ?? '')
    const consentFlag = url.searchParams.get('force_consent') === 'true'
	
    // The query parameter name (`client_login`) is arbitrary and can be changed
    // Example: https://example.com/login?client_login=true
    // This flag is later used to determine whether the user is redirected
    // to a client-facing route or the admin interface after authentication.
    const clientFlag = url.searchParams.get('client_login') === 'true'
 
    const oauth2Client = new google.auth.OAuth2({
      clientId,
      clientSecret,
      redirectUri: `${getServerSideURL()}/api/users/auth/google/callback`,
    })
 
    try {
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = generateCodeChallenge(codeVerifier)
      const state = crypto.randomUUID()
 
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        code_challenge: codeChallenge,
        code_challenge_method: CodeChallengeMethod.S256,
        prompt: consentFlag ? 'consent' : 'none',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        state,
      })
 
      // codeVerifier: Used for PKCE validation during the token exchange
      // oauthState: Validated on callback to prevent CSRF and code injection
      // clientFlag: Carries routing intent so we know where to redirect the user
      const headers = new Headers()
      appendCookie(headers, 'codeVerifier', codeVerifier)
      appendCookie(headers, 'oauthState', state)
      appendCookie(headers, 'clientFlag', clientFlag ? 'true' : '')
 
      headers.set('Location', authUrl.toString())
      return new Response(null, {
        headers,
        status: 302,
      })
    } catch {
      const headers = new Headers()
      headers.set(
        'Location',
        `${getServerSideURL()}/${clientFlag ? 'client' : 'admin/login'}?error=oauth_failed`
      )
        
      return new Response(null, {
        headers,
        status: 302,
      })
    }
  },
  */
  method: 'get',
  path: '/auth/ms',
}