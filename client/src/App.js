import React, { Component } from "react";
import NewEntryPage from "./pages/NewEntry";
import EntriesPage from "./pages/Entries";
import Login from "./pages/Login";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";

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
    this.state = { user: "" };
  }

  render() {
    // return <div>{!this.state.user && <Redirect to="/login" />}</div>;
    return (
      <React.Fragment>
        <Navbar />
        <Route exact path="/" component={NewEntryPage} />
        <Route exact path="/entries" component={EntriesPage} />
      </React.Fragment>
    );
  }
}

export default App;
