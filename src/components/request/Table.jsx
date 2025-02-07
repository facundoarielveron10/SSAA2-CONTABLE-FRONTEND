// UTILS
import { formatDate } from "src/utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ purchaseRequests }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Pedidos de Compra</h2>
                </div>
                {purchaseRequests.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún pedido de compra disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th className="table-40">Descripcion</th>
                                <th className="table-10">Usuario</th>
                                <th className="table-15">Fecha Requerida</th>
                                <th className="table-15">Prioridad</th>
                                <th className="table-20">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseRequests.map((purchaseRequest) => (
                                <tr key={purchaseRequest?._id}>
                                    <td>{purchaseRequest?.description}</td>
                                    <td>{purchaseRequest?.user?.email}</td>
                                    <td>
                                        {formatDate(
                                            purchaseRequest.requiredDate
                                        )}
                                    </td>
                                    <td>{purchaseRequest?.priority}</td>
                                    <td>
                                        {canExecute("GET_PURCHASE_REQUEST") ? (
                                            <a
                                                href={`purchase-request/${purchaseRequest?._id}`}
                                                className="table-button button"
                                            >
                                                Ver Articulos
                                            </a>
                                        ) : null}
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
