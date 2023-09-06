import React, { useEffect, useState } from "react";
import LoginFormModal from "./LoginFormModal";

export default function Modal(setOpenModal) {
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    console.log("logged", logged);
  }, [logged]);

  if (logged) {
    window.my_modal_5.close();
  }
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button> */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box backdrop-blur-sm bg-white ">
          <h3 className="font-bold text-lg text-primary">Hello!</h3>
          <p className="py-4 text-primary">
            Veillez vous connecter/s'inscrire avant de valider votre réservation
          </p>
          <LoginFormModal setLogged={setLogged} />
          <div className="modal-action text-black">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn bg-white text-black">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
