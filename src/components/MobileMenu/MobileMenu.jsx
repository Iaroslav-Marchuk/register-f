import { useDispatch } from 'react-redux';
import css from './MobileMenu.module.css';
import { logOut } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import {
  ChartLine,
  CircleUserRound,
  FilePlusCorner,
  ListCheck,
  LogOut,
} from 'lucide-react';

function MobileMenu({ onClose }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success('Sessão terminada com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Falha ao terminar a sessão. ' + error);
    }
  };

  return (
    <nav className={css.navigation}>
      <NavLink
        onClick={onClose}
        to="/main"
        data-tooltip="Registo"
        aria-label="Registo"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <FilePlusCorner className={css.icon} size={32} strokeWidth={1.5} />
        Novo registo
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/report"
        data-tooltip="Relatórios"
        aria-label="Relatórios"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <ListCheck className={css.icon} size={32} strokeWidth={1.5} />
        Todos os registos
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/stats"
        data-tooltip="Estatísticas"
        aria-label="Estatísticas"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <ChartLine className={css.icon} size={32} strokeWidth={1.5} />
        Estatísticas
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/profile"
        data-tooltip="Perfil"
        aria-label="Perfil"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        <CircleUserRound className={css.icon} size={32} strokeWidth={1.5} />
        Profile do utilizador
      </NavLink>
      <button
        type="button"
        className={css.link}
        data-tooltip="Saír"
        aria-label="Saír"
        onClick={handleLogout}
      >
        <LogOut className={css.icon} size={32} strokeWidth={1.5} />
        Sair
      </button>
    </nav>
  );
}

export default MobileMenu;
