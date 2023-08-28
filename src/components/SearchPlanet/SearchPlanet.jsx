import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlanet from "./CardPlanet/CardPlanet";

export default function SearchPlanet({
  departureDate,
  comebackDate,
  person,
  setPlanet,
  planet,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSelected, setCardSelected] = useState(null);

  const fetchSearchPlanet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(erreur);
    }
  };

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
      <div class="overflow-y-auto w-5/6- max-h-[600px]">
        {error ? (
          <p>Une erreur s'est produite : {error.message}</p>
        ) : data ? (
          data.map((planetData) => (
            <CardPlanet
              key={planetData.id}
              planetData={planetData}
              setCardSelected={setCardSelected}
            />
          ))
        ) : (
          <p>Chargement en cours...</p>
        )}
      </div>
      <button
        className="btn btn-primary"
        onClick={() =>
          handleClick(departureDate, comebackDate, person, cardSelected)
        }
      >
        VALIDER
      </button>
    </>
  );
}
