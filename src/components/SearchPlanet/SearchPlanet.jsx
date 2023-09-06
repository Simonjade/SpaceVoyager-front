import { useEffect, useState } from "react";

//CONTEXT
import { useBooking } from "../../contexts/BoonkingContext";

// TOOLS
import request from "../../tools/request";

// COMPONENTS
import CardPlanet from "./CardPlanet/CardPlanet";
import ThreePlanet from "../ThreeScene/ThreePlanet";

export default function SearchPlanet({ setPlanet }) {
  // STATES
  const [data, setData] = useState([]);
  const [modaldata, setModalData] = useState([]);
  const [error, setError] = useState(null);
  const [cardSelected, setCardSelected] = useState([]);
  const [sortType, setSortType] = useState("");

  // CONTEXTS
  const { state, dispatch } = useBooking();

  // FUNCTIONS
  const sortData = (criteria) => {
    const newData = [...data];
    newData.sort((a, b) => {
      if (criteria === "nom") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "prix") {
        return a.price - b.price;
      } else {
        return a.id - b.id;
      }
    });
    setData(newData);
  };

  const fetchSearchPlanet = async () => {
    if (state.departure) {
      try {
        const response = await request
          .generic()
          .get(
            `/booking/search?departureDate=${state.departure}&comebackDate=${state.comeBack}&person=${state.person}`
          );
        setData(response.data);

        setCardSelected(state?.planet ?? []);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
        setError(error);
      }
    }
  };

  // HANDLES
  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortData(e.target.value);
  };

  const handleClick = (planet) => {
    dispatch({ type: "SET_PLANET", payload: planet });
    dispatch({ type: "SAVE" });

    setPlanet(planet.name);
  };

  // USE EFFECTS
  useEffect(() => {
    fetchSearchPlanet();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.departure) fetchSearchPlanet();
    //eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    if (cardSelected?.name) {
      dispatch({ type: "SET_PLANET", payload: cardSelected });
      dispatch({ type: "SAVE" });
    }
    //eslint-disable-next-line
  }, [cardSelected]);

  // RENDER
  return (
    <>
      <div>
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"></div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <div className="p-2 flex flex-col align-middle gap-5 lg:w-2/3 w-4/5 min-h-full text-base-content backdrop-blur-2xl bg-indigo-50/10 text-white">
              <div className="hero font-bold text-5xl">{modaldata.name}</div>

              <div className="md:flex justify-center hidden">
                <ThreePlanet planetName={modaldata.name} />
              </div>

              <div className="flex flex-col m-4">
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
        <div className="sm:flex sm:flex-col sm:justify-between h-full lg:grid lg:grid-cols-3 2xl:mx-48 xl:mx-24 lg:mx-10 lg:grid-rows-3 lg:gap-4">
          <div className="flex gap-3 flex-col lg:col-start-3 lg:row-start-1">
            <div className="flex gap-3 mx-4">
              <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
                <h2 className="font-bold inline">Aller : </h2>
                <p className="text-center inline">{state?.departure}</p>
              </div>
              <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
                <h2 className="font-bold inline ">Retour : </h2>
                <p className="text-center inline">{state?.comeBack}</p>
              </div>
            </div>

            <div className=" flex gap-3 bg-indigo-50/10 mx-4 p-2 backdrop-blur-sm text-white rounded-lg text-center">
              <h2 className="font-bold">Nombre de passager : </h2>
              <p className="">{state?.person}</p>
            </div>

            <div className=" flex mb-4 justify-center">
              <ul className="steps">
                <li className="step step-primary">Choix planet</li>
                <li className="step">Choix hotel</li>
                <li className="step">Confirmation</li>
              </ul>
            </div>
          </div>
          <div className="h-96 lg:h-[45rem] lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1">
            <div className="flex ml-6 mb-1 ">
              <p className=""> Trier par :</p>
              <select
                onChange={handleSortChange}
                value={sortType}
                className="bg-black text-white border-2 border-primary"
              >
                <option value="-"> -</option>
                <option value="nom"> nom</option>
                <option value="prix"> prix</option>
              </select>
            </div>
            <div className="overflow-y-auto no-scrollbar h-96 lg:h-[45rem] lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1">
              {error ? (
                <p>Une erreur s'est produite : {error.message}</p>
              ) : data ? (
                data.map((planetData) => (
                  <CardPlanet
                    key={planetData.id}
                    planetData={planetData}
                    setCardSelected={setCardSelected}
                    setModalData={setModalData}
                  />
                ))
              ) : (
                <p>Chargement en cours...</p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between mx-4 gap-3 lg:row-span-3 2xl:col-start-3 2xl:row-start-2 lg:row-start-3">
            <div className="rounded-lg bg-indigo-50/10 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="w-1/2 p-2 text-white rounded-lg">
                  <h2 className="font-bold">Planet selectionnée :</h2>
                  {cardSelected?.name ? <p>{cardSelected?.name}</p> : <p>_</p>}
                </div>

                <div className="w-1/2 p-2 text-white rounded-lg">
                  <p className="font-bold">
                    Prix :{" "}
                    {cardSelected.name ? (
                      <span>
                        {cardSelected.price}€ x {state?.person}
                      </span>
                    ) : (
                      <span>0€</span>
                    )}
                  </p>
                  <p className="font-bold">
                    Prix total :{" "}
                    {cardSelected.name ? (
                      <span>{cardSelected.price * state?.person}€</span>
                    ) : (
                      <span>0€</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn-primary rounded-none rounded-b-lg w-full"
                  onClick={() => handleClick(cardSelected)}
                >
                  VALIDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
