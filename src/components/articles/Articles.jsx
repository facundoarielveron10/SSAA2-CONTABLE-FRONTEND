// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Table from "./Table";
import Spinner from "../Spinner";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import DeleteArticleModal from "../modal/DeleteArticleModal";

export default function Categories() {
    // STATES
    const [articles, setArticles] = useState([
        {
            _id: 1,
            name: "Coca Cola 1Lt",
            description:
                "Bebida refrescante que se caracteriza por su sabor a cola, el cual proviene de una mezcla de azúcar y aceites de naranja, limón y vainilla",
            unitPrice: 200,
            category: {
                name: "Bebidas",
            },
            supplier: {
                name: "Coca-Cola",
            },
            active: true,
        },
    ]);
    const [open, setOpen] = useState(false);
    const [articleDelete, setArticleDelete] = useState({});
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {}, []);

    // FUNCTIONS
    const onOpenDeleteArticleModal = (article) => {
        setOpen(true);
        setArticleDelete(article);
    };

    const onCloseDeleteArticleModal = () => {
        setOpen(false);
        setArticleDelete({});
    };

    const handleDeleteArticle = async () => {
        console.log("Eliminar...");
    };

    const handleActive = async () => {
        console.log("Activar...");
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de Articulos</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Articulos que existen
                    en el sistema, donde tambien se puede crear nuevos articulos
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <Table
                        articles={articles}
                        onOpenDeleteArticleModal={onOpenDeleteArticleModal}
                        handleActive={handleActive}
                    />
                )}
            </div>
            <DeleteArticleModal
                open={open}
                onCloseDeleteArticleModal={onCloseDeleteArticleModal}
                handleDeleteArticle={handleDeleteArticle}
                articleDelete={articleDelete}
            />
            {canExecute("CREATE_ARTICLE") ? (
                <a href="create-article" className="button-position button">
                    Crear Articulo
                </a>
            ) : null}
        </>
    );
}
