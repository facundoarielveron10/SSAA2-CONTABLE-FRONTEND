// REACT
import { useEffect, useState } from "react";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./TableStock";

// UTILS
import { getStock } from "src/utils/getData";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ICONS
import { TbTruckDelivery, TbBox, TbLock } from "react-icons/tb";

export default function Stock({ id }) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [stock, setStock] = useState([]);

    // ZUSTAND
    const { canExecute } = useLoginStore();

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
                                <div className="stock-amount">
                                    <div className="stats-card">
                                        <div className="stats-card-data">
                                            <p>
                                                {
                                                    getStockAvailable()
                                                        ?.amountAvailable
                                                }{" "}
                                                Articulos Disponibles
                                            </p>
                                            <TbBox fontSize={30} />
                                        </div>
                                    </div>
                                    <div className="stats-card">
                                        <div className="stats-card-data">
                                            <p>
                                                {
                                                    getStockExpired()
                                                        ?.amountExpired
                                                }{" "}
                                                Articulos Vencidos
                                            </p>
                                            <TbLock fontSize={30} />
                                        </div>
                                    </div>
                                </div>
                                <div className="stock-orders">
                                    <h1 className="title">
                                        Stocks Solicitados
                                    </h1>
                                    <Table stock={stock} />
                                </div>
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
