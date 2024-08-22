import axios from "axios";

const baseURL = import.meta.env.VITE_BACK_URL || "http://localhost:4000";

const clientAxios = axios.create({
    baseURL: `${baseURL}/api`,
});

export default clientAxios;
