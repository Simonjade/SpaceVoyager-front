//IMPORT AXIOS
import axios from "axios";

//TOOLS FOR REQUEST API
const request = {
  //API CALL WITHOUT AUTHENTIFICATION TOKEN
  generic: () => {
    const generic = axios.create({
      baseURL: "space-voyager-back.onrender.com",
    });
    generic.interceptors.response.use(
      (response) => response,
      (error) => {
        return error.response;
      }
    );
    return generic;
  },

  protected: (accessToken) => {
    //API CALL WITH AUTHENTIFICATION TOKEN
    const auth = axios.create({
      baseURL: "space-voyager-back.onrender.com",
    });
    auth.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    auth.interceptors.response.use(
      (response) => response,
      (error) => {
        return error.response;
      }
    );
    return auth;
  },
};

export default request;
