// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

// UTILS
import { errorResponse } from "../../utils/error";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Book() {
    // FUNTIONS
    const getDiary = async () => {
        if (!startDate || !endDate) {
            toast.error("Se debe colocar ambas fechas");
            return;
        }

        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/account-seat/diary?from=${startDate}&to=${endDate}&reverse=${reverse}`
            );

            setSeats(data.seats);
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

    const handleFilterDate = () => {
        getDiary();
    };

    // CONSTANTS
    const { firstDayOfMonth, lastDayOfMonth } = getDefaultDate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [seats, setSeats] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);
    const [reverse, setReverse] = useState(false);

    // EFFECTS
    useEffect(() => {
        getDiary();
    }, [reverse]);

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
                    </div>
                )}
            </div>
        </>
    );
}
