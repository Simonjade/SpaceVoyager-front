import React from "react";
import NavBar from "./NavBar/NavBar";
import Avatar from "./NavBar/Avatar";

export default function Header() {
  return (
    <>
      <div className="header top-0 left-0 w-full bg-gray-800 text-white p-1 flex justify-between items-center">
        <div className="flex ml-auto items-center space-x-4">
          <Avatar />
          <NavBar />
        </div>
      </div>
    </>
  );
}

// "header fixed top-0 left-0 w-full bg-gray-800 text-white p-1"
