// REACT
import { useEffect, useState } from "react";

// UTILS
import { getPurcharseRequest } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";

// ALERTS
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";
import Table from "./Table";

export default function PurcharseRequest() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [purchaseRequests, setPurchaseRequests] = useState([]);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getPurchaseRequestData = async () => {
            setLoading(true);
            const data = await getPurcharseRequest(currentPage, limit);
            setPurchaseRequests(data.purchaseRequests);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getPurchaseRequestData();
    }, [currentPage]);

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
                    <div>
                        <Table purchaseRequests={purchaseRequests} />
                        {purchaseRequests.length > 0 ? (
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
            {canExecute("CREATE_PURCHASE_REQUEST") ? (
                <a
                    href="create-purchase-request"
                    className="button-position button"
                >
                    Realizar Pedido de Compra
                </a>
            ) : null}
        </>
    );
}
