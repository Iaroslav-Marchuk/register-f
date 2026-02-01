import { useSelector } from 'react-redux';
import css from './ProfileDetails.module.css';
import { selectUser } from '../../redux/auth/selectors.js';

function ProfileDetails() {
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Dados do perfil</h2>
      <ol className={css.list}>
        <li className={css.item}>
          <p className={css.text}>
            Nome do utilizador: <span className={css.span}>{user.name}</span>
          </p>
        </li>
        <li className={css.item}>
          <p className={css.text}>
            Actual local do trabalho:{' '}
            <span className={css.span}>{user.local}</span>
          </p>
        </li>
        <li className={css.item}>
          <p className={css.text}>
            Registado no sistema:{' '}
            <span className={css.span}>
              {new Date(user.createdAt).toLocaleDateString('pt-PT')}
            </span>
          </p>
        </li>
      </ol>
    </div>
  );
}

export default ProfileDetails;
