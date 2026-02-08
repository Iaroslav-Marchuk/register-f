import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { SlidersHorizontal, Activity, UserRound, DoorOpen } from 'lucide-react';

import Container from '../../components/Container/Container.jsx';

import css from './ProfilePage.module.css';
import { useState } from 'react';
import { logOut } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay.jsx';
import ConfirmContainer from '../../components/ConfirmContainer/ConfirmContainer.jsx';

function ProfilePage() {
  const dispatch = useDispatch();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success('Sessão terminada com sucesso!');
      closeConfirm();
    } catch (error) {
      toast.error('Falha ao terminar a sessão. ' + error);
    }
  };

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
              Utilizador
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
            <button
              type="button"
              className={`${css.link} ${css.btn}`}
              onClick={openConfirm}
            >
              <DoorOpen className={css.btnIcon} size={20} strokeWidth={1.5} />
              Saír
            </button>
          </aside>
          <div className={css.content}>
            <Outlet />
          </div>
        </div>
        <ModalOverlay isOpen={isConfirmOpen} onClose={closeConfirm}>
          <ConfirmContainer
            text={'Tem a certeza que quer saír?'}
            onConfirm={handleLogout}
            onClose={closeConfirm}
          />
        </ModalOverlay>
      </Container>
    </section>
  );
}

export default ProfilePage;
