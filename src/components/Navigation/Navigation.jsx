import {
  ChartLine,
  CircleUserRound,
  LogOut,
  ListCheck,
  FilePlusCorner,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

function Navigation() {
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
        data-tooltip="Sair"
        aria-label="Sair"
      >
        <LogOut className={css.icon} size={32} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
export default Navigation;
