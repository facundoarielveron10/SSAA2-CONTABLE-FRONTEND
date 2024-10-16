// CSS
import "@styles/seats/seat.css";

// REACT
import { useEffect, useState } from "react";

// ALERT
import Alert from "../Alert";
import { toast } from "react-toastify";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "../diary/Table";

export default function ViewSeat({ id }) {
    // STATES
    const [seat, setSeat] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <div className="seat">
                <h1 className="title">Asiento</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    asiento, donde debera ir presionando en el mas para ir
                    sumando datos.
                </p>

                <div className="seat-content">
                    {loading ? <Spinner /> : <Table seats={seat} />}
                </div>
            </div>
        </>
    );
}
