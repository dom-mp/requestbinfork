import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";
import "./App.css";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);

  // load initial state
  useEffect(() => {
    apiService.getBaskets().then((baskets) => setBaskets(baskets));
  }, []);

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <BrowserRouter>
        <Nav />
        <Baskets baskets={baskets} />

        <Routes>
          <Route path="/" element={<CreateBasket setBaskets={setBaskets} />} />
          <Route path="baskets">
            <Route path=":basketName" element={<Basket />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
