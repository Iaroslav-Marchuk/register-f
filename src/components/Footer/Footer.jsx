import Container from '../Container/Container.jsx';

import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <Container className={css.container}>
        <p className={css.text}>© Copyright 2025 Vidreira Algarvia</p>
      </Container>
    </footer>
  );
}
export default Footer;
