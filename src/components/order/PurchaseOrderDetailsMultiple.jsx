// COMPONENTS
import Accordion from "../Accordion";
import PurchaseOrderDetails from "./PurchaseOrderDetails";

export default function PurchaseOrderDetailsMultiple({
    suppliers,
    toggleSupplier,
    openSupplier,
    handleOrderDetails,
    orderDetails,
    unifiedOrderDetails,
}) {
    return (
        <div className="order-detail-selects">
            {suppliers.map((supplier, index) => (
                <div className="order-detail-select" key={index}>
                    <Accordion
                        id={supplier.supplier._id}
                        handleClick={() =>
                            toggleSupplier(supplier.supplier._id)
                        }
                        active={openSupplier === supplier.supplier._id}
                        title={supplier.supplier.name}
                    >
                        <PurchaseOrderDetails
                            orderDetails={
                                orderDetails[supplier.supplier._id] || {}
                            }
                            handleOrderDetails={(detail, value) =>
                                handleOrderDetails(
                                    detail,
                                    value,
                                    supplier.supplier._id,
                                    unifiedOrderDetails
                                )
                            }
                        />
                    </Accordion>
                </div>
            ))}
        </div>
    );
}
