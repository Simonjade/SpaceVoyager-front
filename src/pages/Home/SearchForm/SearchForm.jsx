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
  const [passengers, setPassengers] = useState(0);

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
    if (passengers > 0) {
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
      <div className="join join-vertical text-center w-3/5 self-center ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          locale="fr"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="w-full px-3 py-2 bg-red-100/10 backdrop-blur-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item text-white text-center"
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
          className="w-full px-3 py-2 bg-red-100/10 backdrop-blur-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item text-white text-center"
        />
        <div className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item bg-red-100/10 backdrop-blur-sm">
          <button
            className="btn btn-circle btn-outline mr-4 btn-primary "
            onClick={handleMinus}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
      
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {passengers}
          <button
            className="btn btn-circle btn-outline ml-4 btn-primary"
            onClick={handlePlus}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <button
          className="btn btn-primary join-item bg-pink-700/60 backdrop-blur-sm"
          onClick={() => handleClick(startDate, endDate, passengers)}
        >
          RECHERCHER
        </button>
      </div>
    </>
  );
}
