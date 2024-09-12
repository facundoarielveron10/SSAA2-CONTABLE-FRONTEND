// CSS
import "../../css/roles/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner.jsx";
import Alert from "../Alert.jsx";
import Action from "./Action.jsx";
import Pagination from "../Pagination.jsx";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Edit({ id }) {
    // STATES
    const [actions, setActions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [nameDescriptive, setNameDescriptive] = useState("");
    const [description, setDescription] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedActions, setSelectedActions] = useState([]);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { editActions } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getActions();
    }, [currentPage, selectedType]);

    useEffect(() => {
        getRoleActions();
    }, []);

    // FUNCTIONS
    const getRoleActions = async () => {
        try {
            const { data } = await clientAxios.get(`/role-action/role/${id}`);

            const { role } = data;
            const { actions } = data;

            const actionNames = actions.map(
                (roleAction) => roleAction.action.name
            );

            setName(role.name);
            setNameDescriptive(role.nameDescriptive);
            setDescription(role.description);
            setSelectedActions(actionNames);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const getActions = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/role-action/actions?page=${currentPage}&limit=${limit}&type=${selectedType}`
            );
            setActions(data.actions);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, nameDescriptive, description].includes("")) {
            setError("Todos los campos son obligatorios");

            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }

        try {
            const { data } = await clientAxios.post("/role-action/edit-role", {
                idRole: id,
                newName: name,
                newNameDescriptive: nameDescriptive,
                newDescription: description,
                newActions: selectedActions,
            });

            setSuccess(data);
            editActions(id, selectedActions);
            getRoleActions();
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            {error ? <Alert message={error} type="error" /> : null}
            {success ? <Alert message={success} type="success" /> : null}
            <div className="createEditRole">
                <h1 className="title">Edicion de rol</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar el
                    rol, donde el nombre descriptivo del rol es como se vera
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
                        </select>
                    </div>
                    {actions.length === 0 || loading ? (
                        <div className="createEditRole-spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="createEditRole-actions">
                            {actions.map((action) => (
                                <Action
                                    action={action}
                                    selectedActions={selectedActions}
                                    setSelectedActions={setSelectedActions}
                                />
                            ))}
                        </div>
                    )}
                    <Pagination
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    <button
                        type="submit"
                        className="createEditRole-button button"
                    >
                        Editar rol
                    </button>
                </form>
            </div>
        </>
    );
}
