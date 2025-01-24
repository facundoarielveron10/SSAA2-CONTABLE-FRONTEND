// UTILS
import { errorResponse } from "../../utils/error";
import { getCategories, getSuppliers } from "src/utils/getData.js";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// ICONS
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([""]);
    const [suppliers, setSuppliers] = useState([""]);
    const [allCategories, setAllCategories] = useState([]);
    const [allSuppliers, setAllSuppliers] = useState([]);

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
            const { data } = await clientAxios.post("/article/create-article", {
                name,
                description,
                unitPrice: price,
                categories,
                suppliers,
            });

            toast.success(data);
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
                !categories.includes(category?._id) ||
                categories[index] === category?._id
        );
    };

    const filteredSuppliers = (index) => {
        return allSuppliers.filter(
            (supplier) =>
                !suppliers.includes(supplier?._id) ||
                suppliers[index] === supplier?._id
        );
    };

    const allCategoriesSelected = categories.length === allCategories.length;
    const allSuppliersSelected = suppliers.length === allSuppliers.length;

    // EFFECTS
    useEffect(() => {
        const getCategoriesData = async () => {
            const data = await getCategories();
            setAllCategories(data);
        };

        const getSuppliersData = async () => {
            const data = await getSuppliers();
            setAllSuppliers(data);
        };

        getCategoriesData();
        getSuppliersData();
    }, []);

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
                        <label className="form-label" htmlFor="categories">
                            Categorias
                        </label>
                        {categories.map((category, index) => (
                            <div key={index} className="form-row">
                                <select
                                    className="form-select"
                                    id={`category-${index}`}
                                    value={category?._id}
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
                                        <option key={cat?._id} value={cat?._id}>
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
                                    value={supplier?._id}
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
                                        <option key={sup?._id} value={sup?._id}>
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
                        Crear Articulo
                    </button>
                </form>
            </div>
        </>
    );
}
