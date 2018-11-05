import React, { Component } from "react";
import NewEntryPage from "./pages/NewEntry";
import EntriesPage from "./pages/Entries";
import Login from "./pages/Login";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditEntry from "./pages/EditEntry";
import { createMuiTheme } from "@material-ui/core/styles";

// const theme = createMuiTheme({
//   palette: {
//     primary: purple,
//     secondary: {
//       main: '#f44336',
//     },
//   },
// });

const DiaryContext = React.createContext();

const Entries = () => {
  return (
    <DiaryContext.Consumer>
      {value => (
        <EntriesPage
          entries={value.entries}
          updateContext={value.updateContext}
        />
      )}
    </DiaryContext.Consumer>
  );
};

const Entry = value => {
  return (
    <DiaryContext.Consumer>
      {value => (
        <EditEntry
          currentEntry={value.currentEntry}
          entries={value.entries}
          updateContext={value.updateContext}
        />
      )}
    </DiaryContext.Consumer>
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
    this.state = {
      user: "",
      currentEntry: {},
      entries: [],
      updateContext: obj => {
        console.log("it happened!");
        console.log(obj);
        this.setState(state => {
          return { ...state, ...obj };
        });
      }
    };
  }

  render() {
    // return <div>{!this.state.user && <Redirect to="/login" />}</div>;
    return (
      <DiaryContext.Provider value={this.state}>
        <Navbar />
        <Route exact path="/" component={NewEntryPage} />
        <Route exact path="/entries" component={Entries} />
        <Route path="/entries/:id" component={Entry} />
      </DiaryContext.Provider>
    );
  }
}

export default App;
