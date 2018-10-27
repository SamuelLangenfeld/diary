import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const PaperStyle = { marginBottom: "1rem" };

const PaperBlock = props => {
  return (
    <Grid item xs={12} spacing={0}>
      <Paper style={PaperStyle} {...props} />
    </Grid>
  );
};
class App extends Component {
  componentDidMount() {
    // var headers = new Headers();
    // headers.append("content-type", "application/json");
    // const options = {
    //   method: "POST",
    //   body: JSON.stringify({ title: "newest", body: "test body" }),
    //   headers
    // };
    // fetch("/api/entries", options)
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err));
  }

  changeTitle = e => {
    this.setState(state => {
      return {
        ...state,
        title: e.target.value
      };
    });
  };

  changeBody = e => {
    this.setState(state => {
      return {
        ...state,
        body: e.target.value
      };
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Grid container direction={"row"} justify={"center"} md={12}>
          <Grid item container direction={"row"} xs={12} md={6}>
            <PaperBlock>
              <Typography variant="headline" component="h3">
                Your Greatest Achievo
              </Typography>
              <Typography>Body Typography</Typography>
              <TextField
                multiline
                placeholder={"Go Ahead"}
                fullWidth
                onchange={this.changeTitle}
              />
            </PaperBlock>
            <PaperBlock>
              <TextField
                multiline
                rows={10}
                placeholder={"What's up?"}
                fullWidth
                onchange={this.changeBody}
              />
            </PaperBlock>
            <Button variant={"raised"} color={"primary"}>
              Save your shit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
