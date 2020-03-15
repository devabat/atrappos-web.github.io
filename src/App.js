import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./auth/setAuthToken";

import { setCurrentUser, logoutUser } from "./services/authService";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import CustomMap from "./components/map/Map";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="App">
              {/*<Navbar />*/}
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={withRouter(Register)} />
              <Route exact path="/login" component={withRouter(Login)} />
              <Switch>
                <PrivateRoute exact path="/map" component={CustomMap} />
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}
export default App;
