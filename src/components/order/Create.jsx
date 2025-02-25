// REACT
import { useEffect, useState } from "react";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import {
    getPurchaseRequestWithArticles,
    getSuppliersForArticles,
} from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import CardPurchaseRequest from "./CardPurchaseRequest";
import SelectsSupplier from "./SelectsSupplier";
import PurchaseOrderDetails from "./PurchaseOrderDetails";

export default function Create() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [purchaseRequest, setPurchaseRequest] = useState([]);
    const [purchaseRequestSelected, setPurchaseRequestSelected] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [suppliersSelected, setSuppliersSelected] = useState([]);
    const [orderDetails, setOrderDetails] = useState({
        description: "",
        comment: "",
        currency: "",
        deliveryDate: "",
        paymentMethod: "",
    });

    // FUNCTIONS
    const validateStep = () => {
        if (step === 1 && purchaseRequestSelected.length === 0) return false;
        if (
            step === 2 &&
            (suppliersSelected.length === 0 ||
                suppliersSelected.length < suppliers.length)
        )
            return false;
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleStepClick = (num) => {
        if (num > step && !validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        setStep(num);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Orden de compra creada exitosamente");
    };

    const handlePurchaseSelect = (checked, purchase) => {
        if (checked) {
            setPurchaseRequestSelected([...purchaseRequestSelected, purchase]);
        } else {
            const newPurchaseRequestSelected = purchaseRequestSelected.filter(
                (p) => p !== purchase
            );
            setPurchaseRequestSelected(newPurchaseRequestSelected);
        }
    };

    const handleSupplierSelect = (articleId, supplier) => {
        setSuppliersSelected((prev) => {
            const existingSelection = prev.find(
                (item) => item.articleId === articleId
            );
            if (existingSelection) {
                return prev.map((item) =>
                    item.articleId === articleId ? { ...item, supplier } : item
                );
            }
            return [...prev, { articleId, supplier }];
        });
    };

    const handleOrderDetails = (orderDetail, detail) => {
        setOrderDetails((prevState) => ({
            ...prevState,
            [detail]: orderDetail,
        }));
    };

    // EFFECTS
    useEffect(() => {
        const getPurchaseRequestWithArticlesData = async () => {
            setLoading(true);
            const data = await getPurchaseRequestWithArticles();
            setPurchaseRequest(data?.purchaseRequests);
            setLoading(false);
        };

        getPurchaseRequestWithArticlesData();
    }, []);

    useEffect(() => {
        const getSuppliersForArticlesData = async () => {
            setLoading(true);
            if (step === 2 && purchaseRequestSelected.length > 0) {
                const articles = purchaseRequestSelected.flatMap((pr) =>
                    pr.articles.map((article) => article._id.trim())
                );

                const data = await getSuppliersForArticles(articles);

                setSuppliers(data);
            }

            setLoading(false);
        };

        getSuppliersForArticlesData();
    }, [step]);

    useEffect(() => {
        const selectedArticleIds = new Set(
            purchaseRequestSelected.flatMap((pr) =>
                pr.articles.map((article) => article._id)
            )
        );

        setSuppliersSelected((prevSuppliersSelected) =>
            prevSuppliersSelected.filter((supplier) =>
                selectedArticleIds.has(supplier.articleId)
            )
        );
    }, [purchaseRequestSelected]);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Realizar Orden de Compra</h1>
                <div className="order">
                    <div className="order-steps">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                                key={num}
                                className={`order-step ${
                                    step >= num ? "order-active" : ""
                                }`}
                                onClick={() => handleStepClick(num)}
                                style={{ cursor: "pointer" }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <PurchaseRequest
                                loading={loading}
                                purchaseRequest={purchaseRequest}
                                purchaseRequestSelected={
                                    purchaseRequestSelected
                                }
                                handlePurchaseSelect={handlePurchaseSelect}
                            />
                        )}
                        {step === 2 && (
                            <Suppliers
                                loading={loading}
                                suppliers={suppliers}
                                suppliersSelected={suppliersSelected}
                                handleSupplierSelect={handleSupplierSelect}
                            />
                        )}
                        {step === 3 && (
                            <PurchaseOrder
                                loading={loading}
                                orderDetails={orderDetails}
                                handleOrderDetails={handleOrderDetails}
                            />
                        )}
                        {step === 4 && <Summary />}

                        <div className="order-buttons">
                            {step > 1 && (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </button>
                            )}
                            {step < 4 ? (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button className="button" type="submit">
                                    Confirmar Orden
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

function PurchaseRequest({
    loading,
    purchaseRequest,
    purchaseRequestSelected,
    handlePurchaseSelect,
}) {
    return (
        <>
            <h2 className="form-subtitle">Pedidos de Compras</h2>
            {loading ? (
                <div className="spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="order-list">
                    {purchaseRequest?.map((purchase) => (
                        <CardPurchaseRequest
                            key={purchase?._id}
                            purchase={purchase}
                            purchaseRequestSelected={purchaseRequestSelected}
                            handlePurchaseSelect={handlePurchaseSelect}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function Suppliers({
    loading,
    suppliers,
    suppliersSelected,
    handleSupplierSelect,
}) {
    return (
        <>
            <h2 className="form-subtitle">Proveedores</h2>
            {loading ? (
                <div className="spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="order-selects">
                    {suppliers?.map((supplier) => (
                        <SelectsSupplier
                            key={supplier?._id}
                            supplier={supplier}
                            suppliersSelected={suppliersSelected}
                            handleSupplierSelect={handleSupplierSelect}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function PurchaseOrder({ loading, orderDetails, handleOrderDetails }) {
    return (
        <>
            <h2 className="form-subtitle">Orden de Compra</h2>
            {loading ? (
                <div className="spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="order-details">
                    <PurchaseOrderDetails
                        orderDetails={orderDetails}
                        handleOrderDetails={handleOrderDetails}
                    />
                </div>
            )}
        </>
    );
}

function Summary() {
    return (
        <div>
            <h2 className="form-subtitle">Resumen</h2>
        </div>
    );
}
