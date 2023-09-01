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
    <div className="h-max">
      <div className="carousel">
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
            className={`w-full ${index + 1 === slide ? "" : "hidden"}`}
          >
            <div className="h-full">
              <div className="text-primary hero text-5xl mb-3">
                {destination.name}
              </div>
              <div className="text-primary">radius : {destination.radius}</div>
              <div className="text-primary">
                distance : {destination.distance}
              </div>
              <div className="text-primary">
                distance light year : {destination.distance_light_year}
              </div>
              <div className="text-primary">
                temp max : {destination.temp_max}
              </div>
              <div className="text-primary">
                temp min : {destination.temp_min}
              </div>
              <div className="text-primary">
                contenu : {destination.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
