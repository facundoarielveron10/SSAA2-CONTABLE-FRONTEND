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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getCategoriesData = async () => {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
            setLoading(false);
        };

        getCategoriesData();
    }, []);

    // FUNCTIONS

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
                    <Table categories={categories} />
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
