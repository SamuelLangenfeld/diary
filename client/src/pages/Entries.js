import React from "react";
import Header from "../components/Header";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Layout from "../components/Layout";
import { paper } from "../styles";

class EntriesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: ""
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = () => {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      headers
    };
    window
      .fetch("/api/entries", options)
      .then(res => res.json())
      .then(res => {
        this.setState(state => {
          return { ...state, entries: res };
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { entries } = this.state;
    const entryCells =
      entries &&
      entries.map((entry, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{entry && entry.title}</TableCell>
            <TableCell>{entry && entry.createdAt.slice(0, 10)}</TableCell>
            <TableCell>{entry && entry.updatedAt.slice(0, 10)}</TableCell>
          </TableRow>
        );
      });

    return (
      <React.Fragment>
        <Header>Index of Entries</Header>
        <Layout>
          <Paper style={paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Title"}</TableCell>
                  <TableCell>{"CreatedAt"}</TableCell>
                  <TableCell>{"UpdatedAt"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{entryCells}</TableBody>
            </Table>
          </Paper>
        </Layout>
      </React.Fragment>
    );
  }
}

export default EntriesPage;
