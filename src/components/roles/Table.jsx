// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ roles, onOpenDeleteRoleModal, handleActive }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Roles</h2>
                </div>
                {roles.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún usuario disponible con este rol
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th className="table-head-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((rol) => (
                                <tr key={rol._id}>
                                    <td>{rol.name}</td>
                                    <td>{rol.description}</td>
                                    <td>
                                        {rol.active ? (
                                            <div className="table-actions">
                                                {canExecute("EDIT_ROLE") ? (
                                                    <a
                                                        href={`edit-role/${rol._id}`}
                                                        className="table-button button"
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
                                                        className="table-button table-delete button"
                                                    >
                                                        Eliminar
                                                    </button>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        ) : (
                                            <div className="table-actions">
                                                {canExecute("ACTIVE_ROLE") ? (
                                                    <button
                                                        onClick={() =>
                                                            handleActive(
                                                                rol._id
                                                            )
                                                        }
                                                        className="table-button button"
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
                )}
            </div>
        </div>
    );
}
