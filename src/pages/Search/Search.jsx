import React, { useEffect, useState } from "react";
import SearchPlanet from "../../components/SearchPlanet/SearchPlanet";
import SearchHostel from "../../components/SearchHostel/SearchHostel";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [planet, setPlanet] = useState("");
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  const searchParams = new URLSearchParams(location.search);

  const departureDate = searchParams.get("departureDate");
  const comebackDate = searchParams.get("comebackDate");
  const person = searchParams.get("person");
  // const planet = searchParams.get("planet");
  return (
    <>
      {!planet ? (
        <SearchPlanet
          departureDate={departureDate}
          comebackDate={comebackDate}
          person={person}
          setPlanet={setPlanet}
        />
      ) : (
        <SearchHostel
          departureDate={departureDate}
          comebackDate={comebackDate}
          person={person}
          planet={planet}
        />
      )}
    </>
  );
}
