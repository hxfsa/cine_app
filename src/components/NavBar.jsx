import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";


export default function Navbar() {
  return (
    <nav className="bg-gray-800">
        <div className=" flex h-16 items-center justify-between">
          <img src="./assets/movie.png" alt="" />
          <div className="flex">
            <NavLink to="https://github.com/hxfsa">
            <img src="./assets/icons8-github-48.png" alt="" />
            </NavLink>
            <Link to="./public/CV_Hafsa_Stage.pdf" target="_blank">
            <img src="./assets/cv.png" alt="CV" />
            </Link>
          </div>
      </div>
    </nav>
  );
}
