// COMPONENTS
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
