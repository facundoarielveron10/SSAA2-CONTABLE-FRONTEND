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
    showReverse = false,
    showDates = false,
    showExport = false,
}) {
    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Asientos</h2>
                    <div className="table-header-actions">
                        {showReverse ? (
                            <div className="table-reverse">
                                <FaArrowDownUpAcrossLine
                                    className="table-reverse-button"
                                    onClick={() => setReverse(!reverse)}
                                />
                            </div>
                        ) : null}
                        {showExport ? (
                            <Export
                                excel={true}
                                pdf={true}
                                exportToExcel={exportToExcel}
                                exportToPDF={exportToPDF}
                            />
                        ) : null}
                        {showDates ? (
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
                        ) : null}
                    </div>
                </div>
                {seats?.length === 0 ? (
                    <p className="table-no-data">No hay ningun asiento</p>
                ) : (
                    <table className="table-content table-content-border">
                        <thead>
                            <tr>
                                <th className="table-10">Fecha</th>
                                <th className="table-35">Descripción</th>
                                <th className="table-30">Cuentas</th>
                                <th className="table-12">Debe</th>
                                <th className="table-12">Haber</th>
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
                                                            ? "table-haber"
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
                )}
            </div>
        </div>
    );
}
