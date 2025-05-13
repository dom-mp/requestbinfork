import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import { Container, Box, Stack, useMediaQuery } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";
import MyBasketsFab from "./components/MyBasketsFab";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);
  const [drawerState, setDrawerState] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

      <MyBasketsFab setDrawerState={setDrawerState} isMobile={isMobile} />
    </ThemeProvider>
  );
}

export default App;
