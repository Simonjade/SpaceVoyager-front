import React, { createContext, useContext, useEffect, useReducer } from "react";

// Étape 1 : Créez un contexte
const BookingContext = createContext();

// Étape 3 : Définissez l'initial state
const initialState = {
  daprture: null,
  comeBack: null,
  person: null,
  planet: null,
  hostel: null,
};

// Étape 3 : Créez votre réducteur
function reducer(state, action) {
  switch (action.type) {
    case "SET_DEPARTURE":
      return { ...state, departure: action.payload };
    case "SET_COMEBACK":
      return { ...state, comeBack: action.payload };
    case "SET_PERSON":
      return { ...state, person: action.payload };
    case "SET_PLANET":
      return { ...state, planet: action.payload };
    case "SET_HOSTEL":
      return { ...state, hostel: action.payload };
    default:
      return state;
  }
}

// Étape 4 : Créez un composant Provider qui enveloppe votre application
export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("newState", state);
  }, [state]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// Étape 5 : Créez un hook personnalisé pour utiliser le contexte
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
