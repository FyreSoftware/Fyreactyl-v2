/* eslint-disable react/jsx-props-no-spreading */

import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Notifier } from '../components/Notifier';
import theme from '../lib/styles/theme';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Loading...</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      <Notifier />
    </ThemeProvider>
  );
}
