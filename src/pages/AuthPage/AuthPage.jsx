import logo from '../../assets/logo.png';

import css from './AuthPage.module.css';

function AuthPage() {
  return (
    <div className={css.wrapper}>
      <img src={logo} alt="logo" className={css.logo} />
      <div className={css.btns}>
        <button type="submit" className={css.btn}>
          Login
        </button>
        <button type="submit" className={css.btn}>
          Registar-se
        </button>
      </div>
    </div>
  );
}
export default AuthPage;
