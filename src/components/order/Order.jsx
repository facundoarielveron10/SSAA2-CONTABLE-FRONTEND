// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import PurchaseOrderDetails from "./PurchaseOrderDetails";
import Checkbox from "../Checkbox";
import PurchaseOrderDetailsMultiple from "./PurchaseOrderDetailsMultiple";

export default function Order({
    loading,
    orderDetails,
    setOrderDetails,
    stepStatus,
    handleOrderDetails,
    suppliersSelected,
    handleUnifiedOrderDetails,
    unifiedOrderDetails,
}) {
    // STATES
    const [showCheckbox, setShowCheckbox] = useState(true);
    const [openSupplier, setOpenSupplier] = useState(null);

    // EFFECTS
    useEffect(() => {
        if (suppliersSelected.length === 1) {
            setShowCheckbox(false);
            handleUnifiedOrderDetails(true);
        }
    }, []);

    useEffect(() => {
        if (!stepStatus[3].completed) {
            const newOrderDetails = suppliersSelected.reduce(
                (acc, supplier) => {
                    acc[supplier.supplier._id] = {
                        description: "",
                        deliveryDate: "",
                        address: "",
                        currency: "",
                        paymentMethod: "",
                    };
                    return acc;
                },
                {}
            );

            setOrderDetails(newOrderDetails);
        }
    }, []);

    // FUNCTIONS
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
                    {showCheckbox && (
                        <div className="form-group">
                            <label className="order-label" htmlFor="unified">
                                Usar un único detalle para todos los proveedores
                            </label>
                            <Checkbox
                                id={"unified"}
                                checked={unifiedOrderDetails}
                                onChange={(e) => {
                                    handleUnifiedOrderDetails(e.target.checked);
                                    setOpenSupplier(null);
                                }}
                            />
                        </div>
                    )}
                    {unifiedOrderDetails ? (
                        <PurchaseOrderDetails
                            // Se extrae el detalle común (por ejemplo, el del primer proveedor)
                            orderDetails={
                                Object.keys(orderDetails).length
                                    ? orderDetails[Object.keys(orderDetails)[0]]
                                    : {}
                            }
                            handleOrderDetails={(detail, value) =>
                                handleOrderDetails(
                                    detail,
                                    value,
                                    null,
                                    unifiedOrderDetails
                                )
                            }
                        />
                    ) : (
                        <PurchaseOrderDetailsMultiple
                            suppliers={suppliersSelected}
                            toggleSupplier={toggleSupplier}
                            openSupplier={openSupplier}
                            handleOrderDetails={handleOrderDetails}
                            orderDetails={orderDetails}
                            unifiedOrderDetails={unifiedOrderDetails}
                        />
                    )}
                </div>
            )}
        </>
    );
}
