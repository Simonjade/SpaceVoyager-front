import React, { useState } from "react";
import { useContext, useEffect } from "react";
import request from "../../tools/request";
// LIBS
/* import { useNavigate } from "react-router-dom"; */
import Title from "../../components/Title/Title";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

// HOOKS
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

// COMPONENTS
import ProtectedZone from "../../components/Protected/Protected";
import ReservationCard from "../../components/ReservationCard/ReservationCard";

export default function Profil() {
  const isAuthenticated = useIsAuthenticated();
  const [isEditing, setIsEditing] = useState(false);
  const [editLastname, setEditLastname] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [dataUser, setDataUser] = useState({});

  const auth = useContext(AuthContext);

  const getUserProfil = async () => {
    try {
      console.log("isAuthenticated", isAuthenticated);
      const id = auth.state.data.user.id;
      console.log("user", auth.state.data.user);
      const token = auth.getAccessToken();

      const response = await request.protected(token).get(`/user/${id}`);
      console.log("this is reponse.data[0]", response.data[0]);
      setDataUser(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    const user = {
      id: dataUser.id,
      firstname: editFirstname ? editFirstname : dataUser.firstname,
      lastname: editLastname ? editLastname : dataUser.lastname,
      mail: editEmail ? editEmail : dataUser.mail,
    };

    const id = auth.state.data.user.id;
    const token = auth.getAccessToken();
    try {
      const response = await request
        .protected(token)
        .patch(`/user/${id}`, user);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const id = auth.state.data.user.id;
    const token = auth.getAccessToken();
    try {
      const response = await request.protected(token).delete(`/user/${id}`);
      await auth.logout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) getUserProfil();
  }, [isAuthenticated]);

  return (
    <ProtectedZone to={"/login"}>
      <div className="flex flex-col items-center text-black lg:flex-row-reverse align-center">
        <div className="card card-compact w-21 text-white p-5 lg:w-1/2 self-start">
          <figure className="self-center rounded-full w-4/12 lg:w-3/12 lg:mb-6 mb-4">
            <img
              src="../../../public/profil-light.webp"
              alt="planet_image"
              className=""
            />
          </figure>

          <div className="flex flex-col gap-2 text-black self-center">
            <div className="lg:flex lg:justify-center lg:gap-20">
              <label className="w-10 font-bold text-white">Prénom</label>
              {isEditing ? (
                <input
                  className="input input-bordered input-primary w-80 max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.firstname}
                  autoFocus
                  onChange={(event) => setEditFirstname(event.target.value)}
                />
              ) : (
                <div className="h-[3rem] rounded-lg border-2 border-primary backdrop-blur-sm bg-indigo-50/10 w-80 flex align-center">
                  <p className="max-w-xs self-center text-white align-middle ml-2">
                    {editFirstname ? editFirstname : dataUser?.firstname}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:flex justify-center gap-20">
              <label className="w-10 font-bold text-white">Nom</label>
              {isEditing ? (
                <input
                  className="input input-bordered input-primary w-80 max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.lastname}
                  autoFocus
                  onChange={(event) => setEditLastname(event.target.value)}
                />
              ) : (
                <div className="h-[3rem] rounded-lg border-2 border-primary backdrop-blur-sm bg-indigo-50/10 w-80 flex align-center">
                  <p className="max-w-xs self-center text-white align-middle ml-2">
                    {editLastname ? editLastname : dataUser?.lastname}
                  </p>
                </div>
              )}
            </div>
            <div className="lg:flex justify-center gap-20">
              <h4 className="w-10 font-bold text-white">Email</h4>
              {isEditing ? (
                <input
                  className="input input-bordered input-primary w-80 max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.mail}
                  autoFocus
                  onChange={(event) => setEditEmail(event.target.value)}
                />
              ) : (
                <div className="h-[3rem] rounded-lg border-2 border-primary  backdrop-blur-sm bg-indigo-50/10 w-80 flex align-center">
                  <p className="max-w-xs self-center text-white align-middle ml-2">
                    {editEmail ? editEmail : dataUser?.mail}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 lg:ml-12 justify-center shadow-sm">
            {isEditing ? (
              <button
                className="mt-4 btn-secondary inline-flex space-x-1 items-center"
                onClick={() => handleEdit()}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                Valider
              </button>
            ) : (
              <button
                className="mt-4 btn-primary inline-flex items-center"
                onClick={() => setIsEditing(true)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                Editer
              </button>
            )}

            <button
              className="mt-4 inline-flex items-center"
              onClick={() => window.my_modal_5.showModal()}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
              Supprimer
            </button>
          </div>

          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle text-black"
          >
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Prend garde space voyager !</h3>
              <p className="py-4">
                Es-tu sûr de vouloir supprimer ton profile ? Toutes tes
                merveilleuses réservations le seront également.
              </p>
              <div className="modal-action">
                <button className="btn">Fermer</button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete()}
                >
                  Supprimer
                </button>
              </div>
            </form>
          </dialog>
        </div>
        <div className="divider lg:divider-horizontal before:bg-primary after:bg-secondary"></div>

        <div className="flex flex-col items-center lg:w-1/2 no-scrollbar overflow-y-scroll lg:h-[40rem] lg:h-2/2 self-start">
          {dataUser?.reservation &&
          //! This is bricolage, better not to send null
          dataUser?.reservation[0].planet_name !== null &&
          dataUser?.reservation.length > 0 ? (
            dataUser?.reservation.map((element, index) => (
              <ReservationCard key={index} reservation={element} />
            ))
          ) : (
            <div className="card w-96 backdrop-blur-sm bg-indigo-50/10 shadow-xl">
              <div className="card-body">
                <p className="uppercase text-center text-white font-bold">
                  Pas de réservation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedZone>
  );
}
