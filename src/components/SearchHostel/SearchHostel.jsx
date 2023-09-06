import { useEffect, useState } from "react";
import CardHostel from "./CardHostel/CardHostel";
import { useNavigate } from "react-router-dom";
import ThreeHostel from "../ThreeScene/ThreeHostel";
import { useBooking } from "../../contexts/BoonkingContext";

// TOOLS
import request from "../../tools/request";

export default function SearchHostel({
  departureDate,
  comebackDate,
  person,
  planet,
}) {
  const [hostel, setHostel] = useState(null);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const [modaldata, setModalData] = useState([]);

  const { state, dispatch } = useBooking();

  const navigate = useNavigate();

  const fetchSearchHostel = async () => {
    try {
      const response = await request
        .generic()
        .get(
          `/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}&planet=${planet}`
        );
      setHostel(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(error);
    }
  };

  const handleClick = (start, end, passengers, planet, hostel, room) => {
    if (room) {
      // Utilisez dispatch pour enregistrer l'objet planet choisie
      dispatch({ type: "SET_HOSTEL", payload: hostel[0] });

      // Utilisez dispatch pour enregistrer l'objet planet choisie
      dispatch({ type: "SET_ROOM", payload: room });

      navigate(
        `/detail?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet}&hostel=${hostel.name}`
      );
    }
  };

  useEffect(() => {
    if (hostel) {
      console.log("hostel", hostel);
    }
  }, [hostel]);

  useEffect(() => {
    if (hostel) {
      console.log("room", room);
    }
  }, [room]);

  useEffect(() => {
    // Utilisez dispatch pour mettre à jour la date de départ
    dispatch({ type: "SET_DEPARTURE", payload: departureDate });

    // Utilisez dispatch pour mettre à jour la date de fin
    dispatch({ type: "SET_COMEBACK", payload: comebackDate });

    // Utilisez dispatch pour mettre à jour le nombre de passagers
    dispatch({ type: "SET_PERSON", payload: person });

    // Convertissez le state en chaîne JSON
    const stateJSON = JSON.stringify(state);
    fetchSearchHostel();
  }, []);

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="p-2 flex flex-col align-middle gap-5 lg:w-2/3 w-4/5 min-h-full text-base-content backdrop-blur-2xl bg-indigo-50/10 text-white">
            <h2 className="hero font-bold text-5xl">{modaldata.name}</h2>
            <div className="lg:flex justify-center hidden">
              <ThreeHostel hostelName={modaldata.name} />
            </div>
            <div className="flex flex-col m-4">
              <p>{modaldata.content}</p>
              <br />
              <div className="font-bold">
                Types de chambres :{" "}
                {console.log("this is modaldata.room", modaldata.room)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-col sm:justify-between h-full lg:grid lg:grid-cols-3 2xl:mx-48 xl:mx-24 lg:mx-10 lg:grid-rows-3 lg:gap-4">
        <div className="flex gap-3 flex-col lg:col-start-3 lg:row-start-1">
          <div className="flex gap-3 mx-4">
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <strong className="font-bold inline">Aller : </strong>
              <p className="text-center inline">{departureDate}</p>
            </div>
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <strong className="font-bold inline ">Retour : </strong>
              <p className="text-center inline">{comebackDate}</p>
            </div>
          </div>

          <div className=" flex gap-3 bg-indigo-50/10 mx-4 p-2 backdrop-blur-sm text-white rounded-lg text-center">
            <strong className="font-bold">Nombre de passager :</strong>
            <p className="">{person}</p>
          </div>

          <div className=" flex mb-4 justify-center">
            <ul className="steps">
              <li className="step step-primary">Choix planet</li>
              <li className="step step-primary">Choix hotel</li>
              <li className="step">Confirmation</li>
            </ul>
          </div>
        </div>

        <div className="overflow-y-auto no-scrollbar h-80 lg:h-[45rem] lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1">
          {error ? (
            <p>Une erreur s'est produite : {error.message}</p>
          ) : hostel ? (
            hostel.map((hostelData) => (
              <CardHostel
                key={hostelData.id}
                hostelData={hostelData}
                setRoom={setRoom}
                setModalData={setModalData}
              />
            ))
          ) : (
            <p>Chargement en cours...</p>
          )}
        </div>
        <div className="flex flex-col justify-between mx-4 gap-3 lg:row-span-3 2xl:col-start-3 2xl:row-start-2 lg:row-start-3">
          <div className="rounded-lg bg-indigo-50/10 backdrop-blur-sm">
            <div className="flex gap-3">
              <div className="w-1/2 p-2 text-white rounded-lg">
                <h2 className="font-bold">Chambre selectionnée :</h2>
                {room ? <span>{room.room_type}</span> : <span>_</span>}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn-primary rounded-none rounded-b-lg w-full"
                onClick={() => {
                  if (hostel) {
                    handleClick(
                      departureDate,
                      comebackDate,
                      person,
                      planet,
                      hostel,
                      room
                    );
                  }
                }}
              >
                VALIDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
