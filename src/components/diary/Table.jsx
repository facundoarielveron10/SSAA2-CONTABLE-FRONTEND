// COMPONENTS
import { Fragment } from "react/jsx-runtime";
import DatePicker from "react-datepicker";
import Export from "../Export";

// UTILS
import { formatBalance, formatDate } from "../../utils/format";

// ICONS
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";

export default function Table({
    seats,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterDate,
    exportToExcel,
    exportToPDF,
    reverse,
    setReverse,
}) {
    return (
        <div className="diary-seating">
            <div className="diary-header">
                <h2 className="diary-subtitle">Asientos</h2>
                <div className="diary-header-actions">
                    <div className="diary-reverse">
                        <FaArrowDownUpAcrossLine
                            className="diary-reverse-button"
                            onClick={() => setReverse(!reverse)}
                        />
                    </div>
                    <Export
                        excel={true}
                        pdf={true}
                        exportToExcel={exportToExcel}
                        exportToPDF={exportToPDF}
                    />
                    <div className="diary-dates">
                        {/* FECHA DESDE */}
                        <div className="diary-date-picker">
                            <label>Fecha Desde:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="diary-date"
                                maxDate={endDate}
                            />
                        </div>
                        {/* FECHA HASTA */}
                        <div className="diary-date-picker">
                            <label>Fecha Hasta:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="diary-date"
                                minDate={startDate}
                            />
                        </div>
                        <div className="diary-date-button">
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
            {seats?.length === 0 ? (
                <p className="diary-no-seats">No hay ningun asiento</p>
            ) : (
                <div className="diary-table-container">
                    <table className="diary-table">
                        <thead>
                            <tr>
                                <th className="diary-table-col-date">Fecha</th>
                                <th className="diary-table-col-description">
                                    Descripción
                                </th>
                                <th className="diary-table-col-accounts">
                                    Cuentas
                                </th>
                                <th className="diary-table-col-debe">Debe</th>
                                <th className="diary-table-col-haber">Haber</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seats?.map((seat, index) => (
                                <Fragment key={index}>
                                    {seat?.accountSeats
                                        ?.sort((a, b) => b.debe - a.debe)
                                        ?.map((accountSeat, accountIndex) => (
                                            <tr key={accountIndex}>
                                                {accountIndex === 0 && (
                                                    <>
                                                        <td
                                                            rowSpan={
                                                                seat
                                                                    .accountSeats
                                                                    .length
                                                            }
                                                        >
                                                            {formatDate(
                                                                seat.seat.date
                                                            )}
                                                        </td>
                                                        <td
                                                            rowSpan={
                                                                seat
                                                                    .accountSeats
                                                                    .length
                                                            }
                                                        >
                                                            {
                                                                seat.seat
                                                                    .description
                                                            }
                                                        </td>
                                                    </>
                                                )}
                                                <td
                                                    className={`${
                                                        accountSeat.haber > 0
                                                            ? "diary-haber"
                                                            : ""
                                                    }`}
                                                >
                                                    {accountSeat.account}
                                                </td>
                                                <td>
                                                    {accountSeat.debe > 0
                                                        ? `$${formatBalance(
                                                              accountSeat.debe
                                                          )}`
                                                        : ""}
                                                </td>
                                                <td>
                                                    {accountSeat.haber > 0
                                                        ? `$${formatBalance(
                                                              accountSeat.haber
                                                          )}`
                                                        : ""}
                                                </td>
                                            </tr>
                                        ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
