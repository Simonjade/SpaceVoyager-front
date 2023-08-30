import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlanet from "./CardPlanet/CardPlanet";

import { useBooking } from "../../contexts/BoonkingContext";

export default function SearchPlanet({
  departureDate,
  comebackDate,
  person,
  setPlanet,
  planet,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSelected, setCardSelected] = useState([]);

  const { state, dispatch } = useBooking();

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
      setError(error);
    }
  };

  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet) => {
    setPlanet(planet.name);

    // Utilisez dispatch pour enregistrer l'objet planet choisie
    dispatch({ type: "SET_PLANET", payload: planet });

    navigate(
      `/search?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet.name}`
    );
  };

  useEffect(() => {
    fetchSearchPlanet();
  }, []);

  useEffect(() => {
    console.log("cardSelected", cardSelected);
  }, [cardSelected]);

  return (
    <>
      <h1>SearchPlanet</h1>
      <div className="card card-side">
        <div className="card-body  w-1/3 bg-base-100 shadow-xl">
          <h2 className="card-title">date aller :</h2>
          <p>{departureDate}</p>
        </div>
        <div className="card-body  w-1/3 bg-base-100 shadow-xl">
          <h2 className="card-title">date retour :</h2>
          <p>{comebackDate}</p>
        </div>
        <div className="card-body  w-1/3 bg-base-100 shadow-xl">
          <h2 className="card-title">Passagers :</h2>
          <p>{person}</p>
        </div>
      </div>
      <div className="card card-side">
        <div className="card-body  w-1/3 bg-base-100 shadow-xl">
          <h2 className="card-title">Planet selectionnée :</h2>
          {cardSelected.name ? <p>{cardSelected.name}</p> : <p>_</p>}
        </div>
        <div className="card-body  w-2/3 bg-base-100 shadow-xl">
          <h2 className="card-title">détails voyage :</h2>
          <p>
            Prix :{" "}
            {cardSelected.name ? (
              <span>
                {cardSelected.price}€ x {person}
              </span>
            ) : (
              <sapn>_</sapn>
            )}
          </p>
          <p>Prix total : {cardSelected.price * person}€</p>
        </div>
      </div>

      <ul className="steps">
        <li className="step step-primary">Choix planet</li>
        <li className="step">Choix hotel</li>
        <li className="step">Confirmation</li>
      </ul>

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
