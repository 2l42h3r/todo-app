import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactChild } from 'react';

const SessionGuardHoc = ({
  children,
}: {
  children: ReactChild;
}): JSX.Element => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    void router.push({ pathname: '/api/auth/signin' });
  }

  return <>{children}</>;
};

export default SessionGuardHoc;
