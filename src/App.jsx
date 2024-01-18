import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import WeekOne from "./components/WeekOnePiotr.jsx";
import WeekTwo from "./components/WeekTwoPiotr.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/weekone" element={<WeekOne />} />
        <Route path="/weektwo" element={<WeekTwo />} />
      </Routes>
    </>
  );
}

export default App;
