import { Navigate } from 'react-router-dom';

function RestrictedRoute({ element, redirectTo }) {
  const isLoggedIn = true;
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
}

export default RestrictedRoute;
