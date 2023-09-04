import { useBooking } from "../../contexts/BoonkingContext";
import request from "../../tools/request";

import axios from "axios";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

// HOOKS
import { useContext, useEffect, useState } from "react";
import Modal from "./Modal/Modal";

export default function BookingDetail() {
  const { state } = useBooking();

  const auth = useContext(AuthContext);

  const [isAuthenticated, SetIsAuthenticated] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  useEffect(() => {
    console.log("auth", auth.state); // state de auth
    console.log("isAuthenticated", auth.state.authenticated); //si connécté ou pas
    if (auth.state.data) {
      console.log("profil user", auth.state.data.user); //info user
    }
    //console.log("postBookingData", postBookingData);
    SetIsAuthenticated(auth.state.authenticated);
  }, []);

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
    } catch (error) {
      // En cas d'erreur, affichez l'erreur
      console.error("Erreur lors de la requête POST :", error);
    }
  };

  const handleclick = () => {
    if (isAuthenticated) {
      console.log("voyage réservé");
      postBooking();
    } else {
      window.my_modal_5.showModal();
    }
  };

  /* useEffect(() => {
    if (openModal) {
      window.my_modal_5.showModal(false);
    }
    console.log(openModal);
  }, [openModal]); */

  return (
    <>
      <div className="flex justify-center ">
        <div className="flex flex-col items-center w-10/12 lg:w-6/12">
          <div className="bg-indigo-50/10 p-4 backdrop-blur-sm text-white rounded-lg">
            <h2 className="text-3xl text-center font-semibold mb-4">
              Récapitulatif de votre voyage
            </h2>
            <h3 className="text-xl font-semibold">Informations du voyage</h3>
            <div className="flex">
              <img
                className="object-contain h-1/3 w-1/4"
                src={`../../../../${state.planet.img}`}
                alt={state.planet.name}
              ></img>
              <div className="mb-4 text-white">
                <p className="">Date de départ : {state.departure}</p>
                <p className="">Date de retour : {state.comeBack}</p>
                <p className="">Destination : {state.planet.name}</p>
              </div>
            </div>
            <p className="">Hotel : {state.hostel.name}</p>
            <p className="">Type de chambre : {state.room.room_type}</p>

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
          <div className="bg-indigo-50/10 p-4 backdrop-blur-sm text-white rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              Récapitulatif du prix
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Prix par personne</h3>
              <div className="flex">
                <p className="text-green-600 text-xl font-semibold">
                  {state.planet.price + state.room.price} €
                </p>
                <p className="text-white-600 text-xl font-semibold">
                  &ensp;x {state.person}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Prix total</h3>
              <p className="text-green-600 text-xl font-semibold">
                {(state.planet.price + state.room.price) * state.person} €
              </p>
            </div>

            <button className="btn btn-primary" onClick={() => handleclick()}>
              Confirmer la réservation
            </button>
            <Modal />
          </div>
        </div>
      </div>
    </>
  );
}
