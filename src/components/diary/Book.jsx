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

// EXPORT
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const exportToExcel = () => {
        const formattedData = seats
            .map((entry) => {
                return entry.accountSeats.map((account) => ({
                    Fecha: new Date(entry.seat.date).toLocaleDateString(),
                    Descripción: entry.seat.description,
                    Cuenta: account.account,
                    Debe: account.debe,
                    Haber: account.haber,
                }));
            })
            .flat();

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Libro Diario");
        XLSX.writeFile(workbook, "libro_diario.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const formattedData = seats
            .map((entry) => {
                return entry.accountSeats.map((account) => [
                    new Date(entry.seat.date).toLocaleDateString(),
                    entry.seat.description,
                    account.account,
                    account.debe,
                    account.haber,
                ]);
            })
            .flat();

        doc.autoTable({
            head: [["Fecha", "Descripción", "Cuenta", "Debe", "Haber"]],
            body: formattedData,
        });

        doc.save("libro_diario.pdf");
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
                    En esta sección se encuentra el Libro Diario, donde se
                    detallan las transacciones contables de la empresa. Cada
                    asiento muestra la fecha, el usuario que registro el
                    asiento, las cuentas involucradas, y los montos
                    correspondientes al Debe y al Haber.
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
                            exportToExcel={exportToExcel}
                            exportToPDF={exportToPDF}
                            reverse={reverse}
                            setReverse={setReverse}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
