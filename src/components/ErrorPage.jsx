import React from "react";
import Typography from "@mui/material/Typography";

const ErrorPage = props => {
  return (
    <div
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
    </div>
  );
};

export default ErrorPage;
