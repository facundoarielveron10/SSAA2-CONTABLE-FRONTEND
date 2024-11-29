// COMPONENTS
import DatePicker from "react-datepicker";

// UTILS
import { formatDate } from "../../utils/format";

// ICONS
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";

export default function Table({
    seats,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterDate,
    reverse,
    setReverse,
}) {
    return (
        <div className="table">
            <div className="table-header">
                <h2 className="table-subtitle">Asientos</h2>
                <div className="table-header-actions">
                    <div className="table-reverse">
                        <FaArrowDownUpAcrossLine
                            className="table-reverse-button"
                            onClick={() => setReverse(!reverse)}
                        />
                    </div>
                    <div className="table-dates">
                        {/* FECHA DESDE */}
                        <div className="table-date-picker">
                            <label>Fecha Desde:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="table-date"
                                maxDate={endDate}
                            />
                        </div>
                        {/* FECHA HASTA */}
                        <div className="table-date-picker">
                            <label>Fecha Hasta:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="table-date"
                                minDate={startDate}
                            />
                        </div>
                        <div className="table-date-button">
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
            </div>

            {seats.length === 0 ? (
                <p className="table-no-data">
                    No hay ningun asiento disponible
                </p>
            ) : (
                <table className="table-content">
                    <thead>
                        <tr>
                            <th className="table-20">Fecha</th>
                            <th className="table-20">Usuario</th>
                            <th className="table-10">Numero de Asiento</th>
                            <th className="table-40">Descripción</th>
                            <th className="table-10">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seats.map((seat) => (
                            <tr key={seat._id}>
                                <td>{formatDate(seat.date)}</td>
                                <td>{seat.user.email}</td>
                                <td>{seat.number}</td>
                                <td>{seat.description}</td>
                                <td>
                                    <div className="table-actions">
                                        <a
                                            href={`/seat/${seat._id}`}
                                            className="table-button button"
                                        >
                                            Ver
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
