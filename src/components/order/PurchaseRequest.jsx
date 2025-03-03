// COMPONENTS
import Spinner from "../Spinner";
import CardPurchaseRequest from "./CardPurchaseRequest";

export default function PurchaseRequest({
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
            ) : purchaseRequest?.length === 0 ? (
                <p className="purchase-request-no-data">
                    No hay pedidos de compras disponibles
                </p>
            ) : (
                <div className="purchase-request-list">
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
