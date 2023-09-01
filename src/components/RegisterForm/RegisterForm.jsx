import { set } from "date-fns";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

// TOOLS
import request from "../../tools/request";

export default function RegisterForm() {
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstnameRegister, setFirstnameRegister] = useState("");
  const [lastnameRegister, setLastnameRegister] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const data = {
      firstname: firstnameRegister,
      lastname: lastnameRegister,
      password: passwordRegister,
      mail: emailRegister,
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
      <h2 className="grid justify-center my-4 font-bold">REGISTER</h2>
      <form className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Firstname"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          onChange={(e) => setFirstnameRegister(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          onChange={(e) => setLastnameRegister(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          onChange={(e) => setEmailRegister(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          onChange={(e) => setPasswordRegister(e.target.value)}
          autoComplete="current-password"
        />
        <button
          className="btn btn-secondary btn-wide my-4 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitRegister(event)}
        >
          SEND
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
