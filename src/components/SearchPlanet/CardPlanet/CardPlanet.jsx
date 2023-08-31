import React from "react";

export default function CardPlanet({ planetData, setCardSelected }) {
  console.log("planetData", planetData);
  return (
    <div className="m-5 lg:flex rounded-lg backdrop-blur-sm bg-indigo-50/10">
      <div className="relative lg:w-1/2">
        <figure>
          <img
            className="object-contain"
            src={`../../../../${planetData.img}`}
            alt={planetData.name}
          />
        </figure>
        <button className="btn-primary absolute mb-2 mr-2 bottom-0 right-0">
          Détails
        </button>
      </div>
      <div className="flex flex-col lg:justify-between gap-3 m-2 lg:w-1/2">
        <h2 className="lg:text-xl font-bold">{planetData.name}</h2>
        <div className="flex flex-col gap-2">
          <p>Prix du vol aller/retour: {planetData.price} €</p>
          <button
            className="btn-secondary"
            onClick={() => setCardSelected(planetData)}
          >
            selectionner
          </button>
        </div>
      </div>
      <div className="lg:hidden divider lg:divider-horizontal before:bg-primary after:bg-secondary max-w-100"></div>
    </div>
  );
}
