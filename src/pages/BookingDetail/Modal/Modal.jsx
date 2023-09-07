import React, { useEffect, useState } from "react";
import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from "../../../components/RegisterForm/RegisterForm";

export default function Modal(setOpenModal) {
  const [logged, setLogged] = useState(null);
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    console.log("logged", logged);
  }, [logged]);

  useEffect(() => {
    console.log("activeTab", activeTab);
  }, [logged]);

  if (logged) {
    window.my_modal_5.close();
  }
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box shadow-lg shadow-black bg-indigo-50/10 backdrop-blur-xl text-white"
        >
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle bg-neutral hover:bg-secondary hover:text-neutral absolute right-2 top-2 text-black">
            ✕
          </button>
          <div className="tabs">
            <a
              className={`tab tab-lg tab-bordered hover:text-secondary ${
                activeTab === "login" && "tab-active"
              }`}
              onClick={() => handleTabClick("login")}
            >
              Se connecter
            </a>
            <a
              className={`tab tab-lg tab-bordered hover:text-secondary ${
                activeTab === "register" && "tab-active"
              }`}
              onClick={() => handleTabClick("register")}
            >
              S'enregistrer
            </a>
          </div>
          <h3 className="font-bold text-lg text-neutral my-4">Hello Space voyager !</h3>
          <p className="text-neutral">
            Veuillez vous{" "}
            <strong>
              {activeTab === "login"
                ? "connecter"
                : `inscrire puis vous connecter`}{" "}
            </strong>
            avant de valider votre réservation
          </p>
          {activeTab === "login" ? (
            <LoginFormModal setLogged={setLogged} />
          ) : (
            <RegisterFormModal />
          )}
          {/* <div className="modal-action text-black"> */}
          {/* if there is a button in form, it will close the modal */}
          {/* <button className="btn bg-white text-black">Close</button> */}
          {/* </div> */}
        </form>
      </dialog>
    </>
  );
}
