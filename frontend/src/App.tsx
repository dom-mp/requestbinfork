import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "./components/Nav";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";

// temporary Basket component placeholder
const Basket = () => <></>;

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);

  useEffect(() => {
    const mockBaskets = ["9dj210f", "dt2u38h", "nlg23ed"];
    setBaskets(mockBaskets);
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Baskets baskets={baskets} />

      <Routes>
        <Route path="/" element={<CreateBasket />} />
        <Route path="baskets">
          <Route path=":basketName" element={<Basket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
