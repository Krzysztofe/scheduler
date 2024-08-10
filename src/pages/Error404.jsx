import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Error404 = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", color: "error.main" }}
    >
      <Typography color="error" variant="h6">
        Błąd 404 <br /> Strona nie istnieje
      </Typography>
    </Grid>
  );
};

export default Error404;
