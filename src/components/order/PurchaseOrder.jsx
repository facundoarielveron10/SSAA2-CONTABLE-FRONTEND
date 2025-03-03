// REACT
import { useEffect, useState } from "react";

// UTILS
import { getPurchaseOrders } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import Table from "./Table";

// ALERTS
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function PurchaseOrder() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getPurchaseOrdersData = async () => {
            setLoading(true);
            const data = await getPurchaseOrders(currentPage, limit);
            setPurchaseOrders(data?.orders);
            setTotalPages(data?.totalPages);
            setLoading(false);
        };

        getPurchaseOrdersData();
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
                <h1 className="title">Ordenes de Compras</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos las Ordenes de Compras
                    que existen en el sistema, donde tambien se puede realizar
                    nuevas ordenes de compras
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Table purchaseOrders={purchaseOrders} />
                        {purchaseOrders.length > 0 ? (
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
            {canExecute("CREATE_PURCHASE_ORDERS") ? (
                <a
                    href="create-purchase-order"
                    className="button-position button"
                >
                    Realizar Orden de Compra
                </a>
            ) : null}
        </>
    );
}
