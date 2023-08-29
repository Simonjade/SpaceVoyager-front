import Stars from "../../components/Stars/Stars";
import SearchForm from "./SearchForm/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="absolute top-10 left-5 mb-10 text-left ml-2 mt-10">
        <h1 className=" text-4xl font-bold sm:text-3xl">SPACE VOYAGER</h1>
        <h2 className="sm: text-l text-center">un peu plus proche des étoiles</h2>
      </div>

      <h3 className="w-1/2 sm:text-2xl font-bold text-center">
        VEUILLEZ CHOISIR VOS DATES DE DÉPART ET DE RETOUR
      </h3>
      <SearchForm />
    </div>
  );
}
