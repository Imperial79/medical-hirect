import axios from "axios";

export const baseUrl = "https://app-api.shapon.tech";

export const dbObject = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
