import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      backdropFilter: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    custom?: {
      backdropFilter?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E3AFBE",
    },
    secondary: {
      main: "#fdc6d7",
    },
    background: {
      default: "#121212",
      paper: "#2929294D",
    },
    text: {
      secondary: "#E3AFBE",
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

  components: {
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          backdropFilter: theme.custom.backdropFilter,
        }),
      },
    },

    MuiAccordion: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          backgroundColor: `${theme.palette.background.default}CC`,
          // backdropFilter: theme.custom.backdropFilter,
        }),
      },
    },
  },

  custom: {
    backdropFilter: "blur(2px)",
  },
});

export default theme;
