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
        <form method="dialog" className="modal-box backdrop-blur-sm bg-white ">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle bg-white absolute right-2 top-2 text-black">
            ✕
          </button>
          <div className="tabs">
            <a
              className={`tab tab-lg tab-bordered ${
                activeTab === "login" && "tab-active"
              }`}
              onClick={() => handleTabClick("login")}
            >
              Se connecter
            </a>
            <a
              className={`tab tab-lg tab-bordered ${
                activeTab === "register" && "tab-active"
              }`}
              onClick={() => handleTabClick("register")}
            >
              S'enregistrement
            </a>
          </div>
          <h3 className="font-bold text-lg text-primary">Hello!</h3>
          <p className="text-primary">
            Veillez vous{" "}
            <strong>
              {activeTab === "login"
                ? "connecter"
                : `s'inscrire puis vous connecter`}{" "}
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
