import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from '../Layout/Layout.jsx';

import AuthPage from '../../pages/AuthPage/AuthPage.jsx';
import MainPage from '../../pages/MainPage/MainPage.jsx';
import StatisticPage from '../../pages/StatisticPage/StatisticPage.jsx';
import ReportPage from '../../pages/ReportPage/ReportPage.jsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';

import RestrictedRoute from '../RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute.jsx';

import ProfileDetails from '../ProfileDetails/ProfileDetails.jsx';
import ProfileSettings from '../ProfileSettings/ProfileSettings.jsx';
import ProfileActivity from '../ProfileActivity/ProfileActivity.jsx';
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route
          path="/auth"
          // element={
          //   <RestrictedRoute redirectTo="/main" element={<AuthPage />} />
          // }
        >
          <Route index element={<AuthPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
        </Route>

        <Route element={<Layout />}>
          <Route
            path="/main"
            element={<PrivateRoute element={<MainPage />} />}
          />
          <Route
            path="/report"
            element={<PrivateRoute element={<ReportPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          >
            <Route path="details" element={<ProfileDetails />} />
            <Route path="activity" element={<ProfileActivity />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

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
