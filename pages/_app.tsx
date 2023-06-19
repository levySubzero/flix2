import Head from 'next/head';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <Head>
        <link rel="icon" type="image/x-icon" href="/ico.svg" />
    </Head>
     <Component {...pageProps} />
    </>
  )     
}
