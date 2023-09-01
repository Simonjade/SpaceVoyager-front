import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBeer } from "react-icons/fa";

import request from "../../tools/request";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

export default function ReservationCard({ reservation }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = auth.getAccessToken();
    try {
      const response = await request
        .protected(token)
        .delete(`/booking/${reservation.booking_id}`);
      console.log(response);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card card-side backdrop-blur-sm bg-indigo-50/10 text-white shadow-xl md:m-5 mb-6 m-4 border-2 border-primary">
        <figure className="w-1/3 bg-black">
          <img src={reservation.planet_img} alt="planet" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Voyage vers {reservation.planet_name}</h2>
          <div className="">
            <p>Date de départ : {reservation.departure_date}</p>
            <p>Date de retour : {reservation.comeback_date}</p>
            <p>Destination : {reservation.planet_name}</p>
            <p>Hotel : {reservation.hostel_name}</p>
            <p>Chambre : {reservation.room_rank}</p>
            <p>
              Prix total :{" "}
              {reservation.planet_price +
                reservation.room_price * reservation.booking_nbparticipants}
              €
            </p>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleDelete()}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
