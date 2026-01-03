import Container from '../../components/Container/Container.jsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';

import css from './RegistrationPage.module.css';

function RegistrationPage() {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.wrapper}>
          <RegistrationForm />
        </div>
      </Container>
    </section>
  );
}
export default RegistrationPage;
