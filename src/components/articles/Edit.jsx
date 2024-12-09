// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Edit({ id }) {
    // STATES
    const [name, setName] = useState("Coca Cola 1LT");
    const [description, setDescription] = useState(
        "La bebida gaseosa más famosa del mundo, reconocida por su refrescante sabor y su característico color oscuro. Disfrutada en todas partes y en cualquier ocasión"
    );
    const [price, setPrice] = useState(200);
    const [category, setCategory] = useState("1");
    const [supplier, setSupplier] = useState("1");

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
        <div>
            <Alert />
            <div className="content">
                <h1 className="title">Edicion de Articulo</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar el
                    articulo, donde podemos cambiar los datos de nombre,
                    descripcion, precio unitario, categoria y proveedor del
                    articulo.
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
                        Editar Proveedor
                    </button>
                </form>
            </div>
        </div>
    );
}
