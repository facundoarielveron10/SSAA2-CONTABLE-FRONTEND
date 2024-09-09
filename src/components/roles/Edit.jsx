// CSS
import "../../css/roles/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Edit({ id }) {
    // STATES
    const [actions, setActions] = useState([]);
    const [filteredActions, setFilteredActions] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [nameDescriptive, setNameDescriptive] = useState("");
    const [description, setDescription] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedActions, setSelectedActions] = useState([]);

    // ZUSTAND
    const { editActions } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getActions();
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
        try {
            const { data } = await clientAxios.get("/role-action/actions");
            setActions(data);
            setFilteredActions(data);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const handleTypeChange = (e) => {
        const selected = e.target.value;
        setSelectedType(selected);
        if (selected) {
            setFilteredActions(
                actions.filter((action) => action.type === selected)
            );
        } else {
            setFilteredActions(actions);
        }
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

                <form onSubmit={handleSubmit}>
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
                            <option disabled={true} defaultChecked value="">
                                Todos los tipos
                            </option>
                            {[
                                ...new Set(
                                    actions.map((action) => action.type)
                                ),
                            ].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {actions.length === 0 ? (
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

                    <button className="createEditRole-button button">
                        Editar rol
                    </button>
                </form>
            </div>
        </>
    );
}
