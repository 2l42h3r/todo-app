import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import SessionGuardHoc from '../components/SessionGuardHoc';
import type { ICustomAppProps } from './_app.types';
import DynamicApolloProvider from '../components/DynamicApolloProvider';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: ICustomAppProps) {
  return (
    <SessionProvider session={session}>
      <SessionGuardHoc>
        <DynamicApolloProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DynamicApolloProvider>
      </SessionGuardHoc>
    </SessionProvider>
  );
}

export default CustomApp;
