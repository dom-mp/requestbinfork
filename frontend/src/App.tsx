import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import apiService from "./services/requestBinAPI";
import Nav from "./components/Nav";
import Basket from "./components/Basket";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";

// temporary Basket component placeholder
// const Basket = () => <></>;

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);
  const [generatedName, setGeneratedName] = useState<string>("");

  useEffect(() => {
    apiService.getBaskets().then((mockBaskets) => {
      setBaskets(mockBaskets);
    });

    apiService.generateName().then((basketName) => {
      setGeneratedName(basketName);
    });
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Baskets baskets={baskets} />

      <Routes>
        <Route path="/" element={<CreateBasket basketName={generatedName} />} />
        <Route path="baskets">
          <Route path=":basketName" element={<Basket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
