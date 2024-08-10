import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
const LoadingPage = () => {
  return (
    <Grid
      style={{
        inset: "0",
        display: "grid",
        placeItems: "center",
        position: "absolute",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingPage;
