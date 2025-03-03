// REACT
import { useEffect, useState } from "react";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import {
    getPurchaseRequestNotCompletedWithArticles,
    getSuppliersForArticles,
} from "src/utils/getData";
import { formatDate } from "src/utils/format";
import { errorResponse } from "src/utils/error";

// COMPONENTS
import PurchaseRequest from "./PurchaseRequest";
import Suppliers from "./Suppliers";
import Order from "./Order";
import Summary from "./Summary";

// AXIOS
import clientAxios from "src/config/ClientAxios";

export default function Create() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [stepStatus, setStepStatus] = useState({
        1: { completed: false },
        2: { completed: false },
        3: { completed: false },
    });
    // -- PURCHASE REQUEST
    const [purchaseRequest, setPurchaseRequest] = useState([]);
    const [purchaseRequestSelected, setPurchaseRequestSelected] = useState([]);
    // -- SUPPLIERS
    const [suppliers, setSuppliers] = useState([]);
    const [suppliersSelected, setSuppliersSelected] = useState([]);
    // -- ORDER DETAILS
    const [orderDetails, setOrderDetails] = useState({});
    const [unifiedOrderDetails, setUnifiedOrderDetails] = useState(false);
    // -- ORDER
    const [orders, setOrders] = useState([]);

    // FUNCTIONS
    // -- FUNCTIONS VALIDATION
    const validateStep = () => {
        let isValid = false;

        if (step === 1 && purchaseRequestSelected.length > 0) {
            isValid = true;
        } else if (
            step === 2 &&
            suppliersSelected.length > 0 &&
            getTotalArticlesCount(suppliersSelected) >= suppliers.length
        ) {
            isValid = true;
        } else if (step === 3 && validateOrderDetails(orderDetails)) {
            isValid = true;
        }

        if (isValid) {
            setStepStatus((prevStatus) => ({
                ...prevStatus,
                [step]: { completed: true },
            }));
        }

        return isValid;
    };

    const validateOrderDetails = (data) => {
        return Object.values(data).every(
            (order) =>
                typeof order.description === "string" &&
                order.description.trim() !== "" &&
                order.deliveryDate instanceof Date &&
                !isNaN(order.deliveryDate.getTime()) &&
                typeof order.address === "string" &&
                order.address.trim() !== "" &&
                typeof order.currency === "string" &&
                order.currency.trim() !== "" &&
                typeof order.paymentMethod === "string" &&
                order.paymentMethod.trim() !== ""
        );
    };

    const getTotalArticlesCount = (suppliersSelected) => {
        return suppliersSelected.reduce(
            (total, supplier) => total + supplier.articles.length,
            0
        );
    };

    // -- FUNCTIONS CREATE
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

    const resetValues = () => {
        setStep(1);
        setStepStatus({
            1: { completed: false },
            2: { completed: false },
            3: { completed: false },
        });
        setPurchaseRequestSelected([]);
        setSuppliersSelected([]);
        setOrderDetails({});
        setUnifiedOrderDetails(false);
        setOrders([]);
        getPurchaseRequestNotCompletedWithArticlesData();
        getSuppliersForArticlesData();
    };

    // -- FUNCTIONS PURCHASE REQUEST
    const handlePurchaseSelect = (checked, purchase) => {
        if (checked) {
            setPurchaseRequestSelected([...purchaseRequestSelected, purchase]);
        } else {
            const newPurchaseRequestSelected = purchaseRequestSelected.filter(
                (p) => p !== purchase
            );
            setPurchaseRequestSelected(newPurchaseRequestSelected);
        }

        setSuppliersSelected([]);
        setOrderDetails({});
        setOrders([]);
    };

    // -- FUNCTIONS SUPPLIERS
    const handleSupplierSelect = (article, supplier) => {
        let articleObject = {
            _id: article._id,
            name: article.name,
            price: supplier.price,
        };

        setSuppliersSelected((prev) => {
            let updatedSuppliers = prev
                .map((sup) => ({
                    ...sup,
                    articles: sup.articles.filter((a) => a._id !== article._id), // Elimina el artículo si ya está en otro proveedor
                }))
                .filter((sup) => sup.articles.length > 0); // Filtra proveedores sin artículos

            // Buscar si el supplier ya existe en la lista después de limpiar
            const supplierIndex = updatedSuppliers.findIndex(
                (item) => item.supplier._id === supplier._id
            );

            if (supplierIndex !== -1) {
                // Si el proveedor ya existe, agregar el artículo
                updatedSuppliers[supplierIndex].articles.push(articleObject);
            } else {
                // Si el proveedor no existe, agregarlo con el artículo
                updatedSuppliers.push({
                    supplier: { _id: supplier._id, name: supplier.name },
                    articles: [articleObject],
                });
            }

            return updatedSuppliers;
        });
    };

    // -- FUNCTIONS ORDER DETAILS
    const handleOrderDetails = (
        detail,
        value,
        supplierId,
        unifiedOrderDetails
    ) => {
        setOrderDetails((prevDetails) => {
            const updatedDetails = { ...prevDetails };

            if (unifiedOrderDetails) {
                // Actualiza todos los proveedores
                Object.keys(updatedDetails).forEach((key) => {
                    updatedDetails[key] = {
                        ...updatedDetails[key],
                        [detail]: value,
                    };
                });
            } else {
                // Actualiza solo el proveedor indicado
                updatedDetails[supplierId] = {
                    ...updatedDetails[supplierId],
                    [detail]: value,
                };
            }
            return updatedDetails;
        });
    };

    const handleUnifiedOrderDetails = (checked) => {
        setUnifiedOrderDetails(checked);
        const newOrderDetails = suppliersSelected.reduce((acc, supplier) => {
            acc[supplier.supplier._id] = {
                description: "",
                deliveryDate: "",
                address: "",
                currency: "",
                paymentMethod: "",
            };
            return acc;
        }, {});

        setOrderDetails(newOrderDetails);
    };

    // -- FUNCTIONS ORDERS
    const makeOrders = () => {
        let orders = [];
        suppliersSelected.forEach((supplier) => {
            // Recorremos cada artículo del supplier para agregar el campo quantity
            const articlesWithQuantity = supplier.articles.map((article) => {
                // Buscamos en purchaseRequestSelected el artículo que coincida con el _id
                let quantity = 0;
                purchaseRequestSelected.forEach((purchase) => {
                    const foundArticle = purchase.articles.find(
                        (a) => a._id === article._id
                    );
                    if (foundArticle) {
                        quantity = foundArticle.quantity;
                    }
                });
                return { ...article, quantity };
            });

            let order = {
                supplier: {
                    _id: supplier.supplier._id,
                    name: supplier.supplier.name,
                },
                articles: articlesWithQuantity,
            };

            if (orderDetails.unified) {
                order = {
                    ...order,
                    description: orderDetails.description,
                    deliveryDate: formatDate(orderDetails.deliveryDate),
                    deliveryAddress: orderDetails.address,
                    currency: orderDetails.currency,
                    paymentMethod: orderDetails.paymentMethod,
                };
            } else {
                let details = orderDetails[order.supplier._id];
                order = {
                    ...order,
                    description: details.description,
                    deliveryDate: formatDate(details.deliveryDate),
                    deliveryAddress: details.address,
                    currency: details.currency,
                    paymentMethod: details.paymentMethod,
                };
            }

            orders.push(order);
        });

        setOrders(orders);
    };

    // -- FUNCTIONS SUBMIT
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const request = purchaseRequestSelected.map((item) => ({
                _id: item._id,
            }));

            const { data } = await clientAxios.post("/order/create-order", {
                orders: orders,
                request: request,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // -- FUNCTIONS EFFECTS
    const getPurchaseRequestNotCompletedWithArticlesData = async () => {
        setLoading(true);
        const data = await getPurchaseRequestNotCompletedWithArticles();
        setPurchaseRequest(data?.purchaseRequests);
        setLoading(false);
    };

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

    // EFFECTS
    // -- EFFECTS PURCHASE REQUEST
    useEffect(() => {
        getPurchaseRequestNotCompletedWithArticlesData();
    }, []);

    // -- EFFECTS SUPPLIERS
    useEffect(() => {
        getSuppliersForArticlesData();
        if (step === 4) {
            setLoading(true);
            makeOrders();
            setLoading(false);
        }
    }, [step]);

    useEffect(() => {
        const selectedArticleIds = new Set(
            purchaseRequestSelected.flatMap((pr) =>
                pr.articles.map((article) => article._id)
            )
        );

        setSuppliersSelected((prevSuppliersSelected) =>
            prevSuppliersSelected
                .map((supplier) => ({
                    ...supplier,
                    articles: supplier.articles.filter((article) =>
                        selectedArticleIds.has(article._id)
                    ),
                }))
                .filter((supplier) => supplier.articles.length > 0)
        );
    }, [purchaseRequestSelected]);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Realizar Orden de Compra</h1>
                <div className="create-order">
                    <div className="create-order-steps">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                                key={num}
                                className={`create-order-step ${
                                    step >= num ? "create-order-active" : ""
                                }`}
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
                            <Order
                                loading={loading}
                                orderDetails={orderDetails}
                                setOrderDetails={setOrderDetails}
                                stepStatus={stepStatus}
                                handleOrderDetails={handleOrderDetails}
                                suppliersSelected={suppliersSelected}
                                handleUnifiedOrderDetails={
                                    handleUnifiedOrderDetails
                                }
                                unifiedOrderDetails={unifiedOrderDetails}
                            />
                        )}
                        {step === 4 && (
                            <Summary
                                orders={orders}
                                handleSubmit={handleSubmit}
                            />
                        )}

                        <div className="create-order-buttons">
                            {step > 1 && purchaseRequest.length > 0 && (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </button>
                            )}
                            {step < 4 && purchaseRequest.length > 0 && (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Siguiente
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
