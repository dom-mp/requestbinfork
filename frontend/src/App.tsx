import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import { handleAPIError, setErrorNotifier } from "./utils.ts";
import {
  NotificationsProvider,
  useNotifications,
} from "./components/useNotifications";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import MyBaskets from "./components/MyBaskets";
import CreateBasket from "./components/CreateBasket";
import MyBasketsFab from "./components/MyBasketsFab";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);
  const [drawerState, setDrawerState] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { showNotification } = useNotifications();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const originURL = window.location.origin;

  const getBaskets = async () => {
    try {
      const baskets = await apiService.getBaskets();
      setBaskets(baskets);
    } catch (error: unknown) {
      handleAPIError(error, "Your baskets could not be found.");
    }
  };

  // load initial state
  useEffect(() => {
    setErrorNotifier(showNotification);
    getBaskets();
  }, [showNotification]);

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <BrowserRouter>
          <Container maxWidth="xl" sx={{ minWidth: "350px" }}>
            <CssBaseline />
            <Nav />

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                paddingTop: 3,
                // create space dynamically for Nav
                ...theme.mixins.toolbar,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  gap: 3,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <CreateBasket
                        originURL={originURL}
                        setBaskets={setBaskets}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                      />
                    }
                  />
                  <Route path="baskets">
                    <Route
                      path=":basketName"
                      element={
                        <Basket
                          originURL={originURL}
                          setSnackbarMessage={setSnackbarMessage}
                          setSnackbarOpen={setSnackbarOpen}
                          getBaskets={getBaskets}
                        />
                      }
                    />
                  </Route>
                </Routes>

                <MyBaskets
                  baskets={baskets}
                  drawerState={drawerState}
                  setDrawerState={setDrawerState}
                />
              </Stack>
            </Box>
          </Container>
        </BrowserRouter>
      </NotificationsProvider>

      <MyBasketsFab
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        isMobile={isMobile}
      />

      <Box
        className="bg-image"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -10,
          width: "100%",
          height: "100%",
          backgroundColor: "background.default",
          backgroundImage: `radial-gradient(${theme.palette.primary.dark} 1px, transparent 1.5px)`,
          backgroundSize: "16px 16px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      ></Box>
    </ThemeProvider>
  );
}

export default App;
