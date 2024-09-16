// CSS
import "../../css/roles/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";

// ALERTS
import toast from "react-hot-toast";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Create() {
    // STATES
    const [actions, setActions] = useState([]);
    const [filteredActions, setFilteredActions] = useState([]);
    const [name, setName] = useState("ROLE_");
    const [nameDescriptive, setNameDescriptive] = useState("");
    const [description, setDescription] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedActions, setSelectedActions] = useState([]);
    const [limit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // EFFECTS
    useEffect(() => {
        getActions();
    }, [currentPage, selectedType]);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setNameDescriptive("");
        setDescription("");
        setSelectedType("");
        setSelectedActions([]);
    };

    const getActions = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/role-action/actions?page=${currentPage}&limit=${limit}&type=${selectedType}`
            );
            setActions(data.actions);
            setTotalPages(data.totalPages);
            setFilteredActions(data.actions);
        } catch (error) {
            toast.error(errorResponse());
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

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const handleChecked = (action) => {
        if (selectedActions.includes(action)) {
            const updatedActions = selectedActions.filter((a) => a !== action);
            setSelectedActions(updatedActions);
        } else {
            setSelectedActions([...selectedActions, action]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, nameDescriptive, description].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                "/role-action/create-role",
                {
                    name,
                    nameDescriptive,
                    description,
                    actions: selectedActions,
                }
            );

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            <div className="createEditRole">
                <h1 className="title">Creacion de Rol</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo rol,
                    donde el nombre descriptivo del rol es como se vera
                    reflejado en el sistema y finalmente selecciona las acciones
                    que podrá hacer este rol.
                </p>

                <form className="createEditRole-form" onSubmit={handleSubmit}>
                    <div className="form">
                        {/* NOMBRE */}
                        <div className="form-group createEditRole-group">
                            <label className="form-label" htmlFor="name">
                                Nombre del Rol
                            </label>
                            <input
                                className="form-input createEditRole-input"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    let inputValue = e.target.value;

                                    if (inputValue.startsWith("ROLE_")) {
                                        const uppercasedValue =
                                            "ROLE_" +
                                            inputValue.slice(5).toUpperCase();
                                        setName(uppercasedValue);
                                    } else {
                                        setName("ROLE_");
                                    }
                                }}
                            />
                        </div>
                        {/* NOMBRE DESCRIPTIVO */}
                        <div className="form-group createEditRole-group">
                            <label
                                className="form-label"
                                htmlFor="nameDescriptive"
                            >
                                Nombre Descriptivo del Rol
                            </label>
                            <input
                                className="form-input createEditRole-input"
                                type="text"
                                id="nameDescriptive"
                                value={nameDescriptive}
                                onChange={(e) =>
                                    setNameDescriptive(e.target.value)
                                }
                            />
                        </div>
                        {/* DESCRIPCIÓN DEL ROL */}
                        <div className="form-group createEditRole-group">
                            <label className="form-label" htmlFor="description">
                                Descripción del Rol
                            </label>
                            <textarea
                                className="form-input createEditRole-input"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="createEditRole-typeRole">
                        <label
                            className="createEditRole-type-label"
                            htmlFor="type"
                        >
                            Tipo de Acciones
                        </label>
                        <select
                            className="createEditRole-type-select"
                            id="type"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <option defaultChecked value="">
                                Todos los tipos
                            </option>
                            <option value="Usuarios">Usuarios</option>
                            <option value="Roles">Roles</option>
                            <option value="Cuentas">Cuentas</option>
                        </select>
                    </div>
                    {actions.length === 0 || loading ? (
                        <div className="createEditRole-spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="createEditRole-actions">
                            {filteredActions.map((action) => (
                                <div
                                    key={action._id}
                                    className="createEditRole-action"
                                >
                                    <input
                                        className="createEditRole-checkbox"
                                        type="checkbox"
                                        id={action._id}
                                        name={action.name}
                                        checked={
                                            selectedActions.includes(
                                                action.name
                                            )
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            handleChecked(e.target.name)
                                        }
                                    />
                                    <label
                                        className="createEditRole-description"
                                        htmlFor={action._id}
                                    >
                                        {action.description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    <button className="createEditRole-button button">
                        Crear rol
                    </button>
                </form>
            </div>
        </>
    );
}
