import React from "react";

export default function Title() {
  return (
    <>
      <div className=" pl-5 portrait:mb-10 landscape:mb-3">
        <h1 className="hero lg:text-8xl md:text-6xl text-center font-extrabold bg-gradient-to-l from-fuchsia-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          SPACE VOYAGER
        </h1>
        <h2 className="text-xs tracking-widest hero">
          UN PEU PLUS PRES DES ETOILES
        </h2>
      </div>
    </>
  );
}
