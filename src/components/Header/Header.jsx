import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import Navigation from '../Navigation/Navigation.jsx';
import Container from '../Container/Container.jsx';

import css from './Header.module.css';
import ModalSideBar from '../ModalSideBar/ModalSideBar.jsx';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import { useState } from 'react';
import { Menu } from 'lucide-react';

function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const openMobileMenu = () => setMobileMenuIsOpen(true);
  const closeMobileMenu = () => {
    setMobileMenuIsOpen(false);
  };

  const handleClick = () => {
    openMobileMenu();
  };

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <NavLink to="main">
          <img src={logo} alt="logo" className={css.logo} />
        </NavLink>
        <button className={css.burgerBtn} onClick={handleClick}>
          <Menu className={css.icon} size={32} strokeWidth={2} />
        </button>
        <Navigation />
      </Container>

      <ModalSideBar isOpen={mobileMenuIsOpen} onClose={closeMobileMenu}>
        <MobileMenu onClose={closeMobileMenu} />
      </ModalSideBar>
    </header>
  );
}
export default Header;
