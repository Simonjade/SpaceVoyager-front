import React from "react";
import { useBooking } from "../../contexts/BoonkingContext";

export default function BookingDetail() {
  const { state } = useBooking();

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <h1>BookingDetail</h1>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg drop-shadow-lg p-4 w-5/6">
          <h2 className="text-2xl font-semibold mb-4">
            Récapitulatif de votre voyage
          </h2>
          <h3 className="text-xl font-semibold">Informations du voyage</h3>
          <div className="flex">
            <img
              class="object-contain h-1/3 w-1/4"
              src={`../../../../${state.planet.img}`}
              alt={state.planet.name}
            ></img>
            <div className="mb-4">
              <p className="text-gray-600">
                Date de départ : {state.departure}
              </p>
              <p className="text-gray-600">Date de retour : {state.comeBack}</p>
              <p className="text-gray-600">Destination : {state.planet.name}</p>
            </div>
          </div>
          <p className="text-gray-600">Date de retour : {state.hostel.name}</p>
          <p className="text-gray-600">
            Destination : {state.hostel.room_type}
          </p>

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
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg drop-shadow-lg p-4 w-5/6">
          <h2 className="text-2xl font-semibold mb-4">Récapitulatif du prix</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Prix par personne</h3>
            <div className="flex">
              <p className="text-green-600 text-xl font-semibold">
                {state.planet.price + state.hostel.price} €
              </p>
              <p className="text-white-600 text-xl font-semibold">
                x {state.person}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Prix total</h3>
            <p className="text-green-600 text-xl font-semibold">
              {state.planet.price * state.person} €
            </p>
          </div>

          <button className="btn btn-primary">Confirmer la réservation</button>
        </div>
      </div>
    </>
  );
}
