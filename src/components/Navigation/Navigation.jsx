import { ChartLine, CircleUserRound, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink to="/stats" className={css.link}>
        <ChartLine size={32} color="#0000ff" strokeWidth={1.5} />
      </NavLink>
      <NavLink to="/profile" className={css.link}>
        <CircleUserRound size={32} color="#0000ff" strokeWidth={1.5} />
      </NavLink>
      <button type="button" className={css.link}>
        <LogOut size={32} color="#0000ff" strokeWidth={1.5} />
      </button>
    </nav>
  );
}
export default Navigation;
