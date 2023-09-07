import planetImg from "../../../assets/planet/PlanetImg";

export default function CardPlanet({
  planetData,
  setCardSelected,
  setModalData,
}) {
  console.log(planetImg[planetData.name.toLowerCase()]);
  return (
    <div className="m-8 md:flex bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg">
      <div className="relative md:w-1/2 rounded-l-lg bg-black">
        <img
          className="object-contain h-full"
          src={planetImg[planetData.name.toLowerCase()]}
          alt={planetData.name}
        />
        <label
          htmlFor="my-drawer-4"
          className="btn-primary absolute mb-2 mr-2 bottom-0 right-0 drawer-button btn"
          onClick={() => {
            setModalData(planetData);
          }}
        >
          Détails
        </label>
      </div>
      <div className="flex flex-col p-5 lg:flex-rows md:justify-between gap-2 md:w-1/2 text-white shadow-2xl bg-zinc-900 hover:bg-black/80 hover:backdrop-blur-xl group  hover:transition-colors hover:duration-300 duration-500 ">
        <h2 className="md:text-xl text-center p-3 font-bold border-b-2 border-b-primary group-hover:border-b-white hover:transition-colors hover:duration-300 duration-500  ">
          {planetData.name}
        </h2>
        <p className="hidden lg:block text-sm">
          {planetData.content.substring(0, 150)}...
        </p>
        <div className="flex lg:flex-rows lg:justify-between md:gap-3 gap-2">
          <p className="md:text-lg">
            <span className="font-bold">{planetData.price} €</span> /pers
          </p>
          <button
            className="lg:w-1/2 btn bg-white mb-2 md:mb-0"
            onClick={() => setCardSelected(planetData)}
          >
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );
}
