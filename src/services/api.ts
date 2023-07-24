import axios from "axios";

export const api = axios.create({
  baseURL: "https://hypedsneakersbr.netlify.app/api",
});
