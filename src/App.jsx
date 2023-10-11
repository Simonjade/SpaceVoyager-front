// IMPORT ROUTER
import { Routes, Route } from "react-router-dom";

//IMPORT FOR PAGES
import Home from "./pages/Home/Home";
import Destinations from "./pages/Destinations/Destinations";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Profil from "./pages/Profil/Profil";
import Login from "./pages/Login/Login";
import BookingDetail from "./pages/BookingDetail/BookingDetail";
import SearchPlanet from "./pages/SearchPlanet/SearchPlanet";
import SearchHostel from "./pages/SearchHostel/SearchHostel";

//COMPONENT
import Stars from "./components/Stars/Stars";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//APP AND ROUTING
function App() {
  // RENDER
  return (
    <>
      <Stars />
      <div className="relative flex flex-col justify-between h-screen min-h-[100dvh]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="SearchPlanet" element={<SearchPlanet />} />
          <Route path="SearchHostel" element={<SearchHostel />} />
          <Route path="Profil" element={<Profil />} />
          <Route path="Login" element={<Login />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="detail" element={<BookingDetail />}></Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
