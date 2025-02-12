// UTILS
import { formatDate } from "src/utils/format";

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
                            <tr></tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.map((purchaseOrder) => (
                                <tr key={purchaseOrder?._id}></tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
