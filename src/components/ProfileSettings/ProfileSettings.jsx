import css from './ProfileSettings.module.css';

function ProfileSettings() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Profile Settings</h2>
      <ul className={css.btnsList}>
        <li className={css.btnsItem}>
          <button type="submit" className={css.btn}>
            Dark mode
          </button>
        </li>
        <li className={css.btnsItem}>
          <button type="submit" className={css.btn}>
            Alterar a palavra passe
          </button>
        </li>
        <li className={css.btnsItem}>
          <button type="submit" className={css.btn}>
            Alterar o local do trabalho
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileSettings;
