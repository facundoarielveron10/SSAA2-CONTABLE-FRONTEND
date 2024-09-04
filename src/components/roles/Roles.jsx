// CSS
import "../../css/roles/roles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getRoles();
    }, []);

    // FUNCTIONS
    const getRoles = async () => {
        try {
            const { data } = await clientAxios.get("/role-action/roles");

            setRoles(data);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="roles-alert alert-container">
                {error ? <p className="alert alert-error">{error}</p> : null}
            </div>
            <div className="roles">
                <h1 className="title">Listado de Roles</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Roles que existen en
                    el sistema, donde tambien se puede crear nuevos roles
                </p>
                {roles.length === 0 ? (
                    <div className="roles-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="roles-list-container">
                        <div className="roles-list">
                            <div className="roles-header">
                                <h2 className="roles-subtitle">Roles</h2>
                                <div className="roles-button-container">
                                    {canExecute("CREATE_ROLE") ? (
                                        <a
                                            href="create-role"
                                            className="roles-button button"
                                        >
                                            Crear Rol
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                            <table className="roles-table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((rol) => (
                                        <tr key={rol._id}>
                                            <td>{rol.name}</td>
                                            <td>{rol.description}</td>
                                            <td>
                                                {canExecute("EDIT_ROLE") ? (
                                                    <a
                                                        href={`edit-role/${rol._id}`}
                                                        className="roles-button button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
