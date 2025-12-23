import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import Navigation from '../Navigation/Navigation.jsx';

import css from './Header.module.css';

function Header() {
  return (
    <header className={css.header}>
      <NavLink to="main">
        <img src={logo} alt="logo" className={css.logo} />
      </NavLink>
      <span className={css.span}>Controlo de produção</span>
      <Navigation />
    </header>
  );
}
export default Header;
