import React from "react";
import { useBooking } from "../../contexts/BoonkingContext";

export default function BookingDetail() {
  const { state } = useBooking();

  return (
    <>
      <h1>BookingDetail</h1>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg drop-shadow-lg p-4 w-5/6">
        <h2 className="text-2xl font-semibold mb-4">
          Récapitulatif de votre voyage
        </h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Informations du voyage</h3>
          <p className="text-gray-600">Date de départ : {state.departure}</p>
          <p className="text-gray-600">Date de retour : {state.comeBack}</p>
          <p className="text-gray-600">Destination : {state.planet.name}</p>
        </div>

        {/* <div className="mb-4">
        <h3 className="text-xl font-semibold">Passagers</h3>
        <ul>
          {voyageData.passagers.map((passager, index) => (
            <li key={index} className="text-gray-600">
              {passager.nom} ({passager.age} ans)
            </li>
          ))}
        </ul>
      </div> */}

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Prix total</h3>
          <p className="text-green-600 text-xl font-semibold">
            {state.planet.price} €
          </p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Confirmer la réservation
        </button>
      </div>
    </>
  );
}
