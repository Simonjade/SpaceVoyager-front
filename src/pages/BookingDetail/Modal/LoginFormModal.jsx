import { useState, useContext, useEffect } from "react";

// LIBS
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { AuthContext } from "../../../contexts/AuthContext";

export default function LoginFormModal({ setLogged }) {
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const isLogged = await auth.login({
        mail: email,
        password: password,
      });
      console.log(isLogged);
      if (isLogged.status === 200) {
        return setLogged(true);
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
      <h2 className="grid justify-center my-4 font-bold">SE CONNECTER</h2>
      <div className="flex items-center flex-col">
        <input
          type="text"
          placeholder="E-mail"
          className="input input-bordered my-4 input-primary w-full max-w-xs bg-white text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input input-bordered my-4 input-primary w-full max-w-xs bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          className="btn btn-primary btn-wide my-4 mb-15 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitLogin(event)}
        >
          SE CONNECTER
        </button>
      </div>
      {hasError && (
        <div className="text-red">Email ou mot de passe incorrect</div>
      )}
    </div>
  );
}
