import { set } from "date-fns";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

// TOOLS
import request from "../../tools/request";

export default function RegisterForm() {
  const [emailRegister, setEmailRegister] = useState(null);
  const [passwordRegister, setPasswordRegister] = useState(null);
  const [firstnameRegister, setFirstnameRegister] = useState(null);
  const [lastnameRegister, setLastnameRegister] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const data = {
      firstname: firstnameRegister,
      lastname: lastnameRegister,
      password: passwordRegister,
      mail: emailRegister,
      role: "member",
    };
    try {
      const response = await request.generic().post("/user", data);
      if (response.status === 200) {
        setMessage("Votre compte a été créé ! Vous pouvez vous logger");
      } else {
        setMessage("Une erreur s'est produite");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setMessage("Une erreur s'est produite");
    }
  };
  return (
    <div>
      <div className="grid flex-grow my-4 font-bold">REGISTER</div>
      <form action="">
        <input
          type="text"
          placeholder="Firstname"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          onChange={(e) => setFirstnameRegister(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          onChange={(e) => setLastnameRegister(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          onChange={(e) => setEmailRegister(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          onChange={(e) => setPasswordRegister(e.target.value)}
        />
        <button
          className="btn btn-primary btn-wide my-4 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitRegister(event)}
        >
          SEND
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
