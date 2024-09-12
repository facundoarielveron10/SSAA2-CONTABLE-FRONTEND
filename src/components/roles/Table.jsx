// CSS
import "../../css/roles/create-edit.css";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ roles, onOpenDeleteRoleModal, handleActive }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="roles-list-container">
            <div className="roles-list">
                <h2 className="roles-subtitle">Roles</h2>
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
                                    {rol.active ? (
                                        <div className="roles-buttons">
                                            {canExecute("EDIT_ROLE") ? (
                                                <a
                                                    href={`edit-role/${rol._id}`}
                                                    className="roles-button-table roles-edit button"
                                                >
                                                    Editar
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                            {canExecute("DELETE_ROLE") &&
                                            rol.name !== "ROLE_ADMIN" &&
                                            rol.name !== "ROLE_USER" ? (
                                                <button
                                                    onClick={() =>
                                                        onOpenDeleteRoleModal(
                                                            rol
                                                        )
                                                    }
                                                    className="roles-button-table roles-delete button"
                                                >
                                                    Eliminar
                                                </button>
                                            ) : (
                                                "-"
                                            )}
                                        </div>
                                    ) : (
                                        <div className="roles-buttons">
                                            {canExecute("ACTIVE_ROLE") ? (
                                                <button
                                                    onClick={() =>
                                                        handleActive(rol._id)
                                                    }
                                                    className="roles-button-table button"
                                                >
                                                    Activar
                                                </button>
                                            ) : (
                                                "-"
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
