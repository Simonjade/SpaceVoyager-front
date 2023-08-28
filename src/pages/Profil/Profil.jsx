import React, { useState } from "react";
import { useContext, useEffect } from "react";
import request from "../../tools/request";
// LIBS
/* import { useNavigate } from "react-router-dom"; */

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

// HOOKS
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

// COMPONENTS
import ProtectedZone from "../../components/Protected/Protected";

export default function Profil() {
  const isAuthenticated = useIsAuthenticated();

  const auth = useContext(AuthContext);
  const [data, setData] = useState({});

  const getUserProfil = async () => {
    try {
      console.log(auth);
      const id = auth.state.data.user.id;
      console.log(id);

      console.log("##BEGIN LOCAL.TOKEN");
      const token = auth.getAccessToken();
      console.log(token);
      console.log("##END LOCAL.TOKEN");

      const response = await request.protected(token).get(`/user/${id}`);
      console.log("response dataaaa");
      console.log(response);
      setData(response.data[0]);
    } catch (err) {
      console.log("il y a une erreur");
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getUserProfil();
  }, [isAuthenticated]);

  return (
    <ProtectedZone to={"/login"}>
      <div>Informations d'utilisateur</div>
      <br />
      <div>firstname : {data?.firstname}</div>
      <div>lastname : {data?.lastname}</div>
      <br />
    </ProtectedZone>
  );
}
