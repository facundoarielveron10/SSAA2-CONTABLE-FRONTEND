// REACT
import { useEffect, useState } from "react";

// UTILS
import { getPurchaseOrders } from "src/utils/getData";
import { errorResponse } from "src/utils/error";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import Table from "./Table";
import CompleteOrderModal from "../modal/CompleteOrderModal";

// ALERTS
import Alert from "../Alert";
import { toast } from "react-toastify";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// AXIOS
import clientAxios from "src/config/ClientAxios";

export default function PurchaseOrder() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openCompleteOrderModal, setOpenCompleteOrderModal] = useState(false);
    const [orderComplete, setOrderComplete] = useState("");

    // ZUSTAND
    const { canExecute } = useLoginStore();

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

    const getPurchaseOrdersData = async () => {
        setLoading(true);
        const data = await getPurchaseOrders(currentPage, limit);
        setPurchaseOrders(data?.orders);
        setTotalPages(data?.totalPages);
        setLoading(false);
    };

    const onOpenCompleteOrderModal = (idOrder) => {
        setOpenCompleteOrderModal(true);
        setOrderComplete(idOrder);
    };

    const onCloseCompleteOrderModal = () => {
        setOpenCompleteOrderModal(false);
        setOrderComplete("");
    };

    const handleCompleteOrder = async (e) => {
        e.preventDefault();
        try {
            const { data } = await clientAxios.post("/order/completed-order", {
                idOrder: orderComplete,
            });

            toast.success(data);
            getPurchaseOrdersData();
            onCloseCompleteOrderModal();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        getPurchaseOrdersData();
    }, [currentPage]);

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
                        <Table
                            purchaseOrders={purchaseOrders}
                            onOpenCompleteOrderModal={onOpenCompleteOrderModal}
                        />
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
            <CompleteOrderModal
                openCompleteOrderModal={openCompleteOrderModal}
                onCloseCompleteOrderModal={onCloseCompleteOrderModal}
                handleCompleteOrder={handleCompleteOrder}
            />
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
