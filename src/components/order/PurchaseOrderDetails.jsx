// COMPONENTS
import DatePicker from "react-datepicker";

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
                    value={orderDetails?.description || ""}
                    onChange={(e) =>
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                />
            </div>
            <div className="form-group">
                <div className="form-date-container">
                    <DatePicker
                        selected={orderDetails?.deliveryDate || ""}
                        onChange={(date) =>
                            handleOrderDetails("deliveryDate", date)
                        }
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        isClearable
                        placeholderText="Selecciona una fecha"
                        className="form-date"
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="address">
                    Dirección de entrega
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="address"
                    value={orderDetails?.address || ""}
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
                    value={orderDetails?.currency || ""}
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
                <label className="form-label" htmlFor="paymentMethod">
                    Medio de Pago
                </label>
                <select
                    className="form-select"
                    id="paymentMethod"
                    value={orderDetails?.paymentMethod || ""}
                    onChange={(e) =>
                        handleOrderDetails(e.target.id, e.target.value)
                    }
                >
                    <option defaultChecked value="">
                        Selecciona el medio de pago
                    </option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia Bancaria">
                        Transferencia Bancaria
                    </option>
                    <option value="Cheque">Cheque</option>
                    <option value="Tarjeta de Credito">
                        Tarjeta de Credito
                    </option>
                    <option value="Tarjeta de Debito">Tarjeta de Debito</option>
                </select>
            </div>
        </div>
    );
}
