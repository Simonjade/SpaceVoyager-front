import { useState } from "react";
import "./App.css";
import "daisyui/dist/full.css";
import { Routes, Route } from "react-router-dom";

import Stars from "./components/Stars/Stars";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import SearchPlanet from "./components/SearchPlanet/SearchPlanet";
import Footer from "./components/Footer/Footer";
import Destinations from "./pages/Destinations/Destinations";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Profil from "./pages/Profil/Profil";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import BookingDetail from "./pages/BookingDetail/BookingDetail";

function App() {
  return (
    <>
      <Stars />
      <div className="relative flex flex-col justify-between h-screen">
        <Header />
        <div className="flex justify-start flex-col h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/detail" element={<BookingDetail />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
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
