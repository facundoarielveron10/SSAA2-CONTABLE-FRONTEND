// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [supplier, setSupplier] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setSupplier("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description, category, supplier].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleChangeValue = (value) => {
        setPrice(value === "" ? 0 : Number(value));
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Creacion de Articulo</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    articulo, donde deberas colocar el nombre, descripcion,
                    precio unitario, categoria a la que pertenece y el
                    proveedor.
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    {/* NAME */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* DESCRIPTION  */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            className="form-input"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/* UNIT PRICE */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="price">
                            Precio unitario
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            id="price"
                            min={0}
                            value={price}
                            onChange={(e) => handleChangeValue(e.target.value)}
                        />
                    </div>
                    {/* CATEGORY */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="category">
                            Categoria
                        </label>
                        <select
                            className="form-select"
                            id="category"
                            value={category}
                            onChange={(e) => setAccount(e.target.value)}
                        >
                            <option defaultChecked value="">
                                Selecciona una categoria
                            </option>
                            <option value={"1"}>Bebidas</option>
                            <option value={"2"}>Rodados</option>
                            <option value={"3"}>Muebles</option>
                        </select>
                    </div>
                    {/* SUPPLIER */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="supplier">
                            Proveedor
                        </label>
                        <select
                            className="form-select"
                            id="supplier"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                        >
                            <option defaultChecked value="">
                                Selecciona un proveedor
                            </option>
                            <option value={"1"}>Coca-Cola</option>
                            <option value={"2"}>Tesla</option>
                            <option value={"3"}>Muebleria Juancito</option>
                        </select>
                    </div>
                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Crear Proveedor
                    </button>
                </form>
            </div>
        </>
    );
}
