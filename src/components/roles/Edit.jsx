// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getActions, getTypeActions } from "../../utils/getData";
import { haveArraysChanged } from "../../utils/utils.js";

// COMPONENTS
import Spinner from "../Spinner.jsx";
import Action from "./Action.jsx";
import Pagination from "../Pagination.jsx";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert.jsx";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Edit({ id }) {
    // TYPES ACTIONS
    const types = getTypeActions();

    // STATES
    const [actions, setActions] = useState([]);
    const [role, setRole] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5);
    const [name, setName] = useState("");
    const [nameDescriptive, setNameDescriptive] = useState("");
    const [description, setDescription] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedActionsOriginal, setSelectedActionsOriginal] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { editActions } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getActionsData = async () => {
            setLoading(true);
            const data = await getActions(currentPage, limit, selectedType);
            setActions(data.actions);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getActionsData();
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
                (roleAction) => roleAction?.action?.name
            );

            setRole(role);
            setName(role.name);
            setNameDescriptive(role.nameDescriptive);
            setDescription(role.description);
            setSelectedActions(actionNames);
            setSelectedActionsOriginal(actionNames);
        } catch (error) {
            toast.error(errorResponse(error));
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
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            !haveArraysChanged(selectedActionsOriginal, selectedActions) &&
            name === role.name &&
            nameDescriptive === role.nameDescriptive &&
            description === role.description
        ) {
            toast.error("No se han realizado cambios");
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

            toast.success(data);
            editActions(id, selectedActions);
            getRoleActions();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Edicion de rol</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar el
                    rol, donde el nombre descriptivo del rol es como se vera
                    reflejado en el sistema y finalmente selecciona las acciones
                    que podrá hacer este rol.
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    {/* NOMBRE */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nombre del Rol
                        </label>
                        <input
                            className="form-input"
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
                    <div className="form-group">
                        <label className="form-label" htmlFor="nameDescriptive">
                            Nombre Descriptivo del Rol
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="nameDescriptive"
                            value={nameDescriptive}
                            onChange={(e) => setNameDescriptive(e.target.value)}
                        />
                    </div>
                    {/* DESCRIPCIÓN DEL ROL */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">
                            Descripción del Rol
                        </label>
                        <textarea
                            className="form-input"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="type">
                            Tipo de Acciones
                        </label>
                        <select
                            className="form-select"
                            id="type"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <option defaultChecked value="">
                                Todos los tipos
                            </option>
                            {types.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {actions.length === 0 || loading ? (
                        <div className="spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="actions">
                            {actions.map((action) => (
                                <Action
                                    key={action._id}
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
                    <button type="submit" className="form-button button">
                        Editar rol
                    </button>
                </form>
            </div>
        </>
    );
}
