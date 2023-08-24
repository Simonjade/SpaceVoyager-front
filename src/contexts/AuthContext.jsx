import React, { createContext, useState } from "react";

// TOOLS
import request from "../tools/request";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
  });

  const login = async (data) => {
    const res = await request.generic().post("/user/login", data);

    if (res.status === 200 && res.data.token) {
      localStorage.setItem("access_token", res.data.token);
      setAuthState({
        accessToken: res.data.token,
        authenticated: true,
      });
    }
    return res;
  };

  const logout = async () => {
    localStorage.removeItem("access_token");
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const checkInLocalStorage = async () => {
    const currentToken = localStorage.getItem("access_token");

    if (currentToken) {
      const res = await request.auth(currentToken).get("/user/checkJWT");
      if (res.status !== 401) {
        setAuthState({ accessToken: currentToken, authenticated: true });
      } else {
        setAuthState({ accessToken: null, authenticated: false });
      }
    } else {
      setAuthState({ accessToken: null, authenticated: false });
    }
  };

  return (
    <Provider
      value={{
        state: authState,
        getAccessToken,
        setState: setAuthState,
        checkInLocalStorage,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
