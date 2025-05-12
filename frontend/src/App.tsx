import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import { Container, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);

  // load initial state
  useEffect(() => {
    apiService.getBaskets().then((baskets) => setBaskets(baskets));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="md" sx={{ minWidth: "350px" }}>
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
              direction={{ sm: "row", xs: "column" }}
              sx={{ justifyContent: "space-between" }}
              spacing={2}
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

              <Baskets baskets={baskets} />
            </Stack>
          </Box>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
