// CSS
import "../../css/accounts/accounts.css";
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import Table from "./Table.jsx";
import Pagination from "../Pagination.jsx";

export default function Accounts() {
    // STATES
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getAccounts();
    }, [currentPage]);

    // FUNCTIONS
    const getAccounts = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(
                `/account/accounts?page=${currentPage}&limit=${limit}`
            );

            setAccounts(data.accounts);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

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
            <div className="accounts">
                <h1 className="title">Listado de Cuentas</h1>
                <p className="paragraph">
                    En este Listado se puede ver todas las cuentas que existen
                    en el sistema, donde tambien se puede crear, editar y
                    elminar cuentas
                </p>
                {loading ? (
                    <div className="accounts-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Table accounts={accounts} />
                        {accounts.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            {canExecute("CREATE_ACCOUNT") ? (
                <a href="create-account" className="accounts-button button">
                    Crear cuenta
                </a>
            ) : null}
        </>
    );
}
