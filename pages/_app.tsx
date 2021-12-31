import { AppProps } from 'next/app';
import Head from 'next/head';
import AppLayout from '../components/layout/app_layout';
import '../styles/index.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>ACM</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </div>
  );
}

export default App;
