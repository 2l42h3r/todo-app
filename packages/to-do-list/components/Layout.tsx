import { ReactChild } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactChild }): JSX.Element => (
  <>
    <Navbar />
    <main className="p-8">{children}</main>
  </>
);

export default Layout;
