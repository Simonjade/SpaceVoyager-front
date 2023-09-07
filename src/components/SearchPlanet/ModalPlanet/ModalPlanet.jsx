import ThreePlanet from "../../ThreeScene/ThreePlanet";

export default function ModalPlanet({ modaldata }) {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className=" lg:w-2/3 xl:w-1/3 w-4/5 min-h-full text-base-content backdrop-blur-2xl bg-indigo-50/10 text-white border-l-2 border-l-primary">
          <div className="m-5 flex flex-col gap-5">
            <div className="hero font-bold text-5xl border-b-2 border-b-primary pb-3">
              {modaldata.name}
            </div>

            <div className="sm:flex justify-center hidden">
              <ThreePlanet planetName={modaldata.name} />
            </div>

            <div className="flex flex-col">
              <div className="">{modaldata.content}</div>
              <br />
              <div className="">
                Distance :{" "}
                <span className="font-bold">{modaldata.distance} km</span>
              </div>
              <div className="">
                Distance en années lumières :{" "}
                <span className="font-bold">
                  {modaldata.distance_light_year}
                </span>
              </div>
              <div className="">
                Circonférence :{" "}
                <span className="font-bold">{modaldata.radius} km</span>
              </div>
              <div className="">
                Température minimale :{" "}
                <span className="font-bold">{modaldata.temp_min}</span>°
              </div>
              <div className="">
                Température maximale :{" "}
                <span className="font-bold">{modaldata.temp_max}</span>°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
