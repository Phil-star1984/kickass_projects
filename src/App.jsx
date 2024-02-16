import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
/* import WeekOne from "./components/WeekOne.jsx"; */
/* import WeekTwo from "./components/WeekTwo.jsx"; */
import Home from "./pages/Home.jsx";
import WeekOneTest from "./components/WeekOneTest.jsx";
import WeekTwoSecond from "./components/WeekTwoSecond.jsx";
import WeekThree from "./components/WeekThree.jsx";
import Footer from "./components/Footer.jsx";
import WeekFour from "./components/WeekFour.jsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekone" element={<WeekOneTest />} />
        <Route path="/weektwo" element={<WeekTwoSecond />} />
        <Route path="/weekthree" element={<WeekThree />} />
        <Route path="/weekfour" element={<WeekFour />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
