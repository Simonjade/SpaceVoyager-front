import { useEffect, useState } from "react";
import CardHostel from "./CardHostel/CardHostel";
import { useNavigate } from "react-router-dom";

//CONTEXT
import { useBooking } from "../../contexts/BoonkingContext";

// TOOLS
import request from "../../tools/request";

// COMPONENTS
import ModalHostel from "./ModalHostel/ModalHostel";

export default function SearchHostel() {
  // STATES
  const [hostel, setHostel] = useState([]);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const [modaldata, setModalData] = useState([]);
  const navigate = useNavigate();

  // CONTEXTS
  const { state, dispatch } = useBooking();

  // FUNCTIONS
  const fetchSearchHostel = async () => {
    console.log("STATE => ", state);
    try {
      const response = await request
        .generic()
        .get(
          `/booking/search?departureDate=${state.departure}&comebackDate=${state.comeBack}&person=${state.person}&planet=${state.planet?.name}`
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

  // HANDLES
  const handleClick = () => {
    console.log("DEBUG", hostel, room);
    if (room && hostel) {
      dispatch({ type: "SET_HOSTEL", payload: hostel[0] });
      dispatch({ type: "SET_ROOM", payload: room });
      dispatch({ type: "SAVE" });

      navigate("/detail");
    }
  };

  // USE EFFECTS
  useEffect(() => {
    fetchSearchHostel();
    //eslint-disable-next-line
  }, []);

  // RENDER
  return (
    <>
    <div className="max-md:flex max-md:flex-col max-md:justify-start max-md:h-full">
      {/* MODAL */}
      <ModalHostel modaldata={modaldata} />
      {/* MAIN PAGE */}
      <div className="sm:flex sm:flex-col sm:justify-between h-full lg:grid lg:grid-cols-3 2xl:mx-48 xl:mx-24 lg:mx-10 lg:grid-rows-3 lg:gap-4">
        <div className="flex gap-3 flex-col lg:col-start-3 lg:row-start-1">
          <div className="flex gap-3 mx-4">
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold inline">Aller : </h2>
              <p className="text-center inline">{state?.departure}</p>
            </div>
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold inline ">Retour : </h2>
              <p className="text-center inline">{state?.comeBack}</p>
            </div>
          </div>

          <div className=" flex gap-3 bg-indigo-50/10 mx-4 p-2 backdrop-blur-sm text-white rounded-lg text-center">
            <h2 className="font-bold">Nombre de passager :</h2>
            <p className="">{state?.person}</p>
          </div>

          <div className=" flex mb-4 justify-center">
            <ul className="steps">
              <li className="step step-primary">Choix planet</li>
              <li className="step step-primary">Choix hotel</li>
              <li className="step">Confirmation</li>
            </ul>
          </div>
        </div>
        <div className="h-96 lg:h-[45rem] md:col-span-2 md:row-span-4 md:col-start-1 md:row-start-1">

          {/* Planets list */}

          <div className="overflow-y-auto no-scrollbar h-96 lg:h-[45rem] lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1">
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
        </div>
        <div className="flex flex-col justify-between mx-4 gap-3 md:row-span-3 lg:row-start-2">
          <div className="rounded-lg bg-indigo-50/10 backdrop-blur-sm">
            <div className="flex gap-3">
              <div className=" p-2 text-white rounded-lg">
                <h2 className="font-bold">Chambre selectionnée :</h2>
                {room ? <span>{room?.room_type}</span> : <span>_</span>}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn-primary rounded-none rounded-b-lg w-full"
                onClick={handleClick}
              >
                VALIDER
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
