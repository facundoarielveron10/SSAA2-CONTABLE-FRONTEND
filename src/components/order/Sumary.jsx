export default function Summary({ orders }) {
    console.log(orders);

    return (
        <div className="summary-container">
            <h2 className="form-subtitle">📦 Resumen de Pedido</h2>
            {orders?.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="summary-card">
                        <div className="summary-group">
                            <span className="summary-label">🏢 Proveedor:</span>
                            <span className="summary-value">
                                {order.supplier.name}
                            </span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">
                                📝 Descripción:
                            </span>
                            <span className="summary-value">
                                {order.description}
                            </span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">
                                📍 Dirección de entrega:
                            </span>
                            <span className="summary-value">
                                {order.deliveryAddress}
                            </span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">
                                📅 Fecha de entrega:
                            </span>
                            <span className="summary-value">
                                {order.deliveryDate}
                            </span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">💰 Moneda:</span>
                            <span className="summary-value">
                                {order.currency}
                            </span>
                        </div>
                        <div className="summary-group">
                            <span className="summary-label">
                                💳 Método de pago:
                            </span>
                            <span className="summary-value">
                                {order.paymentMethod}
                            </span>
                        </div>
                        {index !== orders.length - 1 && (
                            <hr className="summary-divider" />
                        )}
                    </div>
                ))
            ) : (
                <p className="summary-empty">No hay pedidos registrados.</p>
            )}
        </div>
    );
}
