import axios from "axios";
import React, { useEffect, useState } from "react";
import CardHostel from "./CardHostel/CardHostel";
import { useNavigate } from "react-router-dom";

export default function SearchHostel({
  departureDate,
  comebackDate,
  person,
  planet,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hostel, setHostel] = useState(null);
  useEffect(() => {
    console.log("hostel", hostel);
  }, [hostel]);

  const fetchSearchHostel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}&planet=${planet}`
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

  useEffect(() => {
    fetchSearchHostel();
  }, []);
  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet, hostel) => {
    // setPlanet(planet);
    console.log(hostel);
    navigate(
      `/detail?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet}&hostel=${hostel}`
    );
  };
  return (
    <>
      <h1>SearchHostel</h1>
      <div class="overflow-y-auto w-5/6- max-h-[600px]">
        {error ? (
          <p>Une erreur s'est produite : {error.message}</p>
        ) : data ? (
          data.map((hostelData) => (
            <CardHostel
              key={hostelData.id}
              hostelData={hostelData}
              setHostel={setHostel}
            />
          ))
        ) : (
          <p>Chargement en cours...</p>
        )}
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (hostel) {
            handleClick(departureDate, comebackDate, person, hostel);
          }
        }}
      >
        VALIDER
      </button>
    </>
  );
}
