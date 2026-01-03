import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors.js';
import { useSelector } from 'react-redux';

function RestrictedRoute({ element, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
}

export default RestrictedRoute;
