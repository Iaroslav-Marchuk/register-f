import { CirclePlus } from 'lucide-react';

import Container from '../../components/Container/Container.jsx';
import Table from '../../components/Table/Table.jsx';

import css from './MainPage.module.css';

function MainPage() {
  const date = new Date().toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Controlo de produção vidro duplo</h1>
        <div className={css.wrapper}>
          <button type="submit" className={css.btn}>
            <CirclePlus className={css.icon} size={20} strokeWidth={1.5} />
            Adicionar encomenda
          </button>

          <div className={css.info}>
            <span className={css.span}>Linha: 1</span>
            <span className={css.span}>Responsavel: Coloborador1</span>
            <span className={css.span}>{`Data: ${date}`}</span>
          </div>
        </div>

        <Table />
      </Container>
    </section>
  );
}
export default MainPage;
