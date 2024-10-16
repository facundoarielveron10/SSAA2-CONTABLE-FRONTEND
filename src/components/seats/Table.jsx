// CSS
import "react-datepicker/dist/react-datepicker.css";

// COMPONENTS
import DatePicker from "react-datepicker";

// UTILS
import { formatDate } from "../../utils/format";

export default function Table({
    seats,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterDate,
}) {
    return (
        <div className="seats-list">
            <div className="seats-header">
                <h2 className="seats-subtitle">Asientos</h2>
                <div className="seats-dates">
                    {/* FECHA DESDE */}
                    <div className="seats-date-picker">
                        <label>Fecha Desde:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Selecciona una fecha"
                            className="seats-date"
                            maxDate={endDate}
                        />
                    </div>
                    {/* FECHA HASTA */}
                    <div className="seats-date-picker">
                        <label>Fecha Hasta:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Selecciona una fecha"
                            className="seats-date"
                            minDate={startDate}
                        />
                    </div>
                    <div className="seats-date-button">
                        <button
                            type="button"
                            className="button"
                            onClick={handleFilterDate}
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>

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
                                    <a
                                        href={`/seat/${seat._id}`}
                                        className="button"
                                    >
                                        Ver
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
