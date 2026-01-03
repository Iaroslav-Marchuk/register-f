import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors.js';

function PrivateRoute({ element }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? element : <Navigate to="/auth" />;
}

export default PrivateRoute;
