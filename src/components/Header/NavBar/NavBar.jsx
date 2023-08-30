//eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import useIsAuthenticated from "../../../hooks/useIsAuthenticated";

import { AuthContext } from "../../../contexts/AuthContext";
import { StoreContext } from "../../../contexts/StoreContext";
/* import ProtectedZone from "../../Protected/Protected";
ProtectedZone; */

export default function NavBar() {
  const auth = useContext(AuthContext);
  const store = useContext(StoreContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  /* const [islogged, setIsLogged] = useState(false); */

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {}, [isAuthenticated]);

  useEffect(() => {}, [auth]);

  useEffect(() => {
    //eslint-disable-next-line
  }, [store]);

  return (
    <div className="relative inline-block text-left ">
      <button
        type="button"
        className="btn btn-circle swap swap-rotate"
        onClick={toggleMenu}
      >
        {/* hamburger icon */}
        <svg
          className={`swap-off fill-current ${isMenuOpen ? "hidden" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          {/* Icône hamburger */}
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className={`swap-on fill-current ${isMenuOpen ? "" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          {/* Icône de fermeture */}
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </button>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="py-1 bg-white rounded-md shadow-xs">
          <a
            href="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Accueil
          </a>
          {!isAuthenticated ? (
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Login
            </a>
          ) : (
            <a
              href="/profil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          )}

          <a
            href="/destinations"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Destinations
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            A propos
          </a>
        </div>
      </div>
    </div>
  );
}

/* <div className="navbar bg-base-300 rounded-box">
<div className="flex-1 px-2 lg:flex-none">
  <a className="text-lg font-bold">daisyUI</a>
</div>
<div className="flex justify-end flex-1 px-2">
  <div className="flex items-stretch">
    <a className="btn btn-ghost rounded-btn">Button</a>
    <div className="dropdown dropdown-end">
      <label className="btn btn-circle swap swap-rotate">
        {/* this hidden checkbox controls the state */
//         <input type="checkbox" />

//         {/* hamburger icon */}
//         <svg
//           className="swap-off fill-current"
//           xmlns="http://www.w3.org/2000/svg"
//           width="32"
//           height="32"
//           viewBox="0 0 512 512"
//         >
//           <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
//         </svg>

//         {/* close icon */}
//         <svg
//           className="swap-on fill-current"
//           xmlns="http://www.w3.org/2000/svg"
//           width="32"
//           height="32"
//           viewBox="0 0 512 512"
//         >
//           <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
//         </svg>
//       </label>
//       <ul
//         tabindex="0"
//         className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
//       >
//         <li>
//           <a>Item 1</a>
//         </li>
//         <li>
//           <a>Item 2</a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// </div>
