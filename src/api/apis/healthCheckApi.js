import { api } from "../config/axiosConfig";

export const healthCheckApi = async () => api.get("/server/hc");