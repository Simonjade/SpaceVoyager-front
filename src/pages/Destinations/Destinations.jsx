import { useEffect } from "react";
import { useState } from "react";

//COMPONENT
import Carousel from "../../components/Carousel/Carousel";

// TOOLS
import request from "../../tools/request";

export default function Destinations() {
  const [destinations, setDestinations] = useState(null);
  const [error, setError] = useState(null);
  const fetchPlanets = async () => {
    try {
      const response = await request.generic().get(`/planet`);
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
