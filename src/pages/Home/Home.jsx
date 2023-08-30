import Stars from "../../components/Stars/Stars";
import SearchForm from "./SearchForm/SearchForm";

export default function Home() {
  return (
    <>
      <div className="h-full">
        <div className="flex flex-col justify-end h-4/6 gap-8">
          <h3 className="text-2xl font-bold text-center self-center inline-block max-w-sm">
            VEUILLEZ CHOISIR VOS DATES DE DEPART ET DE RETOUR
          </h3>
          <SearchForm />
        </div>
      </div>
    </>
  );
}
