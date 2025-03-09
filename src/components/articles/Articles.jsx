// REACT
import { useEffect, useState } from "react";

// UTILS
import { getArticles } from "src/utils/getData";

// COMPONENTS
import Table from "./Table";
import Spinner from "../Spinner";
import Pagination from "../Pagination";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import DeleteArticleModal from "../modal/DeleteArticleModal";

export default function Articles() {
    // STATES
    const [articles, setArticles] = useState([]);
    const [open, setOpen] = useState(false);
    const [articleDelete, setArticleDelete] = useState({});
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getArticlesData = async () => {
            setLoading(true);
            const data = await getArticles(currentPage, limit);
            setArticles(data.articles);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getArticlesData();
    }, [currentPage]);

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
        setLoading(true);
        try {
            const { data } = await clientAxios.post("/article/delete-article", {
                idArticle: articleDelete._id,
            });

            toast.success(data);
            onCloseDeleteSupplierModal();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleActive = async (id) => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post("/article/active-article", {
                idArticle: id,
            });

            toast.success(data);
            window.location.reload();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                    <div>
                        <Table
                            articles={articles}
                            onOpenDeleteArticleModal={onOpenDeleteArticleModal}
                            handleActive={handleActive}
                        />
                        {articles.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <DeleteArticleModal
                open={open}
                onCloseDeleteArticleModal={onCloseDeleteArticleModal}
                handleDeleteArticle={handleDeleteArticle}
                articleDelete={articleDelete}
            />
            {canExecute("CREATE_ARTICLES") ? (
                <a href="create-article" className="button-position button">
                    Crear Articulo
                </a>
            ) : null}
        </>
    );
}
