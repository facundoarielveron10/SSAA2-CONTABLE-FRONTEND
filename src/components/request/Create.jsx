// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// ICONS
import { IoIosAdd } from "react-icons/io";

// COMPONENTS
import DatePicker from "react-datepicker";

export default function Create() {
    // STATES
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [requiredDate, setRequiredDate] = useState("");
    const [article, setArticle] = useState("");
    const [articles, setArticles] = useState(["Coca Cola"]);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleAddOrEdit = () => {
        resetValues();
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Pedido de Compra</h1>
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
                        <select
                            className="form-select"
                            id="articles"
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                        >
                            <option defaultChecked value="">
                                Selecciona un articulo
                            </option>
                            <option value={"1"}>Ropero</option>
                            <option value={"2"}>Tesla 400km</option>
                        </select>
                    </div>
                    <div className="form-add-container">
                        <button
                            type="button"
                            onClick={handleAddOrEdit}
                            className="form-add"
                        >
                            <IoIosAdd className="form-icon" />
                        </button>
                    </div>

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
