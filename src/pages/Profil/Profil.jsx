import React, { useState } from "react";
import { useContext, useEffect } from "react";
import request from "../../tools/request";
// LIBS
/* import { useNavigate } from "react-router-dom"; */

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
      //setData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const id = auth.state.data.user.id;
    const token = auth.getAccessToken();
    try {
      const response = await request.protected(token).delete(`/user/${id}`);
      /* console.log(response); */
      await auth.logout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getUserProfil();
  }, [isAuthenticated]);

  return (
    <ProtectedZone to={"/login"}>
      <div className="backdrop-blur-sm bg-white/30">
        <h3>Vos informations</h3>
        <h4>Firstname</h4>
        {isEditing ? (
          <textarea
            name=""
            defaultValue={dataUser?.firstname}
            autoFocus
            onChange={(event) => setEditFirstname(event.target.value)}
          ></textarea>
        ) : (
          <p>{editFirstname ? editFirstname : dataUser?.firstname}</p>
        )}
        <h4>Lastname</h4>
        {isEditing ? (
          <textarea
            name=""
            defaultValue={dataUser?.lastname}
            autoFocus
            onChange={(event) => setEditLastname(event.target.value)}
          ></textarea>
        ) : (
          <p>{editLastname ? editLastname : dataUser?.lastname}</p>
        )}
        <h4>Email</h4>
        {isEditing ? (
          <textarea
            name=""
            defaultValue={dataUser?.mail}
            autoFocus
            onChange={(event) => setEditEmail(event.target.value)}
          ></textarea>
        ) : (
          <p>{editEmail ? editEmail : dataUser?.mail}</p>
        )}

        <div className="btn-container">
          {isEditing ? (
            <button onClick={() => handleEdit()}>Valider</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Editer</button>
          )}

          <button className="btn" onClick={() => window.my_modal_5.showModal()}>
            Supprimer
          </button>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Etes vous sûr de vouloir supprimer votre profil ? Toutes vos
              réservations le seront également
            </p>
            <div className="modal-action">
              <button className="btn">Close</button>
              <button className="btn" onClick={() => handleDelete()}>
                Supprimer
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="backdrop-blur-sm bg-white/30 mt-6">
        {dataUser.reservation &&
          dataUser.reservation.map((element, index) => (
            <ReservationCard key={index} reservation={element} />
          ))}
      </div>
    </ProtectedZone>
  );
}
