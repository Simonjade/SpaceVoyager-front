import Stars from "../../components/Stars/Stars";
import SearchForm from "./SearchForm/SearchForm";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex flex-wrap">
      <div className="relative -top-5 -left-50 p-4 mb-10">
        <h1>SPACE VOYAGER</h1>
        <h2>un peu plus proche des étoiles</h2>
      </div>

      <h3 className="text-2xl font-bold ml-3 p-8">
        VEILLEZ CHOISIR VOS DATES DE DEPART ET DE RETOUR
      </h3>
      <SearchForm />
      </div>
    </>
  );
}
