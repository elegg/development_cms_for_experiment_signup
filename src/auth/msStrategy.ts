import { type AuthStrategy, type AuthStrategyResult } from 'payload'
import { type User } from '@/payload-types'

import { parseCookies } from 'payload'

import { msalClient } from './msClient'

const CALLBACK_URL = 'http://localhost:3000/api/users/auth/ms/callback'
const provider = "ms"
interface SessionUser extends User {
    _sid?: string
    _strategy?: string
    collection: 'users'
}

export const removeExpiredSessions = (
    sessions: {
        createdAt?: null | string
        expiresAt: string
        id: string
    }[],
) => {
    const now = new Date()
    return sessions.filter(({ expiresAt }) => new Date(expiresAt) > now)
}

export const msStrategy: AuthStrategy = {
    async authenticate({ headers, payload }): Promise<AuthStrategyResult> {


        console.log("running auth strategy")
    
        let user_id = headers.get("x-oauth-code")



        const code2 = headers.get("x-auth-code")
        //const url = new URL(req?.url || "")
        const code = headers.get('code') || ""
        const email = headers.get('email') || ""

        const token = headers.get('token') || ""

        const codeVerifier = headers.get("x-auth-verifier")
        let xcode = headers.get("x-auth-code")
        const strategy = headers.get("x-auth-strategy")

        console.log({ codeVerifier, xcode, strategy })



        if (!(code || token)) {
            return { user: null }
        }




        const provider = "ms" as const

        const tokenRequest = {
            code: code,
            scopes: ['openid', 'profile'],
            redirectUri: CALLBACK_URL || "",
            client_secret: process.env.MS_SECRET || ""
        };


        // early return if auth not relevant here
        // if (strategy !== provider) return { user: null }
        // if (!code || !codeVerifier) return { user: null }


        try {

            const response = await msalClient.acquireTokenByCode(tokenRequest);


            console.log({response})

            let url = "https://graph.microsoft.com/beta/me"

            let bearer = 'bearer ' + response.accessToken
            let res = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': bearer
                }
            })


            let profile = await res.json()

            console.log({ profile }, profile.mail)




            let email = profile.mail

            let existing_user = await payload.db.findOne({ collection: "users", where: { email: { equals: email } } })


            let added_user = {}
            if (!existing_user) {
                let added_users = await payload.db.drizzle.insert(payload.db.tables["users"]).values({ email: email, username: email }).returning() as any
                added_user = added_users[0]

            }



            const user = (
                await payload.find({
                    collection: 'users',
                    limit: 1,
                    pagination: false,
                    showHiddenFields: true,
                    where: { email: { equals: existing_user?.email || added_user?.email } }/*{
                        email: {
                        equals: email,
                        },
                    }*/,
                })
            ).docs[0] as SessionUser



            let sid: string | undefined
            const now = new Date()
            const tokenExpInMs = (7200) * 1000
            const expiresAt = new Date(now.getTime() + tokenExpInMs)

            sid = crypto.randomUUID()
            const session = {
                createdAt: now.toISOString(),
                expiresAt: expiresAt.toISOString(),
                id: sid,
            }


            user["sessions"] = Array.isArray(user?.sessions)
                ? [...removeExpiredSessions(user.sessions || []), session]
                : [session]



            let x = await payload.db.updateOne({
                collection: 'users',
                data: {
                    sessions: user.sessions,
                },
                id: user.id,
                returning: true,
            })

            const sessionUser: SessionUser = {
                ...x,
                _sid: sid,
                _strategy: provider,
                collection: 'users',
            }

            return { user: sessionUser }

        } catch (error) {
            console.error('MSFT authentication error:', error)
            return { user: null }
        }
    },
    name: 'ms',


}