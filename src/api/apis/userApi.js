import { api } from "../config/axiosConfig";

export const userApi = async (userId) => await api.get(`/api/user/${userId}`);
