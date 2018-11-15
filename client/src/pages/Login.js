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

  attemptLogin = e => {
    e.preventDefault();
    const { password } = this.state;
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ password }),
      headers
    };
    fetch("/login", options)
      .then(response => response.json())
      .then(json => {
        const entries = {};
        json.forEach(entry => {
          entries[entry.id] = entry;
        });
        this.props.updateContext(
          { loggedIn: true, entries: json },
          this.redirect
        );
      })
      .catch(err => console.log(err));
  };

  redirect = () => {
    this.props.history.push("/entries");
  };

  render() {
    return (
      <form onSubmit={this.attemptLogin}>
        <Layout>
          <Header>{"Login to Do Anything"}</Header>
          <div style={{ display: "inline-block" }}>
            <TextInput
              placeholder={"Password"}
              name={"user"}
              onChange={this.changePassword}
              type={"password"}
            />
          </div>
          <Button variant={"contained"} color={"primary"} type={"submit"}>
            Login Bro
          </Button>
        </Layout>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
};

export default withRouter(Login);
