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
                                <th>Cantidad</th>
                                <th>Fecha de Entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock.map((stockData) => (
                                <tr>
                                    <td>{stockData?.stock} Articulos</td>
                                    <td>
                                        {formatDate(stockData?.arrivalDate)}
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
