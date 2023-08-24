import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPlanet({
  departureDate,
  comebackDate,
  person,
  setPlanet,
}) {
  const fetchSearchPlanet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}`
      );
      console.log(response);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  };
  const planet = "Saturne";
  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet) => {
    setPlanet(planet);
    navigate(
      `/search?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet}`
    );
  };

  useEffect(() => {
    fetchSearchPlanet();
  }, []);

  return (
    <>
      <h1>SearchPlanet</h1>
      <button
        className="btn btn-primary"
        onClick={() => handleClick(departureDate, comebackDate, person, planet)}
      >
        VALIDER
      </button>
    </>
  );
}
