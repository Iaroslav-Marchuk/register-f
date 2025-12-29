import css from './ProfileDetails.module.css';

function ProfileDetails() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Profile Details</h2>
      <p>Nome do utilizador: Coloboradr</p>
      <p>registado no sistema: 17/12/2025</p>
    </div>
  );
}

export default ProfileDetails;
