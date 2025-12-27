import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import Navigation from '../Navigation/Navigation.jsx';
import Container from '../Container/Container.jsx';

import css from './Header.module.css';

function Header() {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <NavLink to="main">
          <img src={logo} alt="logo" className={css.logo} />
        </NavLink>
        <Navigation />
      </Container>
    </header>
  );
}
export default Header;
