import { Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  const isLoggedIn = true;

  return isLoggedIn ? element : <Navigate to="/auth" />;
}

export default PrivateRoute;
