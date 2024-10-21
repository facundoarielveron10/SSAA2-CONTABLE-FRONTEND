// CSS
import "react-datepicker/dist/react-datepicker.css";

// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Search from "../Search";
import Ledger from "./Ledger";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import { errorResponse } from "../../utils/error";

// AXIOS
import clientAxios from "../../config/ClientAxios";
import DatePicker from "react-datepicker";

export default function Book() {
    // FUNTIONS
    const getLedger = async (clean) => {
        let endpoint = clean
            ? `/account-seat/ledger?from=${startDate}&to=${endDate}`
            : `/account-seat/ledger?from=${startDate}&to=${endDate}&search=${search}`;

        setLoading(true);
        try {
            const { data } = await clientAxios.get(endpoint);

            setLedger(data.ledger);
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

    // CONSTANTS
    const { firstDayOfMonth, lastDayOfMonth } = getDefaultDate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [ledger, setLedger] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);
    const [search, setSearch] = useState("");

    // EFFECTS
    useEffect(() => {
        getLedger();
    }, []);

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
                            ledger.map((account, index) => (
                                <Ledger
                                    key={index}
                                    name={account.account.nameAccount}
                                    type={account.account.type}
                                    seats={account.seats}
                                    openingBalance={account.openingBalance}
                                    finalBalance={account.finalBalance}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
