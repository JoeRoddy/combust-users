import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import userStore from "../../stores/UserStore";
import Form from "../reusable/Form";

const fields = {
  //legal data types: string, text, number, boolean, image
  email: "string",
  password: "string"
};

@observer
export default class Register extends Component {
  state = {
    errMessage: ""
  };

  componentDidUpdate(nextProps) {
    if (userStore.user) {
      this.props.history.push("/");
    }
  }

  handleSubmit = formData => {
    userStore.createUser(formData, (err, userData) => {
      if (err) {
        this.setState({ errMessage: err.message });
      } else {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const user = userStore.user;

    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        {user && <div>You already have an account.</div>}
        <Form
          onSubmit={this.handleSubmit}
          submitText="Sign Up"
          fields={fields}
          title="New Account"
        >
          <br />
          <Link to="/login">Login instead</Link>
          <div className="uk-text-danger uk-text-break uk-margin-small-top">
            {this.state.errMessage}
          </div>
        </Form>
      </div>
    );
  }
}
