import React from "react";
import NavBar from "./NavBar/NavBar";
import Avatar from "./NavBar/Avatar";
import LogoMini from "../LogoMini/LogoMini";
import Title from "../Title/Title";

export default function Header() {
  return (
    <>
      <div className="mb-4">
        <NavBar />
      </div>
    </>
  );
}
