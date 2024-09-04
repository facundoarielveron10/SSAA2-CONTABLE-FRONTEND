// CSS
import "../../css/roles/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Create() {
    // STATES
    const [actions, setActions] = useState([]);
    const [filteredActions, setFilteredActions] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("ROLE_");
    const [nameDescriptive, setNameDescriptive] = useState("");
    const [description, setDescription] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedActions, setSelectedActions] = useState([]);

    // EFFECTS
    useEffect(() => {
        getActions();
    }, []);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setNameDescriptive("");
        setDescription("");
        setSelectedType("");
        setSelectedActions([]);
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

        if (selectedActions.length <= 0) {
            setError("Tienes que seleccionar al menos una accion");

            setTimeout(() => {
                setError("");
            }, 5000);
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

            setSuccess(data);
            resetValues();
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
            <div className="createEdit alert-container">
                {error ? <p className="alert alert-error">{error}</p> : null}
                {success ? (
                    <p className="alert alert-success">{success}</p>
                ) : null}
            </div>
            <div className="createEdit">
                <h1 className="title">Creacion de Rol</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo rol,
                    donde el nombre descriptivo del rol es como se vera
                    reflejado en el sistema y finalmente selecciona las acciones
                    que podrá hacer este rol.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form">
                        {/* NOMBRE */}
                        <div className="form-group createEdit-group">
                            <label className="form-label" htmlFor="name">
                                Nombre del Rol
                            </label>
                            <input
                                className="form-input createEdit-input"
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
                        <div className="form-group createEdit-group">
                            <label
                                className="form-label"
                                htmlFor="nameDescriptive"
                            >
                                Nombre Descriptivo del Rol
                            </label>
                            <input
                                className="form-input createEdit-input"
                                type="text"
                                id="nameDescriptive"
                                value={nameDescriptive}
                                onChange={(e) =>
                                    setNameDescriptive(e.target.value)
                                }
                            />
                        </div>
                        {/* DESCRIPCIÓN DEL ROL */}
                        <div className="form-group createEdit-group">
                            <label className="form-label" htmlFor="description">
                                Descripción del Rol
                            </label>
                            <textarea
                                className="form-input createEdit-input"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="createEdit-typeRole">
                        <label className="createEdit-type-label" htmlFor="type">
                            Tipo de Acciones
                        </label>
                        <select
                            className="createEdit-type-select"
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
                        <div className="createEdit-spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="createEdit-actions">
                            {filteredActions.map((action) => (
                                <div
                                    key={action._id}
                                    className="createEdit-action"
                                >
                                    <input
                                        className="createEdit-checkbox"
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
                                        className="createEdit-description"
                                        htmlFor={action._id}
                                    >
                                        {action.description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className="createEdit-button button">
                        Crear rol
                    </button>
                </form>
            </div>
        </>
    );
}
