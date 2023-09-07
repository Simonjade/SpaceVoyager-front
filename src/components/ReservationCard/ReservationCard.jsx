import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//TOOLS
import request from "../../tools/request";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";
import planetImg from "../../assets/planet/PlanetImg";

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
    <div className="">
      <div className="m-8 md:flex bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg">
      <div className="relative md:w-1/2">
          <img
            src={planetImg[reservation.planet_name.toLowerCase()]}
            alt={reservation.planet_name}
            className="object-cover w-full h-full rounded-t-lg md:rounded-lg md:rounded-br-none md:rounded-tr-none"
          />
          </div>
        <div className="flex flex-col p-5 lg:flex-rows md:justify-between gap-3 md:w-1/2 text-white shadow-2xl bg-zinc-900 hover:bg-black/80 hover:backdrop-blur-xl group hover:transition-colors hover:duration-300 duration-500 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h2 className="card-title border-b-2 border-b-primary group-hover:border-b-white hover:transition-colors hover:duration-300 duration-500 pb-3">Voyage vers {reservation.planet_name}</h2>
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
          <div className="card-actions justify-end">
            <button className="lg:w-1/2 btn-neutral" onClick={() => handleDelete()}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
