// TOAST
import { toast } from "react-toastify";

// UTILS
import { errorResponse } from "./error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const getTypeActions = () => {
    const types = ["Usuarios", "Roles", "Cuentas", "Libros"];

    return types;
};

export const getRoles = async () => {
    try {
        const { data } = await clientAxios.get("/role-action/roles");

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getActions = async (currentPage, limit, selectedType) => {
    try {
        const { data } = await clientAxios.get(
            `/role-action/actions?page=${currentPage}&limit=${limit}&type=${selectedType}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getAccounts = async (currentPage, limit) => {
    try {
        const endpoint =
            currentPage && limit
                ? `/account/accounts?page=${currentPage}&limit=${limit}`
                : `/account/accounts`;

        const { data } = await clientAxios.get(endpoint);

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getDateNow = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
};
