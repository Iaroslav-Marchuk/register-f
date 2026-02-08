import { useSearchParams } from 'react-router-dom';
import ActivityDashboard from '../ActivityDashboard/ActivityDashboard.jsx';
import css from './ProfileActivity.module.css';

function ProfileActivity() {
  const [searchParams, setSearchParams] = useSearchParams();
  const year = Number(searchParams.get('year')) || new Date().getFullYear();

  const handleYearChange = newYear => {
    const params = new URLSearchParams(searchParams);
    params.set('year', newYear);
    setSearchParams(params);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Profile Atividade</h2>

      <ActivityDashboard year={year} onYearChange={handleYearChange} />
    </div>
  );
}

export default ProfileActivity;
