import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";

const fetch = window.fetch;
const deleteButtonStyle = { float: "right" };

class EditEntry extends Component {
  componentDidMount() {
    // if (this.props.match.params.id != this.props.currentEntry.id) {
    //   var headers = new Headers();
    //   headers.append("content-type", "application/json");
    //   const options = {
    //     headers
    //   };
    //   fetch(`/api/entries/${this.props.match.params.id}`, options)
    //     .then(res => res.json())
    //     .then(json => {
    //       this.props.updateContext({ currentEntry: json });
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  constructor(props) {
    super(props);
    const { entries, currentEntry } = this.props;
    const { body, title } = entries[currentEntry];
    this.state = { body, title };
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState(state => {
      return { ...state, [name]: value };
    });
  };

  saveEntry = () => {
    const { body, title } = this.state;
    const { currentEntry } = this.props;
    const editedEntry = { body, title };
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify(editedEntry),
      headers
    };
    fetch(`/api/entries/${currentEntry}`, options)
      .then(response => response.json())
      .then(json => {
        const entries = { ...this.props.entries };
        this.props.updateContext(
          { currentEntry: null, entries },
          this.redirect
        );
      })
      .catch(err => console.log(err));
  };

  redirect = () => {
    this.props.history.push("/entries");
  };

  deleteEntry = () => {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "DELETE",
      body: JSON.stringify({ id: this.props.currentEntry }),
      headers
    };
    fetch(`/api/entries/${this.props.currentEntry}`, options)
      .then(response => {
        const entries = { ...this.props.entries };
        delete entries[this.props.currentEntry];
        this.props.updateContext(
          { currentEntry: null, entries },
          this.redirect
        );
      })
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
            onChange={this.changeHandler}
            value={title}
          />
          <TextInput
            multiline
            rows={20}
            placeholder={"What's up? . . ."}
            fullWidth
            name={"body"}
            onChange={this.changeHandler}
            value={body}
          />
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={this.saveEntry}
            >
              Save your shit
            </Button>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={this.deleteEntry}
              style={deleteButtonStyle}
            >
              Delete this noise
            </Button>
          </div>
        </Layout>
      </div>
    );
  }
}

export default withRouter(EditEntry);
