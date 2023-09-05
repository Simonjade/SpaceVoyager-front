import axios from "axios";

const request = {
  generic: () => {
    const generic = axios.create({
      baseURL: "https://space-voyager-back.onrender.com",
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
    const auth = axios.create({
      baseURL: "https://space-voyager-back.onrender.com",
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
