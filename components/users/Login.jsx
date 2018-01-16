import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import userStore from "../../stores/UserStore";

@observer
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errMessage: ""
  };

  componentWillUpdate(nextProps) {
    if (userStore.user) {
      this.props.history.push("/");
    }
  }

  submit = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    userStore.login(user, (err, userData) => {
      err
        ? this.setState({ errMessage: err.message })
        : this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        <form onSubmit={this.submit} className="uk-width-medium">
          <legend className="uk-legend">Login</legend>
          <div className="uk-margin">
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>
          <div className="uk-margin">
            <input
              className="uk-input uk-form-width-medium"
              type="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>
          <button
            className="uk-button uk-button-default uk-form-width-medium uk-margin-small-bottom"
            onClick={this.submit}
          >
            Login
          </button>{" "}
          <br />
          <Link to="/register">Create an account</Link>
          <div className="uk-text-danger uk-text-break uk-margin-small-top">
            {this.state.errMessage}
          </div>
        </form>
      </div>
    );
  }
}
