// REACT
import { useEffect, useState } from "react";

// UTILS
import { getDetailsPurchaseOrder } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import Alert from "../Alert";
import Detail from "./Detail";

export default function Details({ id }) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    // EFFECTS
    useEffect(() => {
        const getDetailsData = async () => {
            setLoading(true);
            const data = await getDetailsPurchaseOrder(id);
            setDetails(data);
            setLoading(false);
        };

        getDetailsData();
    }, []);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Detalles de la Orden de Compra</h1>
                <p className="paragraph">
                    En este apartado podras ver los detalles de una orden
                    compra, como su articulos, proveedores, cantidad de
                    articulos, etc.
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Detail details={details} />
                    </div>
                )}
            </div>
        </>
    );
}
