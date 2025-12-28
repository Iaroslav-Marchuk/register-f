import { CirclePlus } from 'lucide-react';

import Container from '../../components/Container/Container.jsx';
import RegistrationTable from '../../components/RegistrationTable/RegistrationTable.jsx';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay.jsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';

import { useState } from 'react';

import css from './MainPage.module.css';
import Summary from '../../components/Summary/Summary.jsx';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <button type="button" className={css.btn} onClick={openModal}>
            <CirclePlus className={css.icon} size={20} strokeWidth={1.5} />
            Adicionar encomenda
          </button>

          <div className={css.info}>
            <span className={css.span}>Linha: 1</span>
            <span className={css.span}>Responsavel: Coloborador1</span>
            <span className={css.span}>{`Data: ${date}`}</span>
          </div>
        </div>

        <RegistrationTable />
        <Summary />
      </Container>

      <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm />
      </ModalOverlay>
    </section>
  );
}
export default MainPage;
