// CSS
import "../../css/seats/seats.css";

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
    // STATES
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [seats, setSeats] = useState([]);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNTIONS
    const getSeats = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/account-seat/seats?page=${currentPage}&limit=${limit}`
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

    // EFFECTS
    useEffect(() => {
        getSeats();
    }, [currentPage]);

    return (
        <>
            <Alert />
            <div className="seats">
                <h1 className="title">Asientos</h1>
                <p className="paragraph">
                    En esta sección se registran los asientos del sistema, donde
                    se detallan las transacciones contables de la empresa. Cada
                    asiento muestra la fecha, numero de asiento y la descripcion
                    del mismo.
                </p>

                {loading ? (
                    <div className="seats-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="seats-container">
                        {seats.length > 0 ? (
                            <>
                                <Table seats={seats} />
                                <Pagination
                                    handleNextPage={handleNextPage}
                                    handlePreviousPage={handlePreviousPage}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                />
                            </>
                        ) : null}
                    </div>
                )}
            </div>
            {canExecute("CREATE_SEAT") ? (
                <a href="create-seat" className="seats-button button">
                    Crear asiento
                </a>
            ) : null}
        </>
    );
}
