// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import PurchaseOrderDetails from "./PurchaseOrderDetails";
import Accordion from "../Accordion";
import Checkbox from "../Checkbox";
import PurchaseOrderDetailsMultiple from "./PurchaseOrderDetailsMultiple";

export default function Order({
    loading,
    orderDetails,
    handleOrderDetails,
    suppliersSelected,
    setUnifiedOrderDetails,
    unifiedOrderDetails,
}) {
    // STATES
    const [showCheckbox, setShowCheckbox] = useState(true);
    const [openSupplier, setOpenSupplier] = useState(null);

    // EFFECTS
    useEffect(() => {
        if (suppliersSelected.length === 1) {
            setUnifiedOrderDetails(true);
            setShowCheckbox(false);
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
                                    setUnifiedOrderDetails(e.target.checked);
                                    setOpenSupplier(null);
                                }}
                            />
                        </div>
                    )}
                    {unifiedOrderDetails ? (
                        <PurchaseOrderDetails
                            orderDetails={orderDetails}
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
