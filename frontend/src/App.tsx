import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";
import "./App.css";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);

  // load initial state
  useEffect(() => {
    apiService.getBaskets().then((baskets) => setBaskets(baskets));
  }, []);

  return (
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
  );
}

export default App;
