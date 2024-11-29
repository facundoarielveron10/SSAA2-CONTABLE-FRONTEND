// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import Table from "./Table";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import { errorResponse } from "../../utils/error";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Seats() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNTIONS
    const getSeats = async () => {
        if (!startDate || !endDate) {
            toast.error("Se debe colocar ambas fechas");
            return;
        }

        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/account-seat/seats?page=${currentPage}&limit=${limit}&from=${startDate}&to=${endDate}&reverse=${reverse}`
            );
            setSeats(data.seats);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
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

    const handleFilterDate = () => {
        getSeats();
    };

    // CONSTANTS
    const { firstDayOfMonth, lastDayOfMonth } = getDefaultDate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [seats, setSeats] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);
    const [reverse, setReverse] = useState(false);

    // EFFECTS
    useEffect(() => {
        getSeats();
    }, [currentPage, reverse]);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Asientos</h1>
                <p className="paragraph">
                    En esta sección se registran los asientos del sistema, donde
                    se detallan las transacciones contables de la empresa. Cada
                    asiento muestra la fecha, numero de asiento y la descripcion
                    del mismo.
                </p>

                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="table-container">
                        <Table
                            seats={seats}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            handleFilterDate={handleFilterDate}
                            reverse={reverse}
                            setReverse={setReverse}
                        />
                        {seats.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            {canExecute("CREATE_SEAT") ? (
                <a href="create-seat" className="button-position button">
                    Crear asiento
                </a>
            ) : null}
        </>
    );
}
