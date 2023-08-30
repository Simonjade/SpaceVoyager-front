import React from "react";

export default function CardPlanet({ planetData, setCardSelected }) {
  console.log("planetData", planetData);
  return (
    <div className="p-5">
      <div className="relative">
        <figure>
          <img src={`../../../../${planetData.img}`} alt={planetData.name} />
        </figure>
        <button className="btn-primary absolute bottom-0 right-0">
          Détails
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold">{planetData.name}</h2>
        <p>Prix du vol aller/retour: {planetData.price} €</p>
        <button
          className="btn-secondary"
          onClick={() => setCardSelected(planetData)}
        >
          selectionner
        </button>
      </div>
      <div className="divider lg:divider-horizontal before:bg-primary after:bg-secondary max-w-100"></div>
    </div>
  );
}
