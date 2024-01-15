import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

import WeekOne from "./components/WeekOne.jsx";
import WeekOneTest from "./components/WeekOneTest.jsx";
import WeekTwo from "./components/WeekTwo.jsx";
import CodeTest from "./components/CodeTest.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      <Routes>
        {/* <Route path="/weekone" element={<WeekOne />} /> */}
        <Route path="/weekone" element={<WeekOneTest />} />
        <Route path="/codetest" element={<CodeTest />} />
        <Route path="/weektwo" element={<WeekTwo />} />
      </Routes>
    </>
  );
}

export default App;
