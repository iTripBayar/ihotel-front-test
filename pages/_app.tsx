// import { AppStateProvider } from '../path/to/appStateContext';
import { AppStateProvider } from '@/contexts/appStateContext';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}

export default MyApp;
