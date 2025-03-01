import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.PUBLIC_BACK_URL || "http://localhost:4000";

const clientAxios = axios.create({
    baseURL: `${baseURL}/api`,
});

clientAxios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("AUTH_TOKEN");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clientAxios;
