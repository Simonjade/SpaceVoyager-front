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
      const response = await axios.get(`http://localhost:3000/planet`);
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
      <div className="flex flex-col justify-start mt-[100px]">
        <div className="carousel w-full" style={{ maxWidth: "900px" }}>
          {/* <div className="carousel-item relative w-full">
            <img
              className="w-full"
              src={`../../../../moon.jpg`}
              style={{ padding: "25% 0" }}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button href="#slide4" className="btn btn-circle">
                ❮
              </button>
              <button href="#slide2" className="btn btn-circle">
                ❯
              </button>
            </div>
          </div> */}

          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="../../../../photo-1534528741775-53994a69daeb.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="../../../../photo-1534528741775-53994a69daeb.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="../../../../photo-1534528741775-53994a69daeb.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <p>Une erreur s'est produite : {error.message}</p>
      ) : destinations ? (
        <Carousel destinations={destinations} />
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}
