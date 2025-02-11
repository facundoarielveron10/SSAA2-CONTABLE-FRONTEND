// REACT
import { useEffect, useState } from "react";

// UTILS
import { getPricesArticle } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Prices({ id }) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState([]);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getPricesArticleData = async () => {
            setLoading(true);
            const data = await getPricesArticle(id);
            setPrices(data);
            setLoading(false);
        };

        getPricesArticleData();
    }, []);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de Precios</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los precios del articulo
                    seleccionado
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        {prices.length > 0 && (
                            <div className="form-group">
                                <div className="form-list">
                                    <h2 className="form-subtitle">
                                        {prices[0]?.article?.name}
                                    </h2>
                                    {prices.map((pricesData, index) => (
                                        <div
                                            className="form-prices"
                                            key={index}
                                        >
                                            <p
                                                className={`form-prices-state ${
                                                    pricesData?.supplier?.active
                                                        ? "form-active"
                                                        : "form-inactive"
                                                }`}
                                            >
                                                {pricesData?.supplier?.active
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </p>
                                            <div className="form-supplier">
                                                <div className="form-item">
                                                    <p className="form-item-data">
                                                        <span className="form-item-label">
                                                            Proveedor:
                                                        </span>{" "}
                                                        {
                                                            pricesData?.supplier
                                                                ?.name
                                                        }
                                                    </p>
                                                </div>
                                                <div className="form-supplier-input">
                                                    <label
                                                        htmlFor={`price-${index}`}
                                                        className="form-label"
                                                    >
                                                        Precio
                                                    </label>
                                                    <input
                                                        id={`price-${index}`}
                                                        className="form-input"
                                                        type="number"
                                                        value={
                                                            pricesData?.price
                                                        }
                                                        disabled={true}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
