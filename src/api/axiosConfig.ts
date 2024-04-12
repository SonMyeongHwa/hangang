import axios from "axios";

export const API = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  baseURL: `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_ACCESSKEY}/json`,
});
