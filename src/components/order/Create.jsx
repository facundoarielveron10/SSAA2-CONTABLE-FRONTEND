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
import { formatDate } from "src/utils/format";

// COMPONENTS
import PurchaseRequest from "./PurchaseRequest";
import Suppliers from "./Suppliers";
import Order from "./Order";
import Summary from "./Sumary";

export default function Create() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
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
        if (step === 1 && purchaseRequestSelected.length === 0) return false;
        if (
            step === 2 &&
            (suppliersSelected.length === 0 ||
                getTotalArticlesCount(suppliersSelected) < suppliers.length)
        )
            return false;
        if (step === 3) {
            if (suppliersSelected.length === 0) return false;
            if (!validateOrderDetails(orderDetails)) return false;
        }
        return true;
    };

    const validateOrderDetails = (data) => {
        const requiredFields = [
            "description",
            "deliveryDate",
            "address",
            "currency",
            "paymentMethod",
        ];

        if (data.unified) {
            // Si unified es true, validar los campos principales del objeto
            return requiredFields.every(
                (field) => data[field] && data[field].toString().trim() !== ""
            );
        } else {
            // Si unified es false, validar los campos dentro de cada supplier
            return Object.keys(data).some((key) => {
                if (key !== "unified") {
                    const supplierData = data[key];
                    if (typeof supplierData === "object") {
                        return requiredFields.every(
                            (field) =>
                                supplierData[field] &&
                                supplierData[field].toString().trim() !== ""
                        );
                    }
                }
                return false;
            });
        }
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

    const handleStepClick = (num) => {
        if (num > step && !validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        setStep(num);
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
        supplierId = null,
        unifiedOrderDetails = null
    ) => {
        setOrderDetails((prevState) => {
            if (unifiedOrderDetails) {
                // Un solo detalle para todos los proveedores
                return { ...prevState, [detail]: value, unified: true };
            } else {
                // Detalles específicos por proveedor
                return {
                    ...prevState,
                    [supplierId]: {
                        ...(prevState[supplierId] || {}),
                        [detail]: value,
                    },
                    unified: false,
                };
            }
        });
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
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            toast.success("Orden de compra creada exitosamente");
        } catch (error) {}
    };

    // EFFECTS
    // -- EFFECTS PURCHASE REQUEST
    useEffect(() => {
        const getPurchaseRequestWithArticlesData = async () => {
            setLoading(true);
            const data = await getPurchaseRequestWithArticles();
            setPurchaseRequest(data?.purchaseRequests);
            setLoading(false);
        };

        getPurchaseRequestWithArticlesData();
    }, []);

    // -- EFFECTS SUPPLIERS
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
                            <Order
                                loading={loading}
                                orderDetails={orderDetails}
                                handleOrderDetails={handleOrderDetails}
                                suppliersSelected={suppliersSelected}
                                setUnifiedOrderDetails={setUnifiedOrderDetails}
                                unifiedOrderDetails={unifiedOrderDetails}
                            />
                        )}
                        {step === 4 && <Summary orders={orders} />}

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
