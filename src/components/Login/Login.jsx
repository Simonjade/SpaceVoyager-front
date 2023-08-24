import React, { useState } from "react";
import { useContext, useEffect } from "react";

// LIBS
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const isLogged = await auth.login({
        mail: "Manunu@gmail.com",
        password: "12322222",
      });
      console.log(isLogged);
      if (isLogged.status === 200) {
        return navigate("/Profil");
      } else {
        setHasError(true);
      }
    } catch (err) {}
  };

  /* const handleSubmitRegister = async () => {
    try {
      auth.login({ mail: "test", password: "test" });
      return navigate("/profil");
    } catch (err) {}
  }; */

  return (
    <div>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow font-bold">LOG IN</div>
        <form>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button
            className="btn btn-primary btn-wide sm:btn-sm md:btn-md lg:btn-lg"
            onClick={(event) => handleSubmitLogin(event)}
          >
            &#128640; LOG IN
          </button>
        </form>
        {hasError && <div>PAS TIP TOP</div>}

        <div className="divider lg:divider-horizontal place-content-center font-bold">
          OR
        </div>
        <div className="grid flex-grow font-bold">REGISTER</div>
        <form action="">
          <input
            type="text"
            placeholder="Firstname"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Lastname"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button
            className="btn btn-primary btn-wide sm:btn-sm md:btn-md lg:btn-lg"
            /* onClick={handleSubmitRegister} */
          >
            &#128221; REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
