import css from './ProfileSettings.module.css';

function ProfileSettings() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Profile Settings</h2>
      <button type="button">Dark mode</button>
      <p>Alterar a palavra passe</p>
      <p>Alterar o local do trabalho</p>
    </div>
  );
}

export default ProfileSettings;
