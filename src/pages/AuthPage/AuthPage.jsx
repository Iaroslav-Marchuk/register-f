import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

import css from './AuthPage.module.css';
import Container from '../../components/Container/Container.jsx';

function AuthPage() {
  return (
    <section className={css.section}>
      <Container>
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
        </div>
      </Container>
    </section>
  );
}
export default AuthPage;
