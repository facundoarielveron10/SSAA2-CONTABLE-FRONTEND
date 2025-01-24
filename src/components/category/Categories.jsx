// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getCategories } from "src/utils/getData";

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

export default function Categories() {
    // STATES
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getCategoriesData = async () => {
            setLoading(true);
            const data = await getCategories(currentPage, limit);
            setCategories(data.categories);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getCategoriesData();
    }, [currentPage]);

    // FUNCTIONS
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
                <h1 className="title">Listado de Categorias</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos las Categorias que
                    existen en el sistema, donde tambien se puede crear nuevas
                    categorias
                </p>
                {loading === 0 ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="table-container">
                        <Table categories={categories} />
                        {categories.length > 0 ? (
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
            {canExecute("CREATE_CATEGORIES") ? (
                <a href="create-category" className="button-position button">
                    Crear Categoria
                </a>
            ) : null}
        </>
    );
}
