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

  changeHandler = e => {
    const { name, value } = e.target;
    this.props.updateContext({
      currentEntry: { ...this.props.currentEntry, [name]: value }
    });
  };

  saveEntry = () => {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      body: JSON.stringify({ ...this.props.currentEntry }),
      headers
    };
    fetch(`/api/entries/${this.props.currentEntry.id}`, options)
      .then(response => response.json())
      .then(json => this.props.updateContext({ currentEntry: json }))
      .catch(err => console.log(err));
  };

  deleteEntry = () => {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "DELETE",
      body: JSON.stringify({ id: this.props.currentEntry.id }),
      headers
    };
    fetch(`/api/entries/${this.props.currentEntry.id}`, options)
      .then(response => {
        let entries = this.props.entries.filter(
          entry => entry.id !== this.props.currentEntry.id
        );
        this.props.updateContext({ currentEntry: {}, entries });
        this.props.history.push("/entries");
      })
      .catch(err => console.log(err));
  };

  render() {
    const { title, body } = this.props.currentEntry;
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
