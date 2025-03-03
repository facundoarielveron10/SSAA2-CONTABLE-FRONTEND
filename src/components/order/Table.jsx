// UTILS
import { formatDateNotHours } from "src/utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ purchaseOrders }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Ordenes de Compra</h2>
                </div>
                {purchaseOrders.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningúna orden de compra disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th className="table-20">Descripcion</th>
                                <th className="table-20">
                                    Direccion de Entrega
                                </th>
                                <th className="table-10">Moneda</th>
                                <th className="table-10">Metodo de Pago</th>
                                <th className="table-10">Fecha de requerida</th>
                                <th className="table-10">Fecha de recepcion</th>
                                <th className="table-10">Proveedor</th>
                                <th className="table-10">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.map((purchaseOrder) => (
                                <tr key={purchaseOrder?._id}>
                                    <td>{purchaseOrder?.description}</td>
                                    <td>{purchaseOrder?.deliveryAddress}</td>
                                    <td>{purchaseOrder?.currency}</td>
                                    <td>{purchaseOrder?.paymentMethod}</td>
                                    <td>
                                        {formatDateNotHours(
                                            purchaseOrder?.deliveryDate
                                        )}
                                    </td>
                                    <td>
                                        {purchaseOrder?.receiptDate
                                            ? formatDateNotHours(
                                                  purchaseOrder.deliveryDate
                                              )
                                            : "Pendiente"}
                                    </td>
                                    <td>{purchaseOrder?.supplier?.name}</td>

                                    <td>
                                        <div className="table-actions">
                                            {canExecute("COMPLETED_ORDERS") &&
                                            !purchaseOrder?.completed ? (
                                                <button
                                                    onClick={() =>
                                                        console.log(
                                                            "Completar Orden"
                                                        )
                                                    }
                                                    className="table-button button"
                                                >
                                                    Completar
                                                </button>
                                            ) : null}
                                            {canExecute(
                                                "SHOW_DETAILS_ORDER"
                                            ) ? (
                                                <a
                                                    href={`detail/${purchaseOrder?._id}`}
                                                    className="table-button button"
                                                >
                                                    Detalle
                                                </a>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
