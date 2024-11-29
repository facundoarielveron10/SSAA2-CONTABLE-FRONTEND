// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getActions, getTypeActions } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import Action from "./Action";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Create() {
    // TYPES ACTIONS
    const types = getTypeActions();

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
        const getActionsData = async () => {
            setLoading(true);
            const data = await getActions(currentPage, limit, selectedType);
            setActions(data.actions);
            setTotalPages(data.totalPages);
            setFilteredActions(data.actions);
            setLoading(false);
        };

        getActionsData();
    }, [currentPage, selectedType]);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setNameDescriptive("");
        setDescription("");
        setSelectedType("");
        setSelectedActions([]);
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
            <div className="content">
                <h1 className="title">Creacion de Rol</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo rol,
                    donde el nombre descriptivo del rol es como se vera
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
                    {/* TIPO DE ACCIONES */}
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
                            {filteredActions.map((action) => (
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
                    <button className="form-button button">Crear rol</button>
                </form>
            </div>
        </>
    );
}
