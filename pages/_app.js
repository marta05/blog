export function reportWebVitals(metric) {
  console.log(metric)
}

import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, Toolbar } from '@mui/material';
import Header from "../components/Layout/Header";
import Container from "@mui/material/Container";
import Footer from '../components/Layout/Footer'

import { SessionProvider } from "next-auth/react";

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props){
  const {Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Blogging App</title>
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Header 
        />
        <Toolbar>
          <Container
              maxWidth="lg"
              sx={{ display: `flex`, flexDirection: 'column', minHeight: '83vh'}}
            >
          <Component {...pageProps} />
        </Container>
        </Toolbar>
        <Footer/>
      </ThemeProvider>
    </CacheProvider>
    </SessionProvider>
  );
};