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
    <div className="collapse bg-base-200 w-10/12 lg:w-8/12 m-1">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        Your trip to {reservation.planet_name}
      </div>
      <div className="collapse-content">
        <figure className="">
          <img
            src={reservation.planet_img}
            alt="planet_image"
            className="rounded-lg w-full mb-5"
          />
        </figure>
        <div className="">
          <p>Your departure date : {reservation.departure_date}</p>
          <p>Your comeback date : {reservation.comeback_date}</p>
          <p>Your destination : {reservation.planet_name}</p>
          <p>Your hostel : {reservation.hostel_name}</p>
          <p>Your room : {reservation.room_rank}</p>
          <p>
            Total price :{" "}
            {reservation.planet_price +
              reservation.room_price * reservation.booking_nbparticipants}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => handleDelete()}>
            Delete Trip
          </button>
        </div>
      </div>
    </div>
  );
}
