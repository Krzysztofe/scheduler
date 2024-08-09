import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <main
      style={{
        width: "100vw",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </main>
  );
};

export default LoadingPage;
