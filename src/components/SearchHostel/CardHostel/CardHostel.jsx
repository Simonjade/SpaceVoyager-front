import { useEffect, useState } from "react";
import hostelImg from "../../../assets/hostel/HostelImg";
import { useBooking } from "../../../contexts/BoonkingContext";

export default function CardHostel({
  hostelData,
  setHostel,
  setRoom,
  setModalData,
}) {
  const [isMounted, setIsMounted] = useState(false); // État pour suivre l'état de montage

  // État pour suivre l'option sélectionnée
  const [selectedOption, setSelectedOption] = useState("");

  // CONTEXTS
  const { state, dispatch } = useBooking();

  // Fonction pour gérer le changement de l'option sélectionnée
  const handleOptionChange = (roomSelected) => {
    setSelectedOption(roomSelected.room_type);
    setHostel(hostelData);
    setRoom(roomSelected);
  };

  // USE EFFECTS
  useEffect(() => {
    console.log("state.hostel.name", state.hostel.name);
    console.log("hostelData.name", hostelData.name);
    if (state.room && state.hostel.name === hostelData.name) {
      setSelectedOption(state.room.room_type);
      setHostel(hostelData);
      setRoom(state.room);
    } else {
      setRoom(null);
      console.log("room est null");
    }
  }, []);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const formattedImageName = hostelData.name.replace(/['\s]/g, "_");

  return (
    <div className="mx-8 mb-16 md:flex bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg">
      <div className="relative md:w-1/2">
        <img
          className="object-cover w-full h-full rounded-t-lg md:rounded-lg md:rounded-br-none md:rounded-tr-none"
          src={hostelImg[formattedImageName]}
          alt={hostelData.name}
        />

        <label
          htmlFor="my-drawer-4"
          className="btn-primary absolute mb-5 mr-5 bottom-0 right-0 drawer-button btn"
          onClick={() => {
            setModalData(hostelData);
          }}
        >
          Détails
        </label>
      </div>
      <div className="flex flex-col p-5 lg:flex-rows md:justify-between gap-3 md:w-1/2 text-white shadow-2xl bg-zinc-900 hover:bg-black/80 hover:backdrop-blur-xl group hover:transition-colors hover:duration-300 duration-500 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
        <h2 className="md:text-xl text-center pb-3 font-bold border-b-2 border-b-primary group-hover:border-b-white hover:transition-colors hover:duration-300 duration-500">
          {hostelData.name}
        </h2>
        <p className="hidden lg:block text-sm">
          {hostelData.content.substring(0, 150)}...
        </p>
        <div className="flex flex-col md:gap-3 gap-2">
          {hostelData.room.map((roomData) => (
            <label key={roomData.id}>
              <input
                type="radio"
                className="mr-2"
                value={roomData.room_type}
                checked={selectedOption === roomData.room_type}
                onChange={() => handleOptionChange(roomData)}
              />
              {roomData.room_type} : {roomData.price}€
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
