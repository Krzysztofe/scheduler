import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </main>
  );
};

export default LoadingPage;
