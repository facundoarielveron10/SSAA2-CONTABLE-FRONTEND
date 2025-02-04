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

// MODAL
import DeleteCategoryModal from "../modal/DeleteCategoryModal";

export default function Categories() {
    // STATES
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryDelete, setCategoryDelete] = useState({});
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // FUNCTIONS
    const onOpenDeleteCategoryModal = (category) => {
        setOpen(true);
        setCategoryDelete(category);
    };

    const onCloseDeleteCategoryModal = () => {
        setOpen(false);
        setCategoryDelete({});
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                "/category/delete-category",
                {
                    idCategory: categoryDelete._id,
                }
            );

            toast.success(data);
            onCloseDeleteCategoryModal();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleActive = async (id) => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                "/category/active-category",
                {
                    idCategory: id,
                }
            );

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

    // EFFECTS
    useEffect(() => {
        const getCategoriesData = async () => {
            setLoading(true);
            const data = await getCategories(currentPage, limit);
            setCategories(data?.categories);
            setTotalPages(data?.totalPages);
            setLoading(false);
        };

        getCategoriesData();
    }, [currentPage]);

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
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="table-container">
                        <Table
                            categories={categories}
                            onOpenDeleteCategoryModal={
                                onOpenDeleteCategoryModal
                            }
                            handleActive={handleActive}
                        />
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
            <DeleteCategoryModal
                open={open}
                onCloseDeleteCategoryModal={onCloseDeleteCategoryModal}
                handleDeleteCategory={handleDeleteCategory}
                categoryDelete={categoryDelete}
            />
            {canExecute("CREATE_CATEGORIES") ? (
                <a href="create-category" className="button-position button">
                    Crear Categoria
                </a>
            ) : null}
        </>
    );
}
