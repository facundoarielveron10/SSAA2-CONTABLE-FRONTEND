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
import { IoIosAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [allSuppliers, setAllSuppliers] = useState([]);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
        setCategories([]);
        setCategory("");
        setSuppliers([]);
        setSupplier("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [name, description].includes("") ||
            categories.length === 0 ||
            suppliers.length === 0
        ) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        // Extraer solo los IDs de categorías y proveedores
        const categoryIds = categories.map((category) => category.id);
        const supplierData = suppliers.map(({ id, price }) => ({ id, price }));

        try {
            const { data } = await clientAxios.post("/article/create-article", {
                name,
                description,
                categories: categoryIds,
                suppliersData: supplierData,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleAddCategories = () => {
        if (!category) {
            toast.error("Debes seleccionar una categoria");
            return;
        }

        const foundCategory = allCategories.find((a) => a?._id === category);
        const nameCategory = foundCategory
            ? foundCategory.name
            : "Nombre no encontrado";

        // Si no existe, lo agregamos
        const newCategory = {
            id: category,
            name: nameCategory,
        };
        setCategories([...categories, newCategory]);
        toast.success("Se ha agregado el articulo correctamente");

        setCategory("");
    };

    const handleDeleteCategory = (categoryDelete) => {
        setCategories(
            categories.filter((category) => category.id !== categoryDelete.id)
        );
        toast.success("Categoría eliminada correctamente");
    };

    const handleAddSupplier = () => {
        if (!supplier) {
            toast.error("Debes seleccionar un proveedor");
            return;
        }

        const foundSupplier = allSuppliers.find((a) => a?._id === supplier);
        const nameSupplier = foundSupplier
            ? foundSupplier.name
            : "Nombre no encontrado";

        // Si no existe, lo agregamos
        const newSupplier = {
            id: supplier,
            name: nameSupplier,
            price: 1,
        };
        setSuppliers([...suppliers, newSupplier]);
        toast.success("Se ha agregado el articulo correctamente");

        setSupplier("");
    };

    const handleDeleteSupplier = (supplierDelete) => {
        setSuppliers(
            suppliers.filter((supplier) => supplier.id !== supplierDelete.id)
        );
        toast.success("Proveedor eliminado correctamente");
    };

    const handlePriceChange = (id, price) => {
        const validPrice = Math.max(0, Number(price));
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((sup) =>
                sup.id === id ? { ...sup, price: validPrice } : sup
            )
        );
    };

    // EFFECTS
    useEffect(() => {
        const getCategoriesData = async () => {
            const data = await getCategories();
            setAllCategories(data.categories);
        };

        const getSuppliersData = async () => {
            const data = await getSuppliers();
            setAllSuppliers(data.suppliers);
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
                    {/* CATEGORY */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="categories">
                            Categorias
                        </label>
                        <div className="form-row">
                            <select
                                className="form-select"
                                id="categories"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option defaultChecked value="">
                                    Selecciona una categoria
                                </option>
                                {allCategories
                                    .filter(
                                        (cat) =>
                                            !categories.some(
                                                (selected) =>
                                                    selected.id === cat._id
                                            )
                                    )
                                    .map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    {categories.length > 0 && (
                        <div className="form-group">
                            <div className="form-list">
                                {categories.map((categoryData, index) => (
                                    <div key={index} className="form-item">
                                        <p className="form-item-data">
                                            <span className="form-item-label">
                                                Categoria:
                                            </span>{" "}
                                            {categoryData?.name}
                                        </p>
                                        <div className="form-item-actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteCategory(
                                                        categoryData
                                                    )
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
                    <div className="form-add-container">
                        <button
                            type="button"
                            onClick={handleAddCategories}
                            className="form-add"
                        >
                            <IoIosAdd className="form-icon" />
                        </button>
                    </div>
                    {/* SUPPLIER */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="suppliers">
                            Proveedores
                        </label>
                        <div className="form-row">
                            <select
                                className="form-select"
                                id="suppliers"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                            >
                                <option defaultChecked value="">
                                    Selecciona un proveedor
                                </option>
                                {allSuppliers
                                    .filter(
                                        (sup) =>
                                            !suppliers.some(
                                                (selected) =>
                                                    selected.id === sup._id
                                            )
                                    )
                                    .map((sup) => (
                                        <option key={sup._id} value={sup._id}>
                                            {sup.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {suppliers.length > 0 && (
                            <div className="form-group">
                                <div className="form-list">
                                    {suppliers.map((supplierData, index) => (
                                        <div
                                            className="form-supplier"
                                            key={index}
                                        >
                                            <div className="form-item">
                                                <p className="form-item-data">
                                                    <span className="form-item-label">
                                                        Proveedor:
                                                    </span>{" "}
                                                    {supplierData?.name}
                                                </p>
                                                <div className="form-item-actions">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteSupplier(
                                                                supplierData
                                                            )
                                                        }
                                                        className="form-remove"
                                                    >
                                                        <FaRegTrashAlt className="form-item-icon" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-supplier-input">
                                                <label
                                                    htmlFor={`price-${index}`}
                                                    className="form-label"
                                                >
                                                    Precio
                                                </label>
                                                <input
                                                    id={`price-${index}`}
                                                    className="form-input"
                                                    type="number"
                                                    value={supplierData.price}
                                                    onChange={(e) =>
                                                        handlePriceChange(
                                                            supplierData.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="form-add-container">
                            <button
                                type="button"
                                onClick={handleAddSupplier}
                                className="form-add"
                            >
                                <IoIosAdd className="form-icon" />
                            </button>
                        </div>
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
