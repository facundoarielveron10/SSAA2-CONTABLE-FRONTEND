// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export default function Create() {
    // STATES
    const [name, setName] = useState("Coca Cola 1Lt");
    const [description, setDescription] = useState(
        "Bebida refrescante que se caracteriza por su sabor a cola, el cual proviene de una mezcla de azúcar y aceites de naranja, limón y vainilla"
    );
    const [price, setPrice] = useState(200);
    const [categories, setCategories] = useState(["1", "2"]);
    const [suppliers, setSuppliers] = useState(["1", "2"]);
    const allCategories = [
        { id: "1", name: "Bebidas" },
        { id: "2", name: "Gaseosas" },
        { id: "3", name: "Rodados" },
        { id: "4", name: "Muebles" },
    ];
    const allSuppliers = [
        { id: "1", name: "Coca-Cola" },
        { id: "2", name: "The Coca-Cola Company" },
        { id: "3", name: "Tesla" },
        { id: "4", name: "Muebleria Juancito" },
    ];

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setCategories([""]);
        setSuppliers([""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [name, description].includes("") ||
            categories.includes("") ||
            suppliers.includes("")
        ) {
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

    const addCategory = () => {
        setCategories([...categories, ""]);
    };

    const addSupplier = () => {
        setSuppliers([...suppliers, ""]);
    };

    const removeCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const removeSupplier = (index) => {
        setSuppliers(suppliers.filter((_, i) => i !== index));
    };

    const handleCategoryChange = (value, index) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);
    };

    const handleSupplierChange = (value, index) => {
        const newSuppliers = [...suppliers];
        newSuppliers[index] = value;
        setSuppliers(newSuppliers);
    };

    const filteredCategories = (index) => {
        return allCategories.filter(
            (category) =>
                !categories.includes(category.id) ||
                categories[index] === category.id
        );
    };

    const filteredSuppliers = (index) => {
        return allSuppliers.filter(
            (supplier) =>
                !suppliers.includes(supplier.id) ||
                suppliers[index] === supplier.id
        );
    };

    const allCategoriesSelected = categories.length === allCategories.length;
    const allSuppliersSelected = suppliers.length === allSuppliers.length;

    return (
        <>
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
                        <label className="form-label" htmlFor="categories">
                            Categorias
                        </label>
                        {categories.map((category, index) => (
                            <div key={index} className="form-row">
                                <select
                                    className="form-select"
                                    id={`category-${index}`}
                                    value={category}
                                    onChange={(e) =>
                                        handleCategoryChange(
                                            e.target.value,
                                            index
                                        )
                                    }
                                >
                                    <option defaultChecked value="">
                                        Selecciona una categoria
                                    </option>
                                    {filteredCategories(index).map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {categories.length >= 2 ? (
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(index)}
                                        className="form-remove"
                                    >
                                        <IoIosRemove className="form-icon" />
                                    </button>
                                ) : null}
                            </div>
                        ))}
                        {!allCategoriesSelected && (
                            <div className="form-add-container">
                                <button
                                    type="button"
                                    onClick={addCategory}
                                    className="form-add"
                                >
                                    <IoIosAdd className="form-icon" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SUPPLIER */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="suppliers">
                            Proveedores
                        </label>
                        {suppliers.map((supplier, index) => (
                            <div key={index} className="form-row">
                                <select
                                    className="form-select"
                                    id={`supplier-${index}`}
                                    value={supplier}
                                    onChange={(e) =>
                                        handleSupplierChange(
                                            e.target.value,
                                            index
                                        )
                                    }
                                >
                                    <option defaultChecked value="">
                                        Selecciona un proveedor
                                    </option>
                                    {filteredSuppliers(index).map((sup) => (
                                        <option key={sup.id} value={sup.id}>
                                            {sup.name}
                                        </option>
                                    ))}
                                </select>
                                {suppliers.length >= 2 ? (
                                    <button
                                        type="button"
                                        onClick={() => removeSupplier(index)}
                                        className="form-remove"
                                    >
                                        <IoIosRemove className="form-icon" />
                                    </button>
                                ) : null}
                            </div>
                        ))}
                        {!allSuppliersSelected && (
                            <div className="form-add-container">
                                <button
                                    type="button"
                                    onClick={addSupplier}
                                    className="form-add"
                                >
                                    <IoIosAdd className="form-icon" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Editar Articulo
                    </button>
                </form>
            </div>
        </>
    );
}
