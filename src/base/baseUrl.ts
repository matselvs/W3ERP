import axios from "axios";

export const ApiPredict = axios.create({
    baseURL: "https://api.predict.app.br",
  });