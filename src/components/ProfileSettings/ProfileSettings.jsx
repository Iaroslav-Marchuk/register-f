import { useState } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import css from './ProfileSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { changeLocal } from '../../redux/auth/operations.js';
import ChangePassForm from '../ChangePassForm/ChangePassForm.jsx';
import ThemeTogle from '../ThemeTogle/ThemeTogle.jsx';

function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentLocal = user.local;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [location, setLocation] = useState('');
  const options = ['Linha 1', 'Linha 2', 'Linha 3'].filter(
    opt => opt !== currentLocal
  );

  const handleChange = e => {
    setLocation(e.target.value);
  };

  const handleSave = () => {
    dispatch(changeLocal({ local: location }));
    setLocation('');
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Profile Settings</h2>
      <div className={css.container}>
        <div className={css.themeWrapper}>
          <span className={css.span}>Mudar Tema</span>
          <ThemeTogle />
        </div>

        <div className={css.inputContainer}>
          <select
            value={location}
            onChange={handleChange}
            className={css.input}
          >
            <option value="" disabled>
              Local atual: {currentLocal}
            </option>
            {options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={css.btn}
            onClick={handleSave}
            disabled={!location || location === user.local}
          >
            Alterar o local do trabalho
          </button>
        </div>

        <button type="button" className={css.btn} onClick={openModal}>
          Alterar a palavra passe
        </button>
      </div>

      <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
        <ChangePassForm onClose={closeModal} />
      </ModalOverlay>
    </div>
  );
}

export default ProfileSettings;
