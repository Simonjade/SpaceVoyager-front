import React from "react";

// LIBS
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// APP
import App from "./App.jsx";

// CSS
import "./index.css";

// CONTEXTS
import { AuthProvider } from "./contexts/AuthContext";
import { StoreProvider } from "./contexts/StoreContext";
import { BookingProvider } from "./contexts/BoonkingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingProvider>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </BookingProvider>
  </React.StrictMode>
);
