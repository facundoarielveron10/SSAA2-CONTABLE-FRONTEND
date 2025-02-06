// REACT
import { useEffect, useState } from "react";

// UTILS

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Articles() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {}, [currentPage]);

    // FUNCTIONS
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Pedidos de Compras</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Pedidos de Compras
                    que existen en el sistema, donde tambien se puede realizar
                    nuevos pedidos de compras
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            {canExecute("CREATE_PUCHARSE_REQUEST") ? (
                <a
                    href="create-pucharse-request"
                    className="button-position button"
                >
                    Realizar Pedido de Compra
                </a>
            ) : null}
        </>
    );
}
