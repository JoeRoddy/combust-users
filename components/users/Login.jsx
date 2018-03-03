import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import Form from "../reusable/Form";
import userStore from "../../stores/UserStore";

@observer
export default class Login extends Component {
  state = {
    errMessage: ""
  };

  componentWillUpdate(nextProps) {
    if (userStore.user) {
      this.props.history.push("/");
    }
  }

  handleLogin = formData => {
    userStore.login(formData, (err, userData) => {
      err
        ? this.setState({ errMessage: err.message })
        : this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        <Form
          onSubmit={this.handleLogin}
          fields={{ email: "string", password: "string" }}
          title="Login"
          submitText="Login"
        >
          <br />
          <Link to="/register">Create an account</Link>
          <div className="uk-text-danger uk-text-break uk-margin-small-top">
            {this.state.errMessage}
          </div>
        </Form>
      </div>
    );
  }
}
