import React, { useEffect } from "react";
import hostel from "../../../assets/hostel.jpg";
import { useState } from "react";

export default function CardHostel({ hostelData, setRoom }) {
  // Créez un état pour gérer les cases à cocher
  const [checkboxes, setCheckboxes] = useState([]);

  // Gérez les modifications d'état de chaque case à cocher
  const handleCheckboxChange = (room) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[room.room_type] = !updatedCheckboxes[room.room_type];
    setCheckboxes(updatedCheckboxes);

    setRoom(room);
  };
  useEffect(() => {
    console.log(checkboxes);
  }, [checkboxes]);
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img src={hostel} alt={hostelData.name} />
        </figure>
        <div className="card-actions justify-end items-end">
          <button className="btn btn-primary">Détails</button>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{hostelData.name}</h2>
        <p>Prix du vol aller/retour:</p>
        <p>{hostelData.price} €</p>
        <div className="card-actions justify-end">
          {hostelData.room.map((roomData) => (
            <label key={roomData.id}>
              <input
                type="checkbox"
                checked={checkboxes[roomData.room_type] || false}
                onChange={() => handleCheckboxChange(roomData)}
              />
              {roomData.room_type} : {roomData.price}€
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
