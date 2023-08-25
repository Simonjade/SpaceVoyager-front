import React from "react";

export default function CardPlanet({ planetData, setPlanet }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img src={`../../../../${planetData.img}`} alt={planetData.name} />
        </figure>
        <div className="card-actions justify-end items-end">
          <button className="btn btn-primary">Détails</button>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{planetData.name}</h2>
        <p>Prix du vol aller/retour:</p>
        <p>{planetData.price} €</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleClick(() => setPlanet(planetData.name))}
          >
            selectionner
          </button>
        </div>
      </div>
    </div>
  );
}
