// TOAST
import { toast } from "react-toastify";

// UTILS
import { errorResponse } from "./error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const getTypeActions = () => {
    const types = ["Usuarios", "Roles", "Cuentas", "Libros", "Asientos"];

    return types;
};

export const getSections = () => {
    const sections = [
        {
            title: "Usuarios",
            description:
                "En esta sección podrás gestionar todos los usuarios del sistema. Puedes crear nuevos usuarios, editar sus datos, asignar roles y permisos, y mantener un control de su actividad dentro de la plataforma. Asegúrate de que cada usuario tenga las credenciales adecuadas para acceder a las funcionalidades necesarias.",
            url: `/users`,
            permission: "GET_USERS",
        },
        {
            title: "Roles",
            description:
                "Define y gestiona los roles dentro de tu organización. Aquí puedes establecer diferentes niveles de acceso para los usuarios, asegurando que cada persona tenga los permisos adecuados para realizar sus tareas. Los roles permiten personalizar la experiencia del usuario y garantizar la seguridad del sistema.",
            url: `/roles`,
            permission: "GET_ROLES",
        },
        {
            title: "Cuentas",
            description:
                "Esta sección está dedicada a la administración de las cuentas financieras del sistema. Puedes agregar nuevas cuentas, modificar detalles de cuentas existentes y llevar un control exhaustivo de las transacciones asociadas. Mantén tus registros organizados y actualizados para un mejor manejo financiero.",
            url: `/accounts`,
            permission: "GET_ACCOUNTS",
        },
        {
            title: "Asientos",
            description:
                "Registra y gestiona los asientos contables en esta sección. Aquí podrás ingresar nuevas transacciones, revisar los registros existentes y asegurar que la contabilidad esté siempre al día. Esta herramienta es fundamental para mantener la salud financiera de tu organización.",
            url: `/seats`,
            permission: "GET_SEATS",
        },
        {
            title: "Libro Diario",
            description:
                "Visualiza y consulta el libro diario de transacciones. Esta sección proporciona un registro cronológico de todas las operaciones contables realizadas, lo que facilita la revisión y auditoría de los movimientos financieros. Asegúrate de tener siempre a mano esta información crucial.",
            url: `/diary-book`,
            permission: "GET_DIARY",
        },
        {
            title: "Libro Mayor",
            description:
                "Consulta el libro mayor de cuentas en esta sección. Aquí podrás ver un resumen de todas las cuentas y sus movimientos, permitiendo un análisis más detallado de la situación financiera de la organización. Esta herramienta es vital para la elaboración de informes y para tomar decisiones informadas.",
            url: `/ledger`,
            permission: "GET_LEDGER",
        },
    ];

    return sections;
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

export const getTotalsDebeHaber = (seats) => {
    return seats.reduce(
        (totals, seat) => {
            const { amount } = seat;
            if (amount.type === "debe") {
                totals.debe += amount.amount;
            } else if (amount.type === "haber") {
                totals.haber += amount.amount;
            }
            return totals;
        },
        { debe: 0, haber: 0 }
    );
};
