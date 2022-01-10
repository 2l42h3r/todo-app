import { useSession } from 'next-auth/react';

const Navbar = (): JSX.Element => {
  const { data: session, status } = useSession();

  return (
    <div className="sticky w-full h-20 bg-blue-600 text-white px-8 flex items-center">
      <nav
        className={
          'w-full h-1/2 grid grid-flow-row grid-cols-3 text-center justify-items-center'
        }
      >
        <div></div>
        <div className={'text-2xl'}>Welcome to ToDo List</div>
        <div className="ml-auto">
          {status === 'authenticated' && <>Logged in as: {session.user.name}</>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
