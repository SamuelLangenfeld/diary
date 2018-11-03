import React, { Component } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.login = props.login;
  }

  changeUsername = e => {
    const username = e.target.value;
    this.setState(state => ({ ...state, username }));
  };

  changePassword = e => {
    const password = e.target.value;
    this.setState(state => ({ ...state, password }));
  };

  attemptLogin = () => {
    this.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    return (
      <Layout>
        <Header>{"Login to Do Anything"}</Header>
        <TextInput
          placeholder={"Username"}
          name={"username"}
          onChange={this.changeUsername}
        />
        <TextInput
          placeholder={"Password"}
          name={"user"}
          onChange={this.changePassword}
          type={"password"}
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

export default Login;
