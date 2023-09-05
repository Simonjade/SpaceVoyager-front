import React, { useEffect } from "react";
import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

export default function Destinations() {
  const [destinations, setDestinations] = useState(null);
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState(null);
  const fetchPlanets = async () => {
    try {
      const response = await axios.get(
        `https://space-voyager-back.onrender.com/planet`
      );
      console.log(response.data);
      setDestinations(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    console.log("destinations", destinations);
  }, [destinations]);

  return (
    <div>
      <div className="flex flex-col justify-center">
        {error ? (
          <p>Une erreur s'est produite : {error.message}</p>
        ) : destinations ? (
          <Carousel destinations={destinations} />
        ) : (
          <p>Chargement en cours...</p>
        )}
      </div>
    </div>
  );
}
