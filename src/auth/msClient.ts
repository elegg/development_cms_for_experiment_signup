const strategy = {}
import {ClientAssertion, ConfidentialClientApplication, PublicClientApplication} from '@azure/msal-node'
const clientId = process.env.MS_CLIENT_ID ||""
const clientSecret = process.env.MS_SECRET ||""
const tenantId = process.env.MS_TENANT_ID ||clientId


const CALLBACK_URL = 'http://localhost:3000/api/users/auth/ms/callback'


const msalConfig = {
  auth: {
    clientId: clientId,
    clientSecret: clientSecret,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    ClientAssertion: CALLBACK_URL
  },
  system: {
    loggerOptions: {
     /* loggerCallback(loglevel, message, containsPii) {
        console.log(message);*/
      },
      piiLoggingEnabled: false,
     // logLevel: LogLevel.Info
    }
  }


export const msalClient = new ConfidentialClientApplication(msalConfig);
