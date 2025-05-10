import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Nav from "./components/Nav";
import Baskets from "./components/Baskets";
import CreateBasket from "./components/CreateBasket";

function App() {
  const [baskets, setBaskets] = useState<Array<string>>([]);

  useEffect(() => {
    const mockBaskets = ["9dj210f", "dt2u38h", "nlg99ed"];
    setBaskets(mockBaskets);
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Baskets baskets={baskets} />
      <CreateBasket />
    </BrowserRouter>
  );
}

export default App;
