import { Outlet } from 'react-router-dom';

import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

import css from './Layout.module.css';

function Layout() {
  return (
    <div className={css.layout}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
