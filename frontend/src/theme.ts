import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#37688A",
    },
    secondary: {
      main: "#62b5f9",
    },
    background: {
      default: "#f1f1f1",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
