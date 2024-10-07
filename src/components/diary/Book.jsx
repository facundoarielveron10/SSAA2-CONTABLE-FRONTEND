// CSS
import "../../css/books/diary.css";

// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import { errorResponse } from "../../utils/error";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Book() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [seats, setSeats] = useState([]);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNTIONS
    const getDiary = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get("/account-seat/diary");

            setSeats(data.seats);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        getDiary();
    }, []);

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
                        <Table seats={seats} />
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
