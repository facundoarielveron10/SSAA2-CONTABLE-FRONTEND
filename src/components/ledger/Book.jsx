// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Search from "../Search";
import Ledger from "./Ledger";
import DatePicker from "react-datepicker";
import Pagination from "../Pagination";
import Export from "../Export";
import Alert from "../Alert";

// ALERT
import { toast } from "react-toastify";

// UTILS
import { errorResponse } from "../../utils/error";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// EXPORT
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// ICONS
import { BsTable, BsCardText } from "react-icons/bs";
import Table from "./Table";

export default function Book() {
    // STATES
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(4);

    // FUNTIONS
    const getLedger = async (clean) => {
        if (!startDate || !endDate) {
            toast.error("Se debe colocar ambas fechas");
            return;
        }

        let endpoint = clean
            ? `/account-seat/ledger?page=${currentPage}&limit=${limit}&from=${startDate}&to=${endDate}`
            : `/account-seat/ledger?page=${currentPage}&limit=${limit}&from=${startDate}&to=${endDate}&search=${search}`;

        setLoading(true);
        try {
            const { data } = await clientAxios.get(endpoint);

            // Ordenar las cuentas por la cantidad de seats (de mayor a menor)
            const sortedLedger = data.ledger.sort(
                (a, b) => b.seats.length - a.seats.length
            );

            setLedger(sortedLedger);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const getDefaultDate = () => {
        const currentDate = new Date();

        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        return { firstDayOfMonth, lastDayOfMonth };
    };

    const handleClean = () => {
        setSearch("");
        getLedger(true);
    };

    const handleSearch = () => {
        getLedger();
    };

    const handleFilterDate = () => {
        getLedger();
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();

        ledger.forEach((account) => {
            const { nameAccount, openingBalance } = account.account;

            // Inicializar con la fila de "Saldo Inicial"
            const dataForExcel = [
                {
                    Fecha: "",
                    Descripción: "Saldo Inicial",
                    Debe: "",
                    Haber: "",
                    Saldo: openingBalance || 0, // Si no hay saldo inicial, mostrar 0
                },
            ];

            // Añadir los asientos de la cuenta
            const seatsData = account.seats.map((seat) => ({
                Fecha: new Date(seat.seat.date).toLocaleDateString("es-ES"),
                Descripción: seat.seat.description,
                Debe: seat.debe ? seat.debe : "",
                Haber: seat.haber ? seat.haber : "",
                Saldo: seat.balance ? seat.balance : "",
            }));

            // Añadir los asientos después del Saldo Inicial
            dataForExcel.push(...seatsData);

            // Añadir la fila de "Saldo Final"
            dataForExcel.push({
                Fecha: "",
                Descripción: "Saldo Final",
                Debe: "",
                Haber: "",
                Saldo: account.finalBalance || "",
            });

            // Crear la hoja de trabajo con la información
            const ws = XLSX.utils.json_to_sheet(dataForExcel, {
                skipHeader: true,
            });

            // Añadir los encabezados en la primera fila
            XLSX.utils.sheet_add_aoa(
                ws,
                [["Fecha", "Descripción", "Debe", "Haber", "Saldo"]],
                { origin: "A1" }
            );

            // Añadir la hoja al libro de trabajo
            XLSX.utils.book_append_sheet(wb, ws, nameAccount);
        });

        // Exportar el archivo Excel
        XLSX.writeFile(wb, "LibroMayor.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        ledger.forEach((account, idx) => {
            const { nameAccount } = account.account;

            // Crear los datos con el saldo inicial y final en la columna de Saldo
            const rows = account.seats.map((seat) => [
                new Date(seat.seat.date).toLocaleDateString("es-ES"),
                seat.seat.description,
                seat.debe ? seat.debe : "-",
                seat.haber ? seat.haber : "-",
                seat.balance,
            ]);

            // Insertamos el saldo inicial y final
            rows.unshift(["", "Saldo Inicial", "", "", account.openingBalance]);
            rows.push(["", "Saldo Final", "", "", account.finalBalance]);

            // Configuración del PDF
            doc.setFontSize(12);
            doc.text(`Cuenta: ${nameAccount}`, 14, 20 + idx * 40); // Título con nombre de la cuenta
            doc.autoTable({
                head: [["Fecha", "Descripción", "Debe", "Haber", "Saldo"]], // Header con columnas fijas
                body: rows,
                startY: 30 + idx * 40,
                theme: "grid", // Tema de tabla con líneas para mayor claridad
                headStyles: { fillColor: [100, 100, 255] }, // Color del encabezado
                margin: { top: 20 },
            });

            if (idx < ledger.length - 1) {
                doc.addPage(); // Agregar nueva página si hay más cuentas
            }
        });

        // Guardar el archivo PDF
        doc.save("LibroMayor.pdf");
    };

    // CONSTANTS
    const { firstDayOfMonth, lastDayOfMonth } = getDefaultDate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [ledger, setLedger] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);
    const [search, setSearch] = useState("");
    const [table, setTable] = useState(false);

    // EFFECTS
    useEffect(() => {
        getLedger();
    }, [currentPage]);

    return (
        <>
            <Alert />
            <div className="ledger">
                <h1 className="title">Libro Mayor</h1>
                <p className="paragraph">
                    En esta sección se encuentra el Libro Mayor, donde se
                    registran, de manera ordenada e individual, los ingresos,
                    gastos, y demás movimientos de las cuentas contables de una
                    empresa
                </p>

                <div className="ledger-filters">
                    <Search
                        handleSearch={handleSearch}
                        handleClean={handleClean}
                        search={search}
                        setSearch={setSearch}
                    />

                    <div className="ledger-dates">
                        {/* FECHA DESDE */}
                        <div className="ledger-date-picker">
                            <label>Fecha Desde:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="ledger-filter-date"
                                maxDate={endDate}
                            />
                        </div>
                        {/* FECHA HASTA */}
                        <div className="ledger-date-picker">
                            <label>Fecha Hasta:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="ledger-filter-date"
                                minDate={startDate}
                            />
                        </div>
                        <div className="ledger-date-button">
                            <button
                                type="button"
                                className="button"
                                onClick={handleFilterDate}
                            >
                                Filtrar
                            </button>
                        </div>
                        <div className="ledger-format">
                            {table ? (
                                <BsCardText
                                    className="ledger-format-button"
                                    onClick={() => setTable(false)}
                                />
                            ) : (
                                <BsTable
                                    className="ledger-format-button"
                                    onClick={() => setTable(true)}
                                />
                            )}
                        </div>
                        <Export
                            excel={true}
                            pdf={true}
                            exportToExcel={exportToExcel}
                            exportToPDF={exportToPDF}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="ledger-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={`${
                            ledger.length > 1
                                ? "ledger-container-grid"
                                : "ledger-container-flex"
                        } ledger-container`}
                    >
                        {ledger.length <= 0 ? (
                            <p className="ledger-not-accounts">
                                No hay cuentas para mostrar
                            </p>
                        ) : (
                            <>
                                {ledger.map((account, index) => (
                                    <div key={index}>
                                        {table ? (
                                            <Table
                                                name={
                                                    account.account.nameAccount
                                                }
                                                seats={account.seats}
                                                openingBalance={
                                                    account.openingBalance
                                                }
                                                finalBalance={
                                                    account.finalBalance
                                                }
                                            />
                                        ) : (
                                            <Ledger
                                                name={
                                                    account.account.nameAccount
                                                }
                                                type={account.account.type}
                                                seats={account.seats}
                                                openingBalance={
                                                    account.openingBalance
                                                }
                                                finalBalance={
                                                    account.finalBalance
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
                {ledger.length > 0 ? (
                    <Pagination
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                ) : null}
            </div>
        </>
    );
}
