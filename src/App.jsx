import { useState } from "react";

import NavBar from "./components/NavBar.jsx";
import WeekOne from "./components/WeekOne.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <WeekOne />
    </>
  );
}

export default App;
