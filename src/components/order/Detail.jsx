import { formatBalance } from "src/utils/format";

export default function Detail({ details }) {
    console.log(details);
    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">
                        Detalles de la Orden de Compra
                    </h2>
                </div>
                {details.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún detalle de la orden de compra disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th>Articulo</th>
                                <th>Descripcion del Articulo</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail) => (
                                <tr key={detail?._id}>
                                    <td>{detail?.article?.name}</td>
                                    <td>{detail?.article?.description}</td>
                                    <td>{detail?.quantity}</td>
                                    <td>${formatBalance(detail?.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
