// CSS
import "../../css/seats/seats.css";

// UTILS
import { formatDate } from "../../utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ seats }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNCTIONS

    return (
        <div className="seats-list">
            <h2 className="seats-subtitle">Asientos</h2>

            {seats.length === 0 ? (
                <p className="seats-no-seats">
                    No hay ningun asiento disponible
                </p>
            ) : (
                <table className="seats-table">
                    <thead>
                        <tr>
                            <th className="seats-table-date">Fecha</th>
                            <th className="seats-table-number">
                                Numero de Asiento
                            </th>
                            <th className="seats-table-description">
                                Descripción
                            </th>
                            <th className="seats-table-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seats.map((seat) => (
                            <tr key={seat._id}>
                                <td className="seats-table-date">
                                    {formatDate(seat.date)}
                                </td>
                                <td className="seats-table-number">
                                    {seat.number}
                                </td>
                                <td className="seats-table-description">
                                    {seat.description}
                                </td>
                                <td className="seats-table-actions">
                                    <button className="button">Ver</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
