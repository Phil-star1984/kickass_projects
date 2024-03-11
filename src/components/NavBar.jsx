import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar_outer_container">
      <NavLink to="/">
        <h1 className="navbar_logo">KickAss Projects</h1>
      </NavLink>
      <ul className="navbar_navlinks">
        <li>
          <NavLink to="/weekone">Week 1</NavLink>
        </li>
        <li>
          <NavLink to="/weektwo">Week 2</NavLink>
        </li>
        <li>
          <NavLink to="/weekthree">Week 3</NavLink>
        </li>
        <li>
          <NavLink to="/weekfour">Week 4</NavLink>
        </li>
        <li>
          <NavLink to="/weekfive">Week 5</NavLink>
        </li>
        <li>
          <NavLink to="/weeksix">Week 6</NavLink>
        </li>
        <li>
          <NavLink to="/weekseven">Week 7</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
