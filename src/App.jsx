import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import WeekOne from "./components/WeekOne.jsx";
import WeekTwo from "./components/WeekTwo.jsx";

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
