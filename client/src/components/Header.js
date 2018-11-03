import React from "react";
import Typography from "@material-ui/core/Typography";

const headlineStyle = {
  marginTop: "1rem",
  marginBottom: "1rem",
  textAlign: "center"
};

const Header = ({ children, ...restProps }) => (
  <Typography
    style={headlineStyle}
    variant="headline"
    component="h3"
    {...restProps}
  >
    {children}
  </Typography>
);

export default Header;
