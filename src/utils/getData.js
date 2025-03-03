// TOAST
import { toast } from "react-toastify";

// UTILS
import { errorResponse } from "./error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const getTypeActions = () => {
    const types = [
        "Usuarios",
        "Roles",
        "Cuentas",
        "Libros",
        "Asientos",
        "Estadisticas",
        "Articulos",
        "Categorias",
        "Proveedores",
        "Compras",
    ];

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
        {
            title: "Articulos",
            description:
                "Consulta los articulos esta sección. Aquí podrás ver un resumen de todos los articulos, permitiendo un análisis más detallado de la situación de cada articulo de la organización. Esta herramienta es vital para la elaboración de los mismos.",
            url: `/articles`,
            permission: "GET_ARTICLES",
        },
        {
            title: "Categorias",
            description:
                "Consulta las categorias esta sección. Aquí podrás ver un resumen de todas las categorias, permitiendo un análisis más detallado de cada categoria de la organización. Esta herramienta es vital para la elaboración de las mismas.",
            url: `/categories`,
            permission: "GET_CATEGORIES",
        },
        {
            title: "Proveedores",
            description:
                "Consulta los proveedores esta sección. Aquí podrás ver un resumen de todos los proveedores, permitiendo un análisis más detallado de cada proveedor de la organización. Esta herramienta es vital para la administracion de los mismos.",
            url: `/suppliers`,
            permission: "GET_SUPPLIERS",
        },
        {
            title: "Pedidos de Compra",
            description:
                "Consulta los pedidos de compra esta sección. Aquí podrás ver un resumen de todos los pedidos de compras, permitiendo un análisis más detallado de cada pedido de compra de la organización. Esta herramienta es vital para la administracion de los mismos.",
            url: `/purchase-request`,
            permission: "GET_PURCHASE_REQUEST",
        },
    ];

    return sections;
};

export const getUsers = async (
    currentPage = null,
    limit = null,
    selectedRole = null
) => {
    try {
        const { data } = await clientAxios.get(
            `/user/users?page=${currentPage}&limit=${limit}&role=${selectedRole}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getRoles = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/role-action/roles?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getCategories = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/category/categories?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getCategoriesActives = async (
    currentPage = null,
    limit = null
) => {
    try {
        const { data } = await clientAxios.get(
            `/category/categories/actives?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getSuppliers = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/supplier/suppliers?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getSuppliersActives = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/supplier/suppliers/actives?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getSuppliersForArticles = async (articles) => {
    try {
        const { data } = await clientAxios.post(
            "/supplier/suppliers/articles",
            {
                articles,
            }
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getActions = async (
    currentPage = null,
    limit = null,
    selectedType = null
) => {
    try {
        const { data } = await clientAxios.get(
            `/role-action/actions?page=${currentPage}&limit=${limit}&type=${selectedType}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getAccounts = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/account/accounts?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getArticles = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/article/articles?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getStock = async (idArticle) => {
    try {
        const { data } = await clientAxios.get(`/stock/stock/${idArticle}`);

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getPricesArticle = async (idArticle) => {
    try {
        const { data } = await clientAxios.get(`/article/prices/${idArticle}`);

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getPurcharseRequest = async (currentPage = null, limit = null) => {
    try {
        const { data } = await clientAxios.get(
            `/purchasing/purchase-request?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getPurchaseRequestWithArticles = async (
    currentPage = null,
    limit = null
) => {
    try {
        const { data } = await clientAxios.get(
            `/purchasing/purchase-request/articles?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getPurchaseRequestNotCompletedWithArticles = async (
    currentPage = null,
    limit = null
) => {
    try {
        const { data } = await clientAxios.get(
            `/purchasing/purchase-request/articles/not-completed?page=${currentPage}&limit=${limit}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getArticlesPurchaseRequest = async (idPurchaseRequest) => {
    try {
        const { data } = await clientAxios.get(
            `/purchasing/purchase-request/${idPurchaseRequest}`
        );

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
