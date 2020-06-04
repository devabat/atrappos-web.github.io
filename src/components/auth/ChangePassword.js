import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../services/authService";
import classnames from "classnames";
import { Logo } from "../layout/Logo";
import {LoaderAuth} from "../ui/LoaderAuth";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newPassword: "",
      errors: {}
    };
  }

  componentDidMount() {
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.props.auth.user.email,
      password: this.state.password,
      newPassword: this.state.newPassword,
      repeatNewPassword: this.state.repeatNewPassword
    };

    this.props.changePassword(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container landing">
        <div className="row">
          <div className="col-md-6 col-lg-6 landing--auth">
            <Logo logoCls="logo--landing" />
            <div className="col">
              <h4>
                <b>Change password</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit} autoComplete="off">
              <div className="input-field col">
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  autoComplete="on"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="input-field col">
                <label htmlFor="password"> New Password</label>
                <input
                    onChange={this.onChange}
                    value={this.state.newPassword}
                    error={errors.newPassword}
                    id="newPassword"
                    type="password"
                    autoComplete="off"
                    className={classnames("", {
                      invalid: errors.newPassword
                    })}
                />
                <span className="red-text">
                  {errors.newPassword}
                </span>
              </div>
              <div className="input-field col">
                <label htmlFor="password"> Repeat New Password</label>
                <input
                    onChange={this.onChange}
                    value={this.state.repeatNewPassword}
                    error={errors.repeatNewPassword}
                    id="repeatNewPassword"
                    type="password"
                    autoComplete="off"
                    className={classnames("", {
                      invalid: errors.repeatNewPassword || errors.notMatch
                    })}
                />
                <span className="red-text">
                  {errors.repeatNewPassword}
                  {errors.notMatch}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  disabled={this.props.auth.changePwLoading}
                  type="submit"
                  className="btn landing--auth__btn"
                >
                  {this.props.auth.changePwLoading ?
                      <LoaderAuth />
                      : "Change Password"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword);
