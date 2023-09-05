import React, { useEffect, useState } from "react";

export default function Carousel({ destinations }) {
  const [slide, setSlide] = useState(1);

  const handlePrevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 1 ? destinations.length : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === destinations.length ? 1 : prevSlide + 1
    );
  };

  return (
    <div className="backdrop-blur-sm bg-indigo-50/20 shadow-xl">
      <div className="h-max">
        <div className="carousel flex flex-col lg:flex-row justify-start">
          {destinations.map((destination, index) => (
            <div
              key={`slide${index + 1}`}
              id={`slide${index + 1}`}
              className={`carousel-image relative w-full ${
                index + 1 === slide ? "" : "hidden"
              }`}
            >
              <div>
                <img
                  className="w-full p-2" // Ajustez la classe CSS pour le dimensionnement de l'image
                  src={`../../../../${destination.img}`}
                  alt={destination.name}
                />
                <div className="absolute inset-0 flex justify-between items-center px-5">
                  <button
                    className="bg-white bg-opacity-50 text-gray-700 p-2 rounded-full"
                    onClick={handlePrevSlide}
                  >
                    ❮
                  </button>
                  <button
                    className="bg-white bg-opacity-50 text-gray-700 p-2 rounded-full"
                    onClick={handleNextSlide}
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>
          ))}
          {destinations.map((destination, index) => (
            <div
              key={`slide${index + 1}`}
              id={`slide${index + 1}`}
              className={`w-full ${
                index + 1 === slide ? "" : "hidden"
              } card-body`}
            >
              <div className="h-full">
                <h2 className="card-title text-white text-5xl mb-3">
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
          ))}
        </div>
      </div>
    </div>
  );
}
