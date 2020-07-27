import React, {useEffect, useReducer} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./auth/setAuthToken";
import { setCurrentUser, logoutUser } from "./services/authService";
import store from "./store";
import ReactGA from 'react-ga';
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import CustomMap from "./components/map/Map";
import ChangePassword from "./components/auth/ChangePassword";
import {isMobile} from 'react-device-detect';
import update from 'immutability-helper';
import moment from "moment";
import {useSelector} from "react-redux";
import {
  setDisableDropdowns
} from "./actions/pathsActions";
import {DeviceMessage} from "./components/layout/DeviceMessage";
import {Charts} from "./components/charts/Charts";
import AdminRoute from "./components/auth/AdminRoute";

export const AppContext = React.createContext();
const trackingId = process.env.GA_ID;
ReactGA.initialize(trackingId);

function reducer(state, action) {
  return update(state, {
    drawn: {$set: action.drawn},
    drawStart: {$set: action.drawStart},
    drawEnd: {$set: action.drawEnd}
  });
}


const initialState = {
  drawn: { date: null, duration: null },
  drawStart: null,
  drawEnd: null
}

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


const AppComponent  = (props) =>  {
  const {history} = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const authReducer = useSelector(state => state.auth);


  useEffect(()=> {
    if (isMobile) {
      history.push('/incompatible');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);


  const setDrawEnd = (end) => {
    let duration = moment.duration(end.diff(state.drawStart));
    let seconds = duration.asSeconds();
    let drawEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
    dispatch({drawn: {date: drawEnd, duration: seconds}});
    store.dispatch(setDisableDropdowns(false));
  }

    return (
        <div className="App">
          <AppContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route exact path="/home" component={withRouter(Landing)} />
              <Route exact path="/register" component={withRouter(Register)} />
              <Route exact path="/login" component={withRouter(Login)} />
              <Route exact path="/incompatible" component={DeviceMessage} />
              <PrivateRoute authed={authReducer.isAuthenticated} exact path="/change/password" component={ChangePassword} />
              <AdminRoute authed={authReducer.user.role === "admin"} exact path="/charts" component={Charts} />
              {authReducer.isAuthenticated ?
              <CustomMap setDrawEnd={setDrawEnd} drawnObj={state.drawn} />:null}
              <Route path="/" render={()=> <Redirect to="/home"/>}/>
            </Switch>
          </AppContext.Provider>
        </div>
    );
}
export const App = withRouter(AppComponent);
