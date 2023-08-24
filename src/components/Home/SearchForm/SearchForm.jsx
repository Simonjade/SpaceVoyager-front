import React, { useState } from "react";
// import "daisyui/dist/full.css";
// import { DatePicker } from "daisyui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function SearchForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <div className="join join-vertical">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 join-item"
        />
        <button className="btn btn-primary join-item">RECHERCHER</button>
      </div>
    </>
  );
}
