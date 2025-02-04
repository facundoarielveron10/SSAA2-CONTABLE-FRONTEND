// UTILS
import { formatDate } from "src/utils/format";

export default function TableStock({ stock }) {
    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Stocks</h2>
                </div>
                {stock.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningúna orden de stock disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th className="table-25">Cantidad</th>
                                <th className="table-30">Fecha de Entrega</th>
                                <th className="table-30">
                                    Fecha de Vencimiento
                                </th>
                                <th className="table-15">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock.map((stockData) => (
                                <tr>
                                    <td>{stockData?.stock} Articulos</td>
                                    <td>
                                        {formatDate(stockData?.arrivalDate)}
                                    </td>
                                    <td>
                                        {formatDate(stockData?.expirationDate)}
                                    </td>
                                    <td>
                                        <span
                                            className={`stock-tag ${
                                                stockData?.state ===
                                                "DISPONIBLE"
                                                    ? "stock-available"
                                                    : "stock-expired"
                                            }`}
                                        >
                                            {stockData?.state}
                                        </span>
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
