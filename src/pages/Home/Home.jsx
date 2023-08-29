import Stars from "../../components/Stars/Stars";
import SearchForm from "./SearchForm/SearchForm";

export default function Home() {
  return (
    <>
      <div className="relative">
        <h1>SPACE VOYAGER</h1>
        <h2>UN PEU PLUS PRES DES ETOILES</h2>
      </div>

      <h3 className="text-2xl font-bold ml-3 p-8">
        VEILLEZ CHOISIR VOS DATES DE DEPART ET DE RETOUR
      </h3>
      <SearchForm />
    </>
  );
}
