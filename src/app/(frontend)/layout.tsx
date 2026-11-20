
import React from 'react'
import './styles.css'
import {
  QueryClientProvider,
} from '@tanstack/react-query'

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';

import { Notifications } from '@mantine/notifications';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps , createTheme} from '@mantine/core';

export const metadata = {
  title: 'Experiment Sign Up',
  description: 'Sign up for Experiments at the University of Rijeka',
};
const myColor: MantineColorsTuple = [
  '#e3fff6',
  '#d0fced',
  '#a3f8da',
  '#72f3c6',
  '#4bf0b5',
  '#33eeaa',
  '#23eda4',
  '#10cc8a',
  '#00bb7d',
  '#00a26a'
];

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',

  
  primaryColor: 'teal',
    defaultRadius:2,

});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications/>
          
           {children}</MantineProvider>
      </body>
    </html>
  );
}

