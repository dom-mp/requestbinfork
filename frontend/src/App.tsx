import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/apiService.ts";
import { handleAPIError, setErrorNotifier } from "./utils.ts";
import { useNotifications } from "@toolpad/core/useNotifications";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const notifications = useNotifications();
  const originURL = window.location.origin;

  const getBaskets = () => {
    const baskets = Object.keys(localStorage);
    setBaskets(baskets);
  };

  const validateBaskets = async () => {
    try {
      const localBaskets = Object.keys(localStorage);
      const validBaskets = await apiService.getValidBaskets(localBaskets);

      localBaskets.forEach((key) => {
        if (!validBaskets.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error: unknown) {
      handleAPIError(error, "Your baskets could not be found.");
    }
  };

  // load initial state
  useEffect(() => {
    validateBaskets();
    getBaskets();
    setErrorNotifier((message) =>
      notifications.show(message, { key: message, severity: "error" }),
    );
  }, [notifications]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ minWidth: "100%" }}>
          <CssBaseline />
          <Nav />

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
                    />
                  }
                />
                <Route path="baskets">
                  <Route
                    path=":basketName"
                    element={
                      <Basket originURL={originURL} getBaskets={getBaskets} />
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
