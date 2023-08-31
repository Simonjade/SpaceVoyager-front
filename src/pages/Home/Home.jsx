import Stars from "../../components/Stars/Stars";
import SearchForm from "./SearchForm/SearchForm";
import TitleMain from "../../components/Title/TitleMain";

export default function Home() {
  return (
    <>
      <div className="h-full">
        <div className="flex flex-col justify-end h-4/6 gap-8">
          <TitleMain />
          <h3 className="text-1xl font-bold text-center self-center inline-block max-w-sm mb-1">
            {/* VEUILLEZ CHOISIR VOS DATES DE DEPART ET DE RETOUR */}
            Veuillez choisir vos dates de depart et de retour
          </h3>
          <SearchForm />
        </div>
      </div>
    </>
  );
}
