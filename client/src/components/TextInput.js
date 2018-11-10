import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const paperStyle = { marginBottom: "1rem", display: "inline-block" };

const TextInput = props => (
  <Paper style={paperStyle}>
    <TextField {...props} />
  </Paper>
);
// multiline
//       placeholder={"Title . . ."}
//       fullWidth
//       name={"title"}
//       onChange={this.changeTitle}

export default TextInput;
