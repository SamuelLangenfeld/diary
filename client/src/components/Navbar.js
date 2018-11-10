import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const linkStyle = { textDecoration: "none" };

const Navbar = () => {
  return (
    <AppBar position={"static"} color={"primary"}>
      <Toolbar>
        <Link to="/entries" style={linkStyle}>
          <Button style={{ color: "white" }}>See your Entries</Button>
        </Link>
        <Link to="/newEntry" style={linkStyle}>
          <Button variant={"outlined"}>Write an Entry</Button>
        </Link>
        <Link to="/login" style={linkStyle}>
          <Button variant={"outlined"}>Log In</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
