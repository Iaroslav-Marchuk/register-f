import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';

import css from './AuthPage.module.css';

function AuthPage() {
  return (
    <div className={css.wrapper}>
      <img src={logo} alt="logo" className={css.logo} />
      <div className={css.btns}>
        <NavLink to="login" className={css.btn}>
          Login
        </NavLink>
        <NavLink to="register" className={css.btn}>
          Registar-se
        </NavLink>
      </div>
      {<Outlet />}
    </div>
  );
}
export default AuthPage;
