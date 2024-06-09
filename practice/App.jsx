import { useState } from "react";
import Header from "./Practice Website/Header.jsx";
import Hero from "./Practice Website/Hero.jsx";
import Clients from "./Practice Website/Clients.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <Hero/>
      <Clients/>
    </>
  );
}

export default App;
