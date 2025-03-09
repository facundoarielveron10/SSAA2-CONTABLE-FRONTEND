// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./TableStock";

// UTILS
import { getStock } from "src/utils/getData";

// ALERTS
import Alert from "../Alert";

// ICONS
import { TbBox, TbLock } from "react-icons/tb";

export default function Stock({ id }) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [stock, setStock] = useState([]);

    // EFFECTS
    useEffect(() => {
        const getStockData = async () => {
            setLoading(true);
            const data = await getStock(id);
            setStock(data);
            setLoading(false);
        };

        getStockData();
    }, []);

    // FUNCTIONS
    const getStockAvailable = () => {
        const stockAvailable = stock.filter(
            (stockData) => stockData.state === "DISPONIBLE"
        );

        const amountAvailable = stockAvailable.reduce(
            (total, stockData) => total + stockData.stock,
            0
        );

        return { stockAvailable, amountAvailable };
    };

    const getStockExpired = () => {
        const stockExpired = stock.filter(
            (stockData) => stockData.state === "EXPIRADO"
        );

        const amountExpired = stockExpired.reduce(
            (total, stockData) => total + stockData.stock,
            0
        );

        return { stockExpired, amountExpired };
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Stock de Articulo</h1>
                <p className="paragraph">
                    En esta seccion se puede observar toda la informacion
                    necesaria en cuanto al stock del articulo, como la cantidad
                    total, fecha de vencimiento, estado, etc.
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="stock">
                        {stock.length > 0 ? (
                            <>
                                <Table stock={stock} />
                            </>
                        ) : (
                            <div>
                                <h2 className="title text-primary">
                                    No hay informacion sobre el stock de este
                                    articulo
                                </h2>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
