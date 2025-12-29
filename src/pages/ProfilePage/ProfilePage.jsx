import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { SlidersHorizontal, Activity, UserRound, DoorOpen } from 'lucide-react';

import Container from '../../components/Container/Container.jsx';

import css from './ProfilePage.module.css';

function ProfilePage() {
  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Perfil do utilizador</h1>
        <div className={css.wrapper}>
          <aside className={css.sideBar}>
            <div className={css.avatar}>I</div>
            <NavLink
              to="details"
              className={({ isActive }) =>
                clsx(css.link, isActive && css.active)
              }
            >
              <UserRound className={css.icon} size={20} strokeWidth={1.5} />
              Perfil do utilizador
            </NavLink>
            <NavLink
              to="activity"
              className={({ isActive }) =>
                clsx(css.link, isActive && css.active)
              }
            >
              <Activity className={css.icon} size={20} strokeWidth={1.5} />
              Actividade
            </NavLink>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                clsx(css.link, isActive && css.active)
              }
            >
              <SlidersHorizontal
                className={css.icon}
                size={20}
                strokeWidth={1.5}
              />
              Definições
            </NavLink>
            <button type="button" className={`${css.link} ${css.btn}`}>
              <DoorOpen className={css.btnIcon} size={20} strokeWidth={1.5} />
              Saír
            </button>
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
