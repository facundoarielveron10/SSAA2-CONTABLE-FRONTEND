export default function PurchaseOrderDetails({
    orderDetails,
    handleOrderDetails,
}) {
    return (
        <div className="order-detail">
            <div className="form-group">
                <label className="form-label" htmlFor="description">
                    Descripción
                </label>
                <textarea
                    className="form-input"
                    id="description"
                    value={orderDetails?.description}
                    onChange={(e) =>
                        handleOrderDetails(e.target.value, e.target.id)
                    }
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="comment">
                    Comentario
                </label>
                <textarea
                    className="form-input"
                    id="comment"
                    value={orderDetails?.comment}
                    onChange={(e) =>
                        handleOrderDetails(e.target.value, e.target.id)
                    }
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="currency">
                    Moneda
                </label>
                <select
                    className="form-select"
                    id="currency"
                    value={orderDetails?.currency}
                    onChange={(e) =>
                        handleOrderDetails(e.target.value, e.target.id)
                    }
                >
                    <option disabled defaultChecked value="">
                        Selecciona la moneda de pago
                    </option>
                    <option value="Pesos">Pesos</option>
                    <option value="Dolares">Dolares</option>
                </select>
            </div>
        </div>
    );
}
