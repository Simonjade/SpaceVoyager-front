import React from "react";

export default function CardPlanet({ planetData, setCardSelected }) {
  console.log("planetData", planetData);
  return (
    <div className="">
      <div className="">
        <figure>
          <img src={`../../../../${planetData.img}`} alt={planetData.name} />
        </figure>
        <div className="">
          <button className="">Détails</button>
        </div>
      </div>
      <div className="">
        <h2 className="c">{planetData.name}</h2>
        <p>Prix du vol aller/retour:</p>
        <p>{planetData.price} €</p>
        <div className="">
          <button
            className=""
            onClick={() => setCardSelected(planetData)}
          >
            selectionner
          </button>
        </div>
      </div>
    </div>
  );
}
