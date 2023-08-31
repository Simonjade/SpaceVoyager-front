import React from "react";
import LoginFormModal from "./LoginFormModal";

export default function Modal() {
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button> */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Veillez vous connecter/s'inscrire avant de valider votre réservation
          </p>
          <LoginFormModal />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
