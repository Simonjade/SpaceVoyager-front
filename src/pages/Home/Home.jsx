import Stars from "../../components/Stars/Stars";
import TitleMain from "../../components/Title/TitleMain";
import SearchForm from "./SearchForm/SearchForm";

export default function Home() {
  return (
    <>
      <div className="h-full">
        <div className="flex flex-col justify-center h-4/6 landscape:h-2/3 gap-3 landscape:gap-9 sm:gap-1">
          <TitleMain />
          <SearchForm />
        </div>
      </div>
    </>
  );
}
