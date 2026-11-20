'use client'


import { AppShell,  Burger, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Crumbs from  './crumbs'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

let queryClient = new QueryClient()

export default function Layout({Nav, Main, path}) {
      
  const [opened, { toggle }] = useDisclosure();

  return <QueryClientProvider client={queryClient}><AppShell  padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}>
        <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <AppShell.Navbar p="lg">
            {Nav}

        </AppShell.Navbar>
        </AppShell.Header>
        <AppShell.Main bg="gray.0" >
            
            <Crumbs path={path}/>
            <Stack>
            {Main}
            </Stack>


  
  </AppShell.Main>


  </AppShell>
  </QueryClientProvider>
  
}
