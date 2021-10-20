import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Publicroute exact path="/login" name="Login Page" component={props => <Login {...props}/>} />
              <Publicroute exact path="/register" name="Register Page" component={props => <Register {...props}/>} />
              <Publicroute exact path="/404" name="Page 404" component={props => <Page404 {...props}/>} />
              <Publicroute exact path="/500" name="Page 500" component={props => <Page500 {...props}/>} />
              <PrivateRoute path="/" name="Home" component={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const appdata = useSelector(state => state.app);
   return (
      <Route
  {...rest}
  render={props =>
  appdata.user ? (
  <Component {...props} />
  ) : (
  <Redirect
  to={{
  pathname: "login"
  }}
  />
  )
  }
  />
   )
}

const Publicroute = ({ component: Component, ...rest }) => {
  const appdata = useSelector(state => state.app);
   return (
      <Route
  {...rest}
  render={props =>
  !appdata.user ? (
  <Component {...props} />
  ) : (
  <Redirect
  to={{
  pathname: "/dashboard"
  }}
  />
  )
  }
  />
   )
}

 


export default App;
