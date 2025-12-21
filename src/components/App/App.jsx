import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout.jsx';

import MainPage from '../../pages/MainPage/MainPage.jsx';
import StatisticPage from '../../pages/StatisticPage/StatisticPage.jsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import AuthPage from '../../pages/AuthPage/AuthPage.jsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';

import RestrictedRoute from '../RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route
          path="/auth"
          element={
            <RestrictedRoute redirectTo="/main" element={<AuthPage />} />
          }
        />

        <Route element={<Layout />}>
          <Route
            path="/main"
            element={<PrivateRoute element={<MainPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            path="/stats"
            element={<PrivateRoute element={<StatisticPage />} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
