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
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: "100",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingPage;
