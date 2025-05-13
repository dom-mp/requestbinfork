import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import { Container, Box, Stack, Fab, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);
  const [drawerState, setDrawerState] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // load initial state
  useEffect(() => {
    apiService.getBaskets().then((baskets) => setBaskets(baskets));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ minWidth: "350px" }}>
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
                  element={<CreateBasket setBaskets={setBaskets} />}
                />
                <Route path="baskets">
                  <Route path=":basketName" element={<Basket />} />
                </Route>
              </Routes>

              <Baskets
                baskets={baskets}
                drawerState={drawerState}
                setDrawerState={setDrawerState}
                isMobile={isMobile}
              />
            </Stack>
          </Box>
        </Container>
      </BrowserRouter>

      <Fab
        color="primary"
        onClick={() => setDrawerState(true)}
        sx={{
          position: "fixed",
          zIndex: 1300,
          ...(isMobile
            ? {
                bottom: 40,
                left: "50%",
              }
            : {
                top: 30,
                right: 150,
              }),
        }}
        aria-label="basket"
      >
        <ShoppingBasketIcon />
      </Fab>
    </ThemeProvider>
  );
}

export default App;
