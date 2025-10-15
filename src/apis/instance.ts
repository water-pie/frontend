import axios from "axios";

const API_BASE_URL = "https://api.example.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
