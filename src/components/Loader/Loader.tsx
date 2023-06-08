import { Box, CircularProgress } from "@mui/material";


const Loader = () => {
  return (
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000014",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
  );
};

export default Loader;
