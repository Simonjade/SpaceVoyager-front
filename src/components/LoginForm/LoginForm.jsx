import React, { useState } from "react";
import { useContext, useEffect } from "react";

// LIBS
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
        return navigate("/Profil");
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
      <form className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary btn-wide my-4 mb-15 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitLogin(event)}
        >
          SEND
        </button>
      </form>
      {hasError && <div>PAS TIP TOP</div>}
    </div>
  );
}
