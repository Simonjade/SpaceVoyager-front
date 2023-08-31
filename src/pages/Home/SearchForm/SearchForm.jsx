import React, { useEffect, useState } from "react";
// import "daisyui/dist/full.css";
// import { DatePicker } from "daisyui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import frLocale from "date-fns/locale/fr";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../../../contexts/BoonkingContext";

export default function SearchForm() {
  registerLocale("fr", frLocale);
  setDefaultLocale("fr");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  const { state, dispatch } = useBooking();

  useEffect(() => {
    console.log("newState", state);
  }, [state]);

  useEffect(() => {
    console.log("La valeur de startDate :", format(startDate, "yyyy-MM-dd"));
    console.log("La valeur de endtDate :", endDate);
    console.log("La valeur de startDate :", passengers);
  }, [startDate, endDate, passengers]);

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

    // Utilisez dispatch pour mettre à jour la date de départ
    dispatch({ type: "SET_DEPARTURE", payload: start });

    // Utilisez dispatch pour mettre à jour la date de fin
    dispatch({ type: "SET_COMEBACK", payload: end });

    // Utilisez dispatch pour mettre à jour le nombre de passagers
    dispatch({ type: "SET_PERSON", payload: passengers });

    navigate(
      `/search?departureDate=${start}&comebackDate=${end}&person=${passengers}`
    );
  };

  return (
    <>
      <div className="flex justify-center join join-vertical lg:join-horizontal text-center w-3/5 self-center ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          locale="fr"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className=" w-full px-3 py-3 bg-indigo-50/10 backdrop-blur-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 lg:join-vertical text-white text-center"
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
          className="w-full px-3 py-3 bg-indigo-50/10 backdrop-blur-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item text-white text-center"
        />
        <div
          className="md:w-full lg:w-1/3 lg:max-w-2 xl:w-1/5 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item bg-indigo-50/10 backdrop-blur-sm lg:tooltip tooltip-primary"
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
            className=" ml-4 btn-primary btn-circle w-8 h-8 text-l text-black bg-white/80"
            onClick={handlePlus}
          >
            {" "}
            +
          </button>
        </div>
        <button
          className="btn join-item backdrop-blur-sm bg-gradient-to-r from-primary to-secondary text-white"
          onClick={() => handleClick(startDate, endDate, passengers)}
        >
          RECHERCHER
        </button>
      </div>
    </>
  );
}
