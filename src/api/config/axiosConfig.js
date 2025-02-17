import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: !!localStorage.getItem("AccessToken") && `Bearer ${localStorage.getItem("AccessToken")}`,
    },
});