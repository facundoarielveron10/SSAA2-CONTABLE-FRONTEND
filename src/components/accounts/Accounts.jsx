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
import toast from "react-hot-toast";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import Modal from "react-responsive-modal";
import Table from "./Table";
import Pagination from "../Pagination";

export default function Accounts() {
    // STATES
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getAccounts();
    }, [currentPage]);

    // FUNCTIONS
    const getAccounts = async () => {
        try {
            const { data } = await clientAxios.get(
                `/account/accounts?page=${currentPage}&limit=${limit}`
            );

            setAccounts(data.accounts);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
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
                {accounts.length === 0 ? (
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
