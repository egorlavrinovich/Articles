import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {}

const Loader = (props: LoaderProps) => {
  const {} = props;
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
