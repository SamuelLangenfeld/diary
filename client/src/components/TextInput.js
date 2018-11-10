import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const paperStyle = {
  marginBottom: "1rem",
  display: "inline-block",
  width: "100%"
};

const TextInput = props => {
  const { containerProps, ...restProps } = props;
  return (
    <Paper style={paperStyle} {...containerProps}>
      <TextField {...restProps} />
    </Paper>
  );
};
// multiline
//       placeholder={"Title . . ."}
//       fullWidth
//       name={"title"}
//       onChange={this.changeTitle}

export default TextInput;
