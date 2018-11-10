import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Header from "../components/Header";

const fetch = window.fetch;

class NewEntry extends Component {
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
    // if (!this.props.id) {
    //   return;
    // }
    // var headers = new Headers();
    // headers.append("content-type", "application/json");
    // const options = {
    //   headers
    // };
    // fetch(`/api/entries/${this.props.id}`, options)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState(state => {
    //       const { title, body } = json;
    //       return { ...state, title, body };
    //     });
    //   })
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
      .then(response => response.json())
      .then(json => this.props.history.push(`/entries/`))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header>Your Greatest Achievo</Header>
          <TextInput
            multiline
            placeholder={"Title . . ."}
            fullWidth
            name={"title"}
            onChange={this.changeTitle}
          />
          <TextInput
            multiline
            rows={20}
            placeholder={"What's up? . . ."}
            fullWidth
            name={"body"}
            onChange={this.changeBody}
          />
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.saveEntry}
          >
            Save your shit
          </Button>
        </Layout>
      </div>
    );
  }
}

export default NewEntry;
