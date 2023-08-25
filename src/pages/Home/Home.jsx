import React, { useContext } from "react";
import SearchForm from "./SearchForm/SearchForm";

import { StoreContext } from "../../contexts/StoreContext";

export default function Home() {
  const store = useContext(StoreContext);

  const handleAction = () => {
    store.dispatch({ type: "action", key: "monsupertest" });
  };

  return (
    <>
      <button onClick={handleAction}>test ici</button>
      <div className="relative top-0 right-0 p-4">
        <h1>SPACE VOYAGER</h1>
        <h2>un peu plus proche des étoiles</h2>
      </div>

      <h3 className="text-2xl font-bold mb-4">
        VEILLEZ CHOISIR VOS DATES DE DEPART ET DE RETOUR
      </h3>
      <SearchForm />
    </>
  );
}
