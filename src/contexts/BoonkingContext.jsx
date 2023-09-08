import { createContext, useContext, useEffect, useReducer } from "react";

// Étape 1 : Crée un contexte
const BookingContext = createContext();

// Étape 2 : Définis l'initial state
const initialState = {
  departure: null,
  comeBack: null,
  person: null,
  planet: null,
  hostel: null,
  room: null,
  sortPlanet: null,
};

// Étape 3 : Crée votre réducteur
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
    case "SET_ROOM":
      return { ...state, room: action.payload };
    case "SET_SORT_PLANET":
      return { ...state, sortPlanet: action.payload };
    case "SAVE":
      return { ...state, type: action.type };
    case "RESET":
      return { type: action.type };
    default:
      return state;
  }
}

// Étape 4 : Crée un composant Provider qui enveloppe votre application
export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Récupére l'état stocké dans le localStorage (s'il existe)
    const storedState = JSON.parse(localStorage.getItem("bookingState"));

    // Si un état a été précédemment stocké, on l'utilise
    if (storedState) {
      console.log("READ BOOKING STORAGE", storedState);
      dispatch({ type: "SET_DEPARTURE", payload: storedState.departure });
      dispatch({ type: "SET_COMEBACK", payload: storedState.comeBack });
      dispatch({ type: "SET_PERSON", payload: storedState.person });
      dispatch({ type: "SET_PLANET", payload: storedState.planet });
      dispatch({ type: "SET_HOSTEL", payload: storedState.hostel });
      dispatch({ type: "SET_ROOM", payload: storedState.room });
      dispatch({ type: "SET_SORT_PLANET", payload: storedState.sortPlanet });
    }
  }, []);

  useEffect(() => {
    console.log("CHANGE STATE", state.type);
    if (state.type === "SAVE") {
      // Nouvel état dans le localStorage à chaque changement
      localStorage.setItem("bookingState", JSON.stringify(state));
    } else if (state.type === "RESET") {
      localStorage.removeItem("bookingState");
    }
  }, [state]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// Étape 5 : Hook personnalisé pour utiliser le contexte
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
