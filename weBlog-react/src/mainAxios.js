import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

export const mainAxios = new axios.create({
  baseURL: "http://localhost:8080",
});

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    mainAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    //deleting the token from header
    delete mainAxios.defaults.headers.common["Authorization"];
  }
};