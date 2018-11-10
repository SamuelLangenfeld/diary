import React from "react";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";

class SimpleLogin extends React.Component {
  constructor() {
    this.state = { password: null };
  }
  changePassword = e => {
    const password = e.target.value;
    this.setState(state => {
      return {
        ...state,
        password
      };
    });
  };
  login = () => {
    const { password } = this.state;
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ password }),
      headers
    };
    fetch("/myLogin", options)
      .then(response => response.json())
      .then(password => this.props.updateContext({ password: password }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <TextInput />
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={login}
          onChange={changePassword}
        >
          My Login
        </Button>
      </React.Fragment>
    );
  }
}

export default SimpleLogin;
