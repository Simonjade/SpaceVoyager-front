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
    <div className="flex flex-col justify-start mt-10">
      <div className="carousel w-full max-w-screen-lg mx-auto relative">
        {destinations.map((destination, index) => (
          <div
            key={`slide${index + 1}`}
            id={`slide${index + 1}`}
            className={`carousel-image relative w-full ${
              index + 1 === slide ? "" : "hidden"
            }`}
          >
            <img
              className="w-full h-auto" // Ajustez la classe CSS pour le dimensionnement de l'image
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
        ))}
      </div>
    </div>
  );
}
