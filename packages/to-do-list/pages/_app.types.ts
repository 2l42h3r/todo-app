import { Session } from 'next-auth';
import type { AppProps } from 'next/app';

export interface ICustomAppProps extends AppProps {
  pageProps: Record<string, unknown> & {
    session?: (Session & { accessToken?: string }) | null;
  };
}
