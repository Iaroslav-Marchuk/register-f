import {
  ChartLine,
  CircleUserRound,
  LogOut,
  ListCheck,
  FilePlusCorner,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { logOut } from '../../redux/auth/operations.js';
import { useState } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import ConfirmContainer from '../ConfirmContainer/ConfirmContainer.jsx';
import clsx from 'clsx';

function Navigation() {
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
    <nav className={css.navigation}>
      <NavLink
        to="/main"
        data-tooltip="Registo"
        aria-label="Registo"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <FilePlusCorner className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/report"
        data-tooltip="Relatórios"
        aria-label="Relatórios"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <ListCheck className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/stats"
        data-tooltip="Estatísticas"
        aria-label="Estatísticas"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <ChartLine className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/profile"
        data-tooltip="Perfil"
        aria-label="Perfil"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <CircleUserRound className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <button
        type="button"
        className={css.link}
        data-tooltip="Saír"
        aria-label="Saír"
        onClick={openConfirm}
      >
        <LogOut className={css.icon} size={32} strokeWidth={1.5} />
      </button>

      <ModalOverlay isOpen={isConfirmOpen} onClose={closeConfirm}>
        <ConfirmContainer
          text={'Tem a certeza que quer saír?'}
          onConfirm={handleLogout}
          onClose={closeConfirm}
        />
      </ModalOverlay>
    </nav>
  );
}
export default Navigation;
