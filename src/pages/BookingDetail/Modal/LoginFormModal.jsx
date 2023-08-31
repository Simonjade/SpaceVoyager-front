import React, { useState } from "react";
import { useContext, useEffect } from "react";

// LIBS
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { AuthContext } from "../../../contexts/AuthContext";

export default function LoginFormModal() {
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    setEmail();
    event.preventDefault();
    try {
      const isLogged = await auth.login({
        mail: email,
        password: password,
      });
      console.log(isLogged);
      if (isLogged.status === 200) {
        return setModal(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  };

  return (
    <div>
      <h2 className="grid justify-center my-4 font-bold">LOG IN</h2>
      <div className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered my-4 input-primary w-full max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          className="btn btn-primary btn-wide my-4 mb-15 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitLogin(event)}
        >
          SEND
        </button>
      </div>
      {hasError && (
        <div className="text-red">Email ou mot de passe incorrect</div>
      )}
    </div>
  );
}
