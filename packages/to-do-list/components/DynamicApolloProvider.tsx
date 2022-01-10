import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { useSession } from 'next-auth/react';
import { ReactChild, useRef } from 'react';
import createClient from '../graphql/createClient';

const DynamicApolloProvider = ({
  children,
}: {
  children: ReactChild;
}): JSX.Element => {
  const { data } = useSession();

  const clientRef = useRef<null | ApolloClient<NormalizedCacheObject>>(null);

  if (data?.accessToken && !clientRef.current) {
    clientRef.current = createClient(data?.accessToken);
  }

  if (!clientRef.current) {
    return null;
  }

  return <ApolloProvider client={clientRef.current}>{children}</ApolloProvider>;
};

export default DynamicApolloProvider;
