import React, { Component } from "react";
import NewEntryPage from "./pages/NewEntry";
import EntriesPage from "./pages/Entries";
import LoginPage from "./pages/Login";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
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

const Entry = () => {
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

const Login = () => {
  return (
    <DiaryContext.Consumer>
      {value => (
        <LoginPage
          loggedIn={value.loggedIn}
          updateContext={value.updateContext}
        />
      )}
    </DiaryContext.Consumer>
  );
};

const NewEntry = () => {
  return (
    <DiaryContext.Consumer>
      {value => (
        <NewEntryPage
          entries={value.entries}
          updateContext={value.updateContext}
        />
      )}
    </DiaryContext.Consumer>
  );
};

class App extends Component {
  componentDidMount() {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    fetch("/api/entries")
      .then(response => response.json())
      .then(json => {
        const entries = {};
        json.forEach(entry => {
          entries[entry.id] = entry;
        });
        this.setState(state => {
          return { ...state, entries, loggedIn: true };
        }, this.loginRedirect);
      })
      .catch(err => console.log(err));
  }

  loginRedirect = () => {
    this.props.history.push("/entries");
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentEntry: {},
      entries: {},
      updateContext: (obj, callback) => {
        console.log("it happened!");
        console.log(obj);
        console.log(callback);
        this.setState(state => {
          return { ...state, ...obj };
        }, callback);
      }
    };
  }

  render() {
    const redirect = <Redirect to={"/"} />;

    if (this.props.location.pathname !== "/" && !this.state.loggedIn) {
      return redirect;
    }

    const routes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/newEntry" component={NewEntry} />
        <Route exact path="/entries" component={Entries} />
        <Route path="/entries/:id" component={Entry} />
      </Switch>
    );

    return (
      <DiaryContext.Provider value={this.state}>
        <Navbar />
        {routes}
      </DiaryContext.Provider>
    );
  }
}

export default withRouter(App);
