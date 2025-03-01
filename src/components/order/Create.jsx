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
import Accordion from "../Accordion";
import { formatDate } from "src/utils/format";

export default function Create() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [purchaseRequest, setPurchaseRequest] = useState([]);
    const [purchaseRequestSelected, setPurchaseRequestSelected] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [suppliersSelected, setSuppliersSelected] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [orders, setOrders] = useState([]);
    

    // FUNCTIONS
    const validateStep = () => {
        if (step === 1 && purchaseRequestSelected.length === 0) return false;
        if (
            step === 2 &&
            (suppliersSelected.length === 0 ||
                getTotalArticlesCount(suppliersSelected) < suppliers.length)
        )
            return false;
        if (step === 3 && orderDetails){
            if(!validateOrderDetails(orderDetails))return false;
        }
        return true;
    };

    const getTotalArticlesCount = (suppliersSelected) => {
        return suppliersSelected.reduce((total, supplier) => total + supplier.articles.length, 0);
    };

    const handleNext = () => {
        if (!validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        if (step < 4) setStep(step + 1);
    };

    const makeOrders = () => {
        console.log(step)
        let orders = [];
        console.log(suppliersSelected);
        suppliersSelected.forEach((supplier) => {
            let order = {
                supplier: {_id: supplier.supplier._id, name: supplier.supplier.name},
                articles: supplier.articles
            }

            if (orderDetails.unified){
                order = {...order,
                    description: orderDetails.description,
                    deliveryDate: formatDate(orderDetails.deliveryDate),
                    deliveryAddress: orderDetails.address,
                    currency: orderDetails.currency,
                    paymentMethod: orderDetails.paymentMethod
                }
            } else {
                let details = orderDetails[order.supplier._id];
                order = {...order,
                    description: details.description,
                    deliveryDate: formatDate(details.deliveryDate),
                    deliveryAddress: details.address,
                    currency: details.currency,
                    paymentMethod: details.paymentMethod
                }
            }

            orders.push(order);
        })

        setOrders(orders);
    }

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

    const handleSupplierSelect = (article, supplier) => {
        let articleObject = {
            _id: article._id,
            name: article.name,
            price: supplier.price
        };
    
        setSuppliersSelected((prev) => {
            let updatedSuppliers = prev.map(sup => ({
                ...sup,
                articles: sup.articles.filter(a => a._id !== article._id) // Elimina el artículo si ya está en otro proveedor
            })).filter(sup => sup.articles.length > 0); // Filtra proveedores sin artículos
    
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
    
    const handleOrderDetails = (detail, value, supplierId = null, unifiedOrderDetails = null) => {
        setOrderDetails((prevState) => {
            if (unifiedOrderDetails) {
                // Un solo detalle para todos los proveedores
                return { ...prevState, [detail]: value,  unified: true };
            } else {
                // Detalles específicos por proveedor
                return {
                    ...prevState,
                    [supplierId]: {
                        ...(prevState[supplierId] || {}),
                        [detail]: value,
                    },
                    unified: false
                };
            }
        });
    };

    const validateOrderDetails = (data) => {
        const requiredFields = ["description", "deliveryDate", "address", "currency", "paymentMethod"];
    
        if (data.unified) {
            // Si unified es true, validar los campos principales del objeto
            return requiredFields.every(field => data[field] && data[field].toString().trim() !== "");
        } else {
            // Si unified es false, validar los campos dentro de cada supplier
            return Object.keys(data).some(key => {
                if (key !== "unified") {
                    const supplierData = data[key];
                    if (typeof supplierData === "object") {
                        return requiredFields.every(field => supplierData[field] && supplierData[field].toString().trim() !== "");
                    }
                }
                return false;
            });
        }
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
        if(step === 4){
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
                .filter((supplier) => supplier.articles.length > 0) // Filtra proveedores sin artículos
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
                                suppliersSelected={suppliersSelected}
                            />
                        )}
                        {step === 4 && <Summary orders={orders}/>}

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

function PurchaseOrder({ loading, orderDetails, handleOrderDetails, suppliersSelected}) {
    const [unifiedOrderDetails, setUnifiedOrderDetails] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(true);
    const [openSupplier, setOpenSupplier] = useState(null); // Proveedor expandido
    

    useEffect(() => {
        if (suppliersSelected.length === 1){
            setUnifiedOrderDetails(true);
            setShowCheckbox(false);
        }
    },[])

    const toggleSupplier = (supplierId) => {
        setOpenSupplier(openSupplier === supplierId ? null : supplierId);
    };

    return (
        <>
            <h2 className="form-subtitle">Orden de Compra</h2>
            {loading ? (
                <div className="spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="order-details">
                    {showCheckbox && <div className="form-group">
                        <input
                            type="checkbox"
                            id="unifiedOrderDetails"
                            checked={unifiedOrderDetails}
                            onChange={(e) => {
                                setUnifiedOrderDetails(e.target.checked);
                                setOpenSupplier(null); // Resetear acordeón si se unifican los detalles
                            }}
                        />
                        <label htmlFor="unifiedOrderDetails">
                            Usar un único detalle para todos los proveedores
                        </label>
                    </div>}
                    {unifiedOrderDetails ? (
                        <PurchaseOrderDetails
                            orderDetails={orderDetails}
                            handleOrderDetails={(detail, value) => handleOrderDetails(detail, value, null, unifiedOrderDetails)}
                        />
                    ) : (
                        <div>
                        {suppliersSelected.map((supplier, index) => (
                            <div key={index}>
                                <Accordion 
                                    id={supplier.supplier._id}
                                    handleClick={() => toggleSupplier(supplier.supplier._id)}
                                    active={openSupplier === supplier.supplier._id}
                                    title={supplier.supplier.name}
                                >
                                    <PurchaseOrderDetails
                                        orderDetails={orderDetails[supplier.supplier._id] || {}}
                                        handleOrderDetails={(detail, value) =>
                                            handleOrderDetails(detail, value, supplier.supplier._id, unifiedOrderDetails)
                                        }
                                    />
                                </Accordion>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

function Summary({ orders }) {
    console.log(orders);

    return (
        <div className="summary-container">
            <h2 className="title">📦 Resumen de Pedido</h2>
            {orders?.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="summary-card">
                        <div className="summary-group">
                            <span className="summary-label">🏢 Proveedor:</span>
                            <span className="summary-value">{order.supplier.name}</span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">📝 Descripción:</span>
                            <span className="summary-value">{order.description}</span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">📍 Dirección de entrega:</span>
                            <span className="summary-value">{order.deliveryAddress}</span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">📅 Fecha de entrega:</span>
                            <span className="summary-value">{order.deliveryDate}</span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">💰 Moneda:</span>
                            <span className="summary-value">{order.currency}</span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">💳 Método de pago:</span>
                            <span className="summary-value">{order.paymentMethod}</span>
                        </div>
                        {index !== orders.length - 1 && <hr className="summary-divider" />}
                    </div>
                ))
            ) : (
                <p className="summary-empty">No hay pedidos registrados.</p>
            )}
        </div>
    );
}

