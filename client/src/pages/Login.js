import React, { Component } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "" };
    this.login = props.login;
  }

  changePassword = e => {
    const password = e.target.value;
    this.setState(state => ({ ...state, password }));
  };

  attemptLogin = () => {
    const { password } = this.state;
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ password }),
      headers
    };
    fetch("/login", options)
      .then(response =>
        this.props.updateContext({ loggedIn: true }, this.redirect)
      )
      .catch(err => console.log(err));
  };

  redirect = () => {
    this.props.history.push("/entries");
  };

  render() {
    return (
      <Layout>
        <Header>{"Login to Do Anything"}</Header>
        <TextInput
          placeholder={"Password"}
          name={"user"}
          onChange={this.changePassword}
          type={"password"}
          containerProps={{ style: { width: "auto" } }}
        />
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={this.attemptLogin}
        >
          Login Bro
        </Button>
      </Layout>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
};

export default withRouter(Login);
