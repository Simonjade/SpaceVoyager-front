import React from "react";
import "./notFound.css";

export default function NotFound() {
  return (
    <div className="flex flex-col justify- mt-10">
      <p className="text-white self-center font-bold text-6xl gap-8 ">404</p>
      <div className="flex astronaut">
        <div className="head"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="body">
          <div className="panel"></div>
        </div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
        <div className="schoolbag"></div>
      </div>
    </div>
  );
}
