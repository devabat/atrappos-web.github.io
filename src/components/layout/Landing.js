import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Logo } from "./Logo";
import { logoutUser } from "../../services/authService";
import PropTypes from "prop-types";
import {NotificationToast} from "../map/NotificationToast";

class Landing extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to map
    if (this.props.auth.isAuthenticated) {
    }
    if (this.props.location && this.props.location.state && this.props.location.state.from === "resetPw") {
      alert('password changed successfully!')
    }
  }
  render() {
    const { user} = this.props.auth;

    return (
      <div className="container landing">
        <div className="row">
          <div className="col-lg-12 center-align">
            <Logo logoCls="logo--landing"/>
              {this.props.auth.isAuthenticated ?
                  <React.Fragment>
                    <div className="col-md-6  landing--col">
                      <Link
                          to="/map"
                          className="btn auth--btn">
                          Enter map
                      </Link>
                    </div>
                    <div className="col-md-6 col-lg-6 landing--col">
                      <Link
                          to="/change/password"
                          className="btn auth--btn">
                          Change password
                      </Link>
                    </div>
                    <div className="col-md-6 col-lg-6 landing--col">
                      <button className="logout--btn" onClick={this.onLogoutClick}>
                        Logout
                      </button>
                    </div>
                  </React.Fragment>:
                  <React.Fragment>
                  <div className="col-md-6  landing--col">
                    <Link
                      to="/register"
                      className="btn auth--btn">
                      Register
                    </Link>
                  </div>
                  <div className="col-md-6 col-lg-6 landing--col">
                    <Link
                      to="/login"
                      className="btn auth--btn">
                      Log In
                    </Link>
                  </div>
              </React.Fragment>}
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Landing);
