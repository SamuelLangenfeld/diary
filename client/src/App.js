import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const fetch = window.fetch;

const paperStyle = { marginBottom: "1rem" };

const headlineStyle = { marginTop: "1rem", marginBottom: "1rem" };

const PaperBlock = props => {
  return (
    <Grid item xs={12} spacing={0}>
      <Paper style={paperStyle} {...props} />
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

  constructor(props) {
    super(props);
    this.state = { title: "", body: "" };
  }

  changeTitle = e => {
    const title = e.target.value;
    this.setState(state => {
      return {
        ...state,
        title
      };
    });
  };

  changeBody = e => {
    const body = e.target.value;
    this.setState(state => {
      return {
        ...state,
        body
      };
    });
  };

  saveEntry = () => {
    const { title, body } = this.state;
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers
    };
    fetch("/api/entries", options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Grid container direction={"row"} justify={"center"} md={12}>
          <Grid item container direction={"row"} xs={12} md={6}>
            <Grid item xs={12}>
              <Typography
                style={headlineStyle}
                variant="headline"
                component="h3"
              >
                Your Greatest Achievo
              </Typography>
            </Grid>
            <PaperBlock>
              <TextField
                multiline
                placeholder={"Title . . ."}
                fullWidth
                name={"title"}
                onChange={this.changeTitle}
              />
            </PaperBlock>
            <PaperBlock>
              <TextField
                multiline
                rows={20}
                placeholder={"What's up? . . ."}
                fullWidth
                name={"body"}
                onChange={this.changeBody}
              />
            </PaperBlock>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={this.saveEntry}
            >
              Save your shit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
