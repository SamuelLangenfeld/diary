import React from "react";
import Grid from "@material-ui/core/Grid";

const Layout = ({ children }) => {
  return (
    <Grid container direction={"row"} justify={"center"}>
      <Grid item container direction={"row"} xs={12} md={6}>
        {children &&
          React.Children.map(children, child => {
            return (
              <Grid item xs={12}>
                {child}
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Layout;
