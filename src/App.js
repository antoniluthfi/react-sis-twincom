import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import GuestRoute from './auth/GuestRoute';
import ProtectedRoute from './auth/ProtectedRoute';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/authentication/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const ForgotPassword = React.lazy(() => import('./views/authentication/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/authentication/ResetPassword'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <GuestRoute exact path="/login" name="Login Page" component={Login} />
              <GuestRoute exact path="/register" name="Register Page" component={Register} />
              <GuestRoute exact path="/forgot-password" name="Forgot Password" component={ForgotPassword} />
              <GuestRoute exact path="/reset-password/:id" name="Reset Password" component={ResetPassword} />
              <ProtectedRoute path="/" name="Home" component={TheLayout} />

              <Route name="Page 404" component={Page404} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
