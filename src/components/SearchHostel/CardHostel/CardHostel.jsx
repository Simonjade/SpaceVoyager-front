import React, { useEffect } from "react";
import { useState } from "react";

export default function CardHostel({ hostelData, setRoom, setModalData }) {
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
    <div className="m-5 md:flex border-2 border-solid border-violet-900 rounded-lg backdrop-blur-sm bg-indigo-50/10">
      <div className="relative md:w-1/2">
        <figure>
          <img
            className="object-contain rounded-lg"
            src="../../../../public/hostel/hostel.jpg"
            alt={hostelData.name}
          />
        </figure>
        <label
          htmlFor="my-drawer-4"
          className="btn-primary absolute mb-2 mr-2 bottom-0 right-0 drawer-button btn"
          onClick={() => {
            setModalData(hostelData);
          }}
        >
          Détails
        </label>
      </div>
      <div className="flex flex-col md:justify-between gap-2 m-2 md:w-1/2">
        <h2 className="md:text-3xl md:mt-4 text-center font-bold">
          {hostelData.name}
        </h2>
        <div className="flex flex-col md:gap-3 gap-2">
          {hostelData.room.map((roomData) => (
            <label key={roomData.id}>
              <input
                type="radio"
                className="mr-2"
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
