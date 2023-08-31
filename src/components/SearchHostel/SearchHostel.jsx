import axios from "axios";
import React, { useEffect, useState } from "react";
import CardHostel from "./CardHostel/CardHostel";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../../contexts/BoonkingContext";

export default function SearchHostel({
  departureDate,
  comebackDate,
  person,
  planet,
}) {
  const [hostel, setHostel] = useState(null);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);

  const { state, dispatch } = useBooking();

  useEffect(() => {
    console.log("hostel", hostel);
  }, [hostel]);

  useEffect(() => {
    console.log("room", room);
  }, [room]);

  const fetchSearchHostel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}&planet=${planet}`
      );
      console.log(response.data);
      setHostel(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(error);
    }
  };

  useEffect(() => {
    fetchSearchHostel();
  }, []);
  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet, hostel, room) => {
    console.log(room);

    // Utilisez dispatch pour enregistrer l'objet planet choisie
    dispatch({ type: "SET_HOSTEL", payload: hostel[0] });

    // Utilisez dispatch pour enregistrer l'objet planet choisie
    dispatch({ type: "SET_ROOM", payload: room });

    navigate(
      `/detail?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet}&hostel=${hostel.name}`
    );
  };
  return (
    <>
      <h1>SearchHostel</h1>
      <div></div>
      <div className="overflow-y-auto w-5/6- max-h-[600px]">
        {error ? (
          <p>Une erreur s'est produite : {error.message}</p>
        ) : hostel ? (
          hostel.map((hostelData) => (
            <CardHostel
              key={hostelData.id}
              hostelData={hostelData}
              setRoom={setRoom}
            />
          ))
        ) : (
          <p>Chargement en cours...</p>
        )}
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (room) {
            handleClick(
              departureDate,
              comebackDate,
              person,
              planet,
              hostel,
              room
            );
          }
        }}
      >
        VALIDER
      </button>
    </>
  );
}
