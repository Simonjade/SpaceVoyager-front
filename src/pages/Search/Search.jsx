import { useState } from "react";

//COMPONENT
import SearchPlanet from "../../components/SearchPlanet/SearchPlanet";
import SearchHostel from "../../components/SearchHostel/SearchHostel";

export default function Search() {
  const [planet, setPlanet] = useState("");

  return (
    <>{!planet ? <SearchPlanet setPlanet={setPlanet} /> : <SearchHostel />}</>
  );
}
