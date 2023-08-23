import { useState } from "react";
import "./App.css";
import "daisyui/dist/full.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;

{
  /* <div className="bg-blue-500 text-white p-4">
        C'est un exemple de composant React avec Tailwind CSS.
      </div>
      <button className="btn btn-primary">Bouton Daisy UI</button>
      <div className="join join-vertical">
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
        <button className="btn btn-primary join-item">Bouton Daisy UI</button>
      </div>
      <div className="container mx-auto p-4"></div>
      </div> */
}
