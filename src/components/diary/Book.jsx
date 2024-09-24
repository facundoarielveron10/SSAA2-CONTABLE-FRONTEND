// CSS
import "../../css/books/diary.css";

// REACT
import { useState } from "react";

// COMPONENTS
import Alert from "../Alert";
import Spinner from "../Spinner";
import Search from "../Search";
import Table from "./Table";
import Pagination from "../Pagination";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Book() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNTIONS
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

    return (
        <>
            <Alert />
            <div className="diary">
                <h1 className="title">Libro Diario</h1>
                <p className="paragraph">
                    En esta sección se registran los asientos del Libro Diario,
                    donde se detallan las transacciones contables de la empresa.
                    Cada asiento muestra la fecha, las cuentas involucradas, y
                    los montos correspondientes al Debe y al Haber.
                </p>

                {loading ? (
                    <div className="diary-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="diary-seating-container">
                        <Table />
                        <Pagination
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
            {canExecute("CREATE_SEAT") ? (
                <a href="create-seat" className="diary-button button">
                    Crear asiento
                </a>
            ) : null}
        </>
    );
}
