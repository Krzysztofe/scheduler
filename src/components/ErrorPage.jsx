import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const ErrorPage = props => {
  return (
    <Grid
      style={{
        inset: "0",
        display: "grid",
        placeItems: "center",
        position: "absolute",
      }}
    >
      <Typography color="error" variant="h6">
        {props.errorMsg}
      </Typography>
    </Grid>
  );
};

export default ErrorPage;
