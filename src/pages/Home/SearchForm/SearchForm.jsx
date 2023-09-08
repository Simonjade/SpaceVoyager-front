import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import frLocale from "date-fns/locale/fr";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../../../contexts/BoonkingContext"; //! KEZAKO

export default function SearchForm() {
  registerLocale("fr", frLocale);
  setDefaultLocale("fr");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  const { state, dispatch } = useBooking(); //! KEZAKO

  useEffect(() => {
    console.log("RESET");
    // Afficher une modal qui précise à l'internaute qu'une session est en cours sur une précédente réservation
    dispatch({ type: "RESET" });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("La valeur de startDate :", format(startDate, "yyyy-MM-dd"));
    console.log("La valeur de endtDate :", endDate);
    console.log("La valeur de startDate :", passengers);
  }, [startDate, endDate, passengers]);

  useEffect(() => {
    // Mettre à jour la date de retour à un jour de plus que la date de départ
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setEndDate(nextDay);
  }, [startDate]);

  const handlePlus = () => {
    if (passengers < 2) {
      setPassengers(passengers + 1);
    }
  };

  const handleMinus = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const navigate = useNavigate();
  const handleClick = (start, end, passengers) => {
    start = format(start, "yyyy-MM-dd");
    end = format(end, "yyyy-MM-dd");

    dispatch({ type: "SET_DEPARTURE", payload: start });
    dispatch({ type: "SET_COMEBACK", payload: end });
    dispatch({ type: "SET_PERSON", payload: passengers });
    dispatch({ type: "SAVE" });

    // navigate("/search");
    navigate("/searchPlanet");
  };

  return (
    <>
      <div className="flex flex-col lg:mt-2">
        <h3 className="portait:text-1xl font-bold text-center self-center inline-block max-w-sm mb-1 w-3/5 landscape:w-full sm:w-full text-gray-500">
          Veuillez choisir vos dates de depart et de retour
        </h3>
        <div className="flex justify-center join join-vertical lg:join-horizontal text-center w-3/5 self-center lg:rounded-tr-none backdrop-blur-sm">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="fr"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className=" w-full px-3 py-3 bg-indigo-50/10 focus:outline-none focus:ring focus:ring-blue-200 join-item lg:join-vertical text-white text-center"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="fr"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full px-3 py-3 bg-indigo-50/10 focus:outline-none focus:ring focus:ring-blue-200 join-item text-white text-center"
          />
          <div
            className="md:w-full lg:w-1/3 lg:max-w-2 xl:w-1/5 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 join-item bg-indigo-50/10 lg:tooltip tooltip-primary"
            data-tip="2 maximum"
          >
            <button
              className="  mr-4 btn-primary btn-circle w-8 h-8 text-l text-black bg-white/80"
              onClick={handleMinus}
            >
              {" "}
              -
            </button>
            {passengers}
            <button
              className=" ml-4 btn-primary btn-circle w-8 h-8 text-l text-black bg-white/80 "
              onClick={handlePlus}
            >
              {" "}
              +
            </button>
          </div>
          <button
            className="btn join-item bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            onClick={() => handleClick(startDate, endDate, passengers)}
          >
            Explorer
          </button>
        </div>
      </div>
    </>
  );
}
