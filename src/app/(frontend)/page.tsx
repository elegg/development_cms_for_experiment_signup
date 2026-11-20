import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import Timeline from './timeline'
import config from '@/payload.config'
import './styles.css'

import Link from 'next/link';
import { Button, Text } from '@mantine/core';

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const images = await payload.find({
  collection: 'media',
})

  return (
    <div className="home">
      <Link href="/user">User</Link>
      <a href="/api/users/auth/ms">Continue with AAI Identity</a>
  
      <div className="content">
       
        {!user && <h1>....</h1>}
        {user && <h1>You are now logged in: {user.email}</h1>}
  
    </div>
    </div>
  )
}
