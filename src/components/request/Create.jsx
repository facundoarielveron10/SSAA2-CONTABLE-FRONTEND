// UTILS
import { errorResponse } from "../../utils/error.js";
import { getArticles } from "src/utils/getData.js";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios.jsx";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// ICONS
import { IoIosAdd } from "react-icons/io";

// COMPONENTS
import DatePicker from "react-datepicker";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt, FaTrash } from "react-icons/fa";

export default function Create() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [requiredDate, setRequiredDate] = useState("");
    const [article, setArticle] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [articles, setArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);

    // FUNCTIONS
    const resetValues = () => {
        setDescription("");
        setPriority("");
        setRequiredDate("");
        setArticle("");
        setQuantity(1);
        setArticles([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([description, priority, requiredDate].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (articles.length <= 0) {
            toast.error("Debe agregar al menos un articulo");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                "/purchasing/create-pucharse-request",
                {
                    description,
                    requiredDate,
                    priority,
                    articles,
                }
            );

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleAdd = () => {
        if (!article || !quantity || quantity <= 0) {
            toast.error("Debes seleccionar un artículo y una cantidad válida");
            return;
        }

        const foundArticle = allArticles.find((a) => a?._id === article);
        const nameArticle = foundArticle
            ? foundArticle.name
            : "Nombre no encontrado";

        // Convertimos quantity a número
        const quantityNumber = Number(quantity);

        // Buscar si el artículo ya está en la lista
        const existingArticle = articles.find((a) => a.id === article);

        if (editingArticle) {
            const updatedArticles = articles.filter(
                (a) => a.id !== editingArticle.id
            );
            updatedArticles.push({
                id: article,
                name: nameArticle,
                quantity: quantityNumber,
            });
            setArticles(updatedArticles);
            setEditingArticle(null);
            toast.success("Artículo actualizado correctamente");
        } else {
            if (existingArticle) {
                // Si existe, sumamos la cantidad
                const updatedArticles = articles.map((a) =>
                    a.id === article
                        ? { ...a, quantity: a.quantity + quantityNumber }
                        : a
                );
                setArticles(updatedArticles);
                toast.success("Se ha sumado la cantidad al articulo");
            } else {
                // Si no existe, lo agregamos
                const newArticle = {
                    id: article,
                    name: nameArticle,
                    quantity: quantityNumber,
                };
                setArticles([...articles, newArticle]);
                toast.success("Se ha agregado el articulo correctamente");
            }
        }

        setArticle("");
        setQuantity(1);
    };

    const handleEdit = (articleData) => {
        setArticle(articleData.id);
        setQuantity(articleData.quantity);
        setEditingArticle(articleData);
    };

    const handleDelete = (articleId) => {
        setArticles(articles.filter((a) => a.id !== articleId));
        toast.success("Artículo eliminado correctamente");
    };

    // EFFECTS
    useEffect(() => {
        const getArticlesData = async () => {
            setLoading(true);
            const data = await getArticles();
            setAllArticles(data?.articles);
            setLoading(false);
        };

        getArticlesData();
    }, []);

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Realizar Pedido de Compra</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo pedido
                    de compra, donde deberas colocar la descripcion, prioridad y
                    la fecha en la que se requieren los articulos
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    {/* DESCRIPTION */}
                    <h2 className="form-title">Datos del pedido</h2>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">
                            Descripcion
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Fecha requerida</label>
                        <div className="form-date-container">
                            <DatePicker
                                selected={requiredDate}
                                onChange={(date) => setRequiredDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                placeholderText="Selecciona una fecha"
                                className="form-date"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="priority">
                            Prioridad
                        </label>
                        <select
                            className="form-select"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option defaultChecked value="">
                                Selecciona una prioridad
                            </option>
                            <option value={"Alta"}>Alta</option>
                            <option value={"Media"}>Media</option>
                            <option value={"Baja"}>Baja</option>
                        </select>
                    </div>
                    {/* ARTICLES */}
                    <h2 className="form-title">Articulos del pedido</h2>
                    <div className="form-group">
                        <label className="form-label" htmlFor="articles">
                            Articulos
                        </label>
                        <div className="form-subgroup">
                            <select
                                className="form-select"
                                id="articles"
                                value={article}
                                onChange={(e) => setArticle(e.target.value)}
                            >
                                <option defaultChecked value="">
                                    Selecciona un articulo
                                </option>
                                {allArticles?.map((articleData, index) => (
                                    <option
                                        key={index}
                                        value={articleData?._id}
                                    >
                                        {articleData?.name}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <input
                                    type="number"
                                    className="form-input-amount"
                                    placeholder="Cantidad"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    min="1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-add-container">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="form-add"
                        >
                            {editingArticle ? (
                                <FaPencil className="form-icon-edit" />
                            ) : (
                                <IoIosAdd className="form-icon" />
                            )}
                        </button>
                    </div>

                    {articles.length > 0 && (
                        <div className="form-group">
                            <h2 className="form-title">
                                Articulos seleccionados
                            </h2>
                            <div className="form-list">
                                {articles.map((articleData, index) => (
                                    <div key={index} className="form-item">
                                        {editingArticle &&
                                        editingArticle?.id ===
                                            articleData?.id ? (
                                            <div className="form-editing">
                                                <FaPencil className="form-icon-editing" />
                                            </div>
                                        ) : null}

                                        <p className="form-item-data">
                                            <span className="form-item-label">
                                                Articulo:
                                            </span>{" "}
                                            {articleData?.name}
                                        </p>
                                        <p className="form-item-data">
                                            <span className="form-item-label">
                                                Cantidad:
                                            </span>{" "}
                                            {articleData?.quantity}
                                        </p>
                                        <div className="form-item-actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(articleData)
                                                }
                                                className="form-add"
                                            >
                                                <FaPencil className="form-item-icon" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(articleData.id)
                                                }
                                                className="form-remove"
                                            >
                                                <FaRegTrashAlt className="form-item-icon" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Realizar Pedido de Compra
                    </button>
                </form>
            </div>
        </>
    );
}
