import { useState } from "react";
import ThreePlanet from "../ThreeScene/ThreePlanet";

//IMPORT IMG
import planetImg from "../../assets/planet/PlanetImg";

export default function Carousel({ destinations }) {
  return (
    <div className="carousel">
      {destinations.map((destination, index) => (
        <div
          id={`slide${index}`}
          className="carousel-item relative w-full"
          key={index}
        >
          {/* Planet ThreeJS */}
          <div className="flex flex-col lg:flex-row  w-full">
            <div className="lg:w-1/2">
              <ThreePlanet planetName={destination.name} />
            </div>

            {/* Planet infos */}
            <div className="lg:w-1/3 sm:w-2/3 self-center bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg m-4">
              <div className="bg-zinc-900 h-full rounded-lg p-4">
                <h2 className="text-center text-white text-5xl border-b-2 border-b-primary pb-3 mb-3">
                  {destination.name}
                </h2>
                <p className="text-white">
                  <strong>Radius</strong> : {destination.radius} km
                </p>
                <p className="text-white">
                  <strong>Distance</strong> : {destination.distance}M km
                </p>
                <p className="text-white">
                  <strong>Durée du trajet</strong> :{" "}
                  {destination.distance_light_year} Jours
                </p>
                <p className="text-white">
                  <strong>Temp max</strong> : {destination.temp_max}°C
                </p>
                <p className="text-white">
                  <strong>Temp min</strong> : {destination.temp_min}°C
                </p>
                <br />
                <p className="text-white">
                  <strong>Contenu</strong> : {destination.content}
                </p>
              </div>
            </div>
            {/* Boutons */}
            
              <a href={`#slide${index - 1}`} className="absolute -translate-y-1/2 left-5 top-1/2 btn btn-circle">
                ❮
              </a>
              <a href={`#slide${index + 1}`} className="absolute -translate-y-1/2 right-5 top-1/2 btn btn-circle start-left">
                ❯
              </a>
            
          </div>
        </div>
      ))}
    </div>
  );
}
