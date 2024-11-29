// REACT
import { useEffect, useState } from "react";

// ALERT
import Alert from "../Alert";
import { toast } from "react-toastify";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// EXPORT
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "../diary/Table";

export default function ViewSeat({ id }) {
    // STATES
    const [seat, setSeat] = useState([]);
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const exportToExcel = () => {
        const formattedData = seat
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
        XLSX.writeFile(workbook, "Asiento.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const formattedData = seat
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

        doc.save("Asiento.pdf");
    };

    // EFFECTS
    useEffect(() => {
        const getSeat = async () => {
            setLoading(true);
            try {
                const { data } = await clientAxios.get(
                    `/account-seat/seat/${id}`
                );
                setSeat(data);
            } catch (error) {
                toast.error("Hubo un error al obtener el asiento");
            } finally {
                setLoading(false);
            }
        };

        getSeat();
    }, []);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Asiento</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    asiento, donde debera ir presionando en el mas para ir
                    sumando datos.
                </p>

                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <Table
                        seats={seat}
                        showExport={true}
                        exportToExcel={exportToExcel}
                        exportToPDF={exportToPDF}
                    />
                )}
            </div>
        </>
    );
}
