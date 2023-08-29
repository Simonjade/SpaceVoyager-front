import React from "react";
import NavBar from "./NavBar/NavBar";
import Avatar from "./NavBar/Avatar";
import LogoMini from "../LogoMini/LogoMini";

export default function Header() {
  return (
    <>
      <div className="header top-0 left-0 w-full bg-inherit text-white p-1 flex justify-between items-center mb-3">
      <div className="flex justify-between w-full ml-auto items-center pt-4 px-4">
        <LogoMini />
        <div className="flex gap-4 ml-auto items-center">
          <Avatar />
          <NavBar />
        </div>
      </div>

      </div>
    </>
  );
}

// "header fixed top-0 left-0 w-full bg-gray-800 text-white p-1"
