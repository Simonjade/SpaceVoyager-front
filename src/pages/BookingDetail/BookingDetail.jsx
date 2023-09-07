import { useContext, useEffect, useState } from "react";

//TOOLS
import request from "../../tools/request";

// CONTEXTS
import { useBooking } from "../../contexts/BoonkingContext";
import { AuthContext } from "../../contexts/AuthContext";

// HOOKS

import useIsAuthenticated from "../../hooks/useIsAuthenticated";

//COMPONENT
import Modal from "./Modal/Modal";
import planetImg from "../../assets/planet/PlanetImg";
import AlertConfirmation from "../../components/AlertConfirmation/AlertConfirmation";
import { useNavigate } from "react-router";

export default function BookingDetail() {
  const { state } = useBooking();

  const auth = useContext(AuthContext);

  const [isAuthenticated, SetIsAuthenticated] = useState(null);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    console.log("auth", auth.state); // state de auth
    console.log("isAuthenticated", auth.state.authenticated); //si connécté ou pas
    if (auth.state.data) {
      console.log("profil user", auth.state.data.user); //info user
    }
    //console.log("postBookingData", postBookingData);
    SetIsAuthenticated(auth.state.authenticated);
  }, [auth.state]);

  useEffect(() => {
    if (auth.state.data) {
      console.log("profil user", auth.state.data.user); //info user
    }
  }, [auth.state.data]);

  const navigate = useNavigate();
  const postBooking = async () => {
    try {
      const postBookingData = {
        person: state.person,
        total_price: (state.planet.price + state.room.price) * state.person,
        hostel_id: state.hostel.id,
        room_id: state.room.id,
        dp_date: state.departure,
        cb_date: state.comeBack,
        planet_id: state.planet.id,
        user_id: auth.state.data.user.id,
      };
      console.log("this is the postbooking data", postBookingData);
      const token = auth.getAccessToken();
      console.log("this is token", token);
      const response = await request
        .protected(token)
        .post(`/booking`, postBookingData);
      // Si la requête réussit, vous pouvez traiter la réponse ici
      console.log("Réponse de l'API :", response.data);
      console.log("voyage réservé");
      setAlert(true);

      setTimeout(() => {
        localStorage.removeItem("bookingState");
        navigate("/");
      }, 2000);
    } catch (error) {
      // En cas d'erreur, affichez l'erreur
      console.error("Erreur lors de la requête POST :", error);
    }
  };

  const handleclick = () => {
    if (isAuthenticated) {
      postBooking();
    } else {
      window.my_modal_5.showModal();
    }
  };
  useEffect(() => {
    console.log(isAuthenticated);
    console.log(auth);
  }, [isAuthenticated]);

  return (
    <>
      {alert && (
        <div className="modal-overlay">
          <AlertConfirmation />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <ul className="steps">
            <li className="step step-primary">Choix planet</li>
            <li className="step step-primary">Choix hotel</li>
            <li className="step step-primary">Confirmation</li>
          </ul>
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col gap-3 items-center w-10/12 lg:w-6/12">
            <div className="bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg text-white rounded-lg">
              <div className="p-4 bg-zinc-900 rounded-lg">
                <h2 className="text-xl text-center font-semibold mb-4  pb-3 font-bold border-b-2 border-b-primary">
                  Récapitulatif de votre voyage
                </h2>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <img
                    className="object-contain h-1/3 lg:w-2/4 w-full rounded-lg"
                    // src={`../../../../public/planet/${state?.planet?.img}`}
                    src={planetImg[state?.planet?.name.toLowerCase()]}
                    alt={state?.planet?.name}
                  ></img>
                  <div className="flex flex-col justify-evenly ml-4 text-white">
                    <p className="lg:text-lg font-semibold">
                      Destination : {state?.planet?.name}
                    </p>
                    <p className="lg:text-lg font-semibold">
                      Hotel : {state?.hostel?.name}
                    </p>
                    <p className="lg:text-lg font-semibold">
                      Chambre : {state?.room?.room_type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg w-full">
              <div className="flex flex-col p-4 bg-zinc-900 rounded-lg">
                <h2 className="text-xl text-center font-semibold mb-4  pb-3 font-bold border-b-2 border-b-primary">
                  Récapitulatif du prix
                </h2>

                <div className="flex justify-evenly">
                  <div className="flex flex-col justify-center gap-6">
                    <p className="text-lg">
                      Date de départ :{" "}
                      <span className="font-semibold">
                        &ensp;{state?.departure}
                      </span>
                    </p>
                    <p className="text-lg">
                      Date de retour :{" "}
                      <span className="font-semibold">
                        &ensp;{state?.comeBack}
                      </span>
                    </p>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        Prix par personne
                      </h3>
                      <div className="flex">
                        <p className="text-secondary text-lg font-semibold">
                          {state?.planet?.price + state?.room?.price} €
                        </p>
                        <p className="text-white-600 text-lg font-semibold">
                          &ensp;x {state?.person}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Prix total</h3>
                      <p className="text-secondary text-lg font-semibold">
                        {(state?.planet?.price + state?.room?.price) *
                          state?.person}{" "}
                        €
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleclick()}
                >
                  Confirmer la réservation
                </button>

                <Modal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
