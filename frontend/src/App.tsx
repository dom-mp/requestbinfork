import { useState, useEffect } from "react";

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
    <>
      <Nav />
      <Baskets baskets={baskets} />
      <CreateBasket />
    </>
  );
}

export default App;
