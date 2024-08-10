import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Error404 = () => {
  return (
    <Grid
      style={{
        inset: "0",
        display: "grid",
        placeItems: "center",
        position: "absolute",
      }}
    >
      <Typography color="error" variant="h6" align="center">
        Błąd 404. <br /> Strona nie istnieje.
      </Typography>
    </Grid>
  );
};

export default Error404;
