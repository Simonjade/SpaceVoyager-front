import React from "react";

export default function CardPlanet({
  planetData,
  setCardSelected,
  setModalData,
}) {
  return (
    <div className="m-5 md:flex border-2 border-solid border-violet-900 rounded-lg backdrop-blur-sm bg-indigo-50/10">
      <div className="relative md:w-1/2">
        <figure>
          <img
            className="object-contain rounded-lg"
            src={`../../../../${planetData.img}`}
            alt={planetData.name}
          />
        </figure>
        <label
          htmlFor="my-drawer-4"
          className="btn-primary absolute mb-2 mr-2 bottom-0 right-0 drawer-button btn"
          onClick={() => {
            setModalData(planetData);
          }}
        >
          Détails
        </label>
      </div>
      <div className="flex flex-col md:justify-between gap-2 m-2 md:w-1/2">
        <h2 className="md:text-3xl md:mt-4 text-center font-bold">
          {planetData.name}
        </h2>
        <div className="flex flex-col md:gap-3 gap-2">
          <p className="md:text-lg">
            Prix du vol aller/retour:{" "}
            <span className="font-bold">{planetData.price}</span> €
          </p>
          <button
            className="btn-secondary mb-2 md:mb-0"
            onClick={() => setCardSelected(planetData)}
          >
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );
}
