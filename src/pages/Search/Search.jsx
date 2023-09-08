import { useState } from "react";

//COMPONENT
import SearchPlanet from "../../components/SearchPlanet/SearchPlanet";
import SearchHostel from "../../components/SearchHostel/SearchHostel";

export default function Search() {
  // STATES
  const [planet, setPlanet] = useState("");

  // RENDER
  return (
    <>{!planet ? <SearchPlanet setPlanet={setPlanet} /> : <SearchHostel />}</>
  );
}
