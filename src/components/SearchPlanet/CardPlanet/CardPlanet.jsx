import planetImg from "../../../assets/planet/PlanetImg";

export default function CardPlanet({
  planetData,
  setCardSelected,
  setModalData,
}) {
  // console.log(planetImg[planetData.name.toLowerCase()]);
  return (
    <div className="m-8 md:flex bg-gradient-to-r p-[3px] from-secondary via-purple-500 to-primary rounded-lg">
      <div className="relative md:w-1/2">
        <img
          className="object-cover w-full h-full rounded-t-lg md:rounded-lg md:rounded-br-none md:rounded-tr-none"
          src={planetImg[planetData.name.toLowerCase()]}
          alt={planetData.name}
        />
        <label
          htmlFor="my-drawer-4"
          className="btn-primary absolute mb-5 mr-5 bottom-0 right-0 drawer-button btn"
          onClick={() => {
            setModalData(planetData);
          }}
        >
          Détails
        </label>
      </div>
      <div className="flex flex-col p-5 lg:flex-rows md:justify-between gap-3 md:w-1/2 text-white shadow-2xl bg-zinc-900 hover:bg-black/80 hover:backdrop-blur-xl group hover:transition-colors hover:duration-300 duration-500 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
        <h2 className="md:text-xl text-center pb-3 font-bold border-b-2 border-b-primary group-hover:border-b-white hover:transition-colors hover:duration-300 duration-500">
          {planetData.name}
        </h2>
        <p className="hidden lg:block text-sm">
          {planetData.content.substring(0, 150)}...
        </p>
        <div className="flex flex-rows items-center justify-between md:gap-3 gap-2">
          <p className="md:text-lg">
            <span className="font-bold">{planetData.price} €</span> /pers
          </p>
          <button
            className="lg:w-1/2 btn-neutral "
            onClick={() => setCardSelected(planetData)}
          >
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );
}
