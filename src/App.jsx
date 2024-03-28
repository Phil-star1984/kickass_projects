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
import WeekFive from "./components/WeekFive.jsx";
import WeekSix from "./components/WeekSix.jsx";
import WeekSeven from "./components/WeekSeven.jsx";
import WeekEight from "./components/WeekEight.jsx";
import WeekNine from "./components/WeekNine.jsx";
import WeekTen from "./components/WeekTen.jsx";

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
        <Route path="/weekfive" element={<WeekFive />} />
        <Route path="/weeksix" element={<WeekSix />} />
        <Route path="/weekseven" element={<WeekSeven />} />
        <Route path="/weekeight" element={<WeekEight />} />
        <Route path="/weeknine" element={<WeekNine />} />
        <Route path="/weekten" element={<WeekTen />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
