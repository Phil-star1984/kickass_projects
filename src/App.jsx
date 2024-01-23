import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import WeekOne from "./components/WeekOne.jsx";
import WeekOneTest from "./components/WeekOneTest.jsx";
import WeekTwo from "./components/WeekTwo.jsx";
import WeekTwoSecond from "./components/WeekTwoSecond.jsx";
import WeekThree from "./components/WeekThree.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekone" element={<WeekOneTest />} />
        <Route path="/weektwo" element={<WeekTwoSecond />} />
        <Route path="/weekthree" element={<WeekThree />} />
      </Routes>
    </>
  );
}

export default App;
