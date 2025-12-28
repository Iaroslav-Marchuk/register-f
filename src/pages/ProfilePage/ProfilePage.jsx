import { NavLink, Outlet } from 'react-router-dom';

import Container from '../../components/Container/Container.jsx';

import css from './ProfilePage.module.css';

function ProfilePage() {
  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Perfil do utilizador</h1>
        <div className={css.wrapper}>
          <aside className={css.sideBar}>
            <button type="button">Dark mode</button>
            <NavLink to="details">Perfil do utilizador</NavLink>
            <NavLink to="activity">Actividade</NavLink>
            <NavLink to="settings">Definições</NavLink>
            <button type="button">Saír</button>
          </aside>
          <div className={css.content}>
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProfilePage;
