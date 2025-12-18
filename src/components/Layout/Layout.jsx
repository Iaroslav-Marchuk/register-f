import { Outlet } from 'react-router-dom';

import css from './Layout.module.css';

function Layout() {
  return (
    <div className={css.container}>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
