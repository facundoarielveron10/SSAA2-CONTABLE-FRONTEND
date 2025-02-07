// REACT
import { useEffect, useState } from "react";

// UTILS
import { getArticlesPurchaseRequest } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import TableArticles from "./TableArticles";

// ALERTS
import Alert from "../Alert";

export default function Articles({ idPurchaseRequest }) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);

    // EFFECTS
    useEffect(() => {
        const getArticlePurchaseRequestsData = async () => {
            setLoading(true);
            const data = await getArticlesPurchaseRequest(idPurchaseRequest);
            setArticles(data);
            setLoading(false);
        };

        getArticlePurchaseRequestsData();
    }, []);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Articulos del Pedido de Compra</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos articulos pedidos en el
                    Pedido de Compra
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <TableArticles articles={articles} />
                    </div>
                )}
            </div>
        </>
    );
}
