import Container from '../../components/Container/Container.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';

import css from './LoginPage.module.css';

function LoginPage() {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.wrapper}>
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
export default LoginPage;
