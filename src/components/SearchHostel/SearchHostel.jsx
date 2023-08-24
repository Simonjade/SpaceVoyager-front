import axios from "axios";
import React, { useEffect } from "react";

export default function SearchHostel({
  departureDate,
  comebackDate,
  person,
  planet,
}) {
  const fetchSearchHostel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}&planet=${planet}`
      );
      console.log(response);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  };

  useEffect(() => {
    fetchSearchHostel();
  }, []);

  return <h1>SearchHostel</h1>;
}
