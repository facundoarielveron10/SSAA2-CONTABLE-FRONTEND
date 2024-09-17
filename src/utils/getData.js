// TOAST
import toast from "react-hot-toast";

// UTILS
import { errorResponse } from "./error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const getTypeActions = () => {
    const types = ["Usuarios", "Roles", "Cuentas"];

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
        toast.error(errorResponse());
    }
};
