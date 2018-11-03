import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Header from "../components/Header";

const fetch = window.fetch;

class EditEntry extends Component {
  componentDidMount() {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      headers
    };
    fetch(`/api/entries/${this.props.id}`, options)
      .then(res => res.json())
      .then(json => {
        this.setState(state => {
          const { title, body } = json;
          return { ...state, title, body };
        });
      })
      .catch(err => console.log(err));
  }

  constructor(props) {
    super(props);
    this.state = { ...this.props };
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
    const { title, body, id } = this.state;
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers
    };
    fetch(`/api/entries/${id}`, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  render() {
    const { title, body } = this.state;
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
            value={title}
          />
          <TextInput
            multiline
            rows={20}
            placeholder={"What's up? . . ."}
            fullWidth
            name={"body"}
            onChange={this.changeBody}
            value={body}
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

export default EditEntry;
