import { useState } from "react";
import validator from "validator";

// TOOLS
import request from "../../tools/request";

export default function RegisterForm() {
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstnameRegister, setFirstnameRegister] = useState("");
  const [lastnameRegister, setLastnameRegister] = useState("");
  const [hasError, setHasError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
        setHasError("Votre compte a été créé ! Vous pouvez vous connecter");
      } else if (response.status === 400) {
        setHasError("Les informations renseignées ne sont pas correctes");
      } else {
        setHasError("Une erreur s'est produite");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setHasError("Une erreur s'est produite");
    }
  };
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
      setPasswordRegister(value);
    } else {
      setErrorMessage("8 char, 1 Maj, 1 min, 1 chiffre, 1 symbole");
    }
  };

  return (
    <div>
      <h2 className="uppercase grid justify-center my-4 font-bold">
        S'enregistrer
      </h2>
      <form className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Prénom"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-white"
          onChange={(e) => setFirstnameRegister(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de famille"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-white"
          onChange={(e) => setLastnameRegister(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-white"
          onChange={(e) => setEmailRegister(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input input-bordered my-4 input-primary w-full max-w-xs text-white"
          onChange={(e) => validate(e.target.value)}
          autoComplete="current-password"
        />
        {errorMessage === "" ? null : (
          <span
            style={{
              color: "red",
            }}
          >
            {errorMessage}
          </span>
        )}
        <button
          className="btn btn-secondary btn-wide my-4 sm:btn-sm md:btn-md lg:btn-lg"
          onClick={(event) => handleSubmitRegister(event)}
        >
          Creer un compte
        </button>
      </form>
      {hasError && <div>{hasError}</div>}
    </div>
  );
}
