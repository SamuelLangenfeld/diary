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
import { Link } from "react-router-dom";

class EntriesPage extends React.Component {
  componentDidMount() {
    // this.fetchEntries();
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
        this.props.updateContext({ entries: res });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { entries } = this.props;
    const entryCells =
      entries &&
      entries.map(entry => {
        if (!entry) {
          return null;
        }

        const clickListener = () => {
          this.props.updateContext({
            currentEntry: { ...entry }
          });
        };

        const { id, title, createdAt, updatedAt } = entry;

        return (
          <TableRow key={id}>
            <TableCell>
              <Link to={`/entries/${id}`} onClick={clickListener}>
                {title || "untitled"}
              </Link>
            </TableCell>
            <TableCell>{createdAt.slice(0, 10)}</TableCell>
            <TableCell>{updatedAt.slice(0, 10)}</TableCell>
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
