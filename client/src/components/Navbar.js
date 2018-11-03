import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <Link to="/entries">See your Entries</Link>
      <Link to="/">Write an Entry</Link>
    </React.Fragment>
  );
};

export default Navbar;
