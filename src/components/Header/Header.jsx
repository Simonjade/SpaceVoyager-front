import React from "react";
import NavBar from "./NavBar/NavBar";
import Avatar from "./NavBar/Avatar";
import LogoMini from "../LogoMini/LogoMini";
import Title from "../Title/Title";

export default function Header() {
  return (
    <>
      <div className="mb-4">
        <div className="header top-0 left-0 w-full bg-inherit text-white flex justify-between items-center p-4">
          <LogoMini />
          <div className="flex gap-4 ml-auto items-center">
            <Avatar />
            <NavBar />
          </div>
        </div>
        <Title />
      </div>
    </>
  );
}
