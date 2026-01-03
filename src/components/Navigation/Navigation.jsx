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
        className={css.link}
        data-tooltip="Registo"
        aria-label="Registo"
      >
        <FilePlusCorner className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/report"
        className={css.link}
        data-tooltip="Relatórios"
        aria-label="Relatórios"
      >
        <ListCheck className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/stats"
        className={css.link}
        data-tooltip="Estatísticas"
        aria-label="Estatísticas"
      >
        <ChartLine className={css.icon} size={32} strokeWidth={1.5} />
      </NavLink>
      <NavLink
        to="/profile"
        className={css.link}
        data-tooltip="Perfil"
        aria-label="Perfil"
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
