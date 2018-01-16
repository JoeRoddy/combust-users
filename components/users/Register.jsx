import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import userStore from "../../stores/UserStore";

@observer
export default class Register extends Component {
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
    userStore.createUser(user, (err, userData) => {
      if (err) {
        this.setState({ errMessage: err.message });
      } else {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        <form onSubmit={this.submit} className="uk-width-medium">
          <legend className="uk-legend">New Account</legend>
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
            Sign Up
          </button>{" "}
          <br />
          <Link to="/login">Login instead</Link>
          <div className="uk-text-danger uk-text-break uk-margin-small-top">
            {this.state.errMessage}
          </div>
        </form>
      </div>
    );
  }
}
