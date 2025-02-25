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
                        handleOrderDetails(e.target.id, e.target.value)
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
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="comment">
                    Fecha de entrega
                </label>
                <input
                    className="form-input"
                    type="date"
                    id="deliveryDate"
                    value={orderDetails?.deliveryDate}
                    onChange={(e) =>
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="comment">
                    Dirección de entrega
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="address"
                    value={orderDetails?.address}
                    onChange={(e) =>
                        handleOrderDetails(e.target.id, e.target.value)
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
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                >
                    <option defaultChecked value="">
                        Selecciona la moneda de pago
                    </option>
                    <option value="Pesos">Pesos</option>
                    <option value="Dolares">Dolares</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="currency">
                    Medio de Pago
                </label>
                <select
                    className="form-select"
                    id="paymentMethod"
                    value={orderDetails?.paymentMethod}
                    onChange={(e) =>
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                >
                    <option defaultChecked value="">
                        Selecciona el medio de pago
                    </option>
                    <option value="cash">Efectivo</option>
                    <option value="transfer">Transferencia Bancaria</option>
                    <option value="check">Cheque</option>
                    <option value="credit">Tarjeta de Credito</option>
                    <option value="debit">Tarjeta de Debito</option>
                </select>
            </div>
        </div>
    );
}
