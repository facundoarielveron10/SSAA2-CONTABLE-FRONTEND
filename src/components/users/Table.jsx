// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    users,
    onOpenChangeRoleModal,
    onOpenDeleteUserModal,
    onOpenDenyUserModal,
    handleRoleChange,
    handleActive,
    handleConfirmAdmin,
    selectedRole,
    roles,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table">
            <div className="table-header">
                <h2 className="table-subtitle">Usuarios</h2>
                <div className="table-filter">
                    <select
                        className="form-select"
                        id="roleFilter"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">Todos los roles</option>
                        {roles?.map((role) => (
                            <option key={role._id} value={role.name}>
                                {role.nameDescriptive}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {users.length === 0 ? (
                <p className="table-no-data">
                    No hay ningún usuario disponible con este rol
                </p>
            ) : (
                <table className="table-content">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th className="table-head-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role.nameDescriptive}</td>
                                <td>
                                    {user.active ? (
                                        <div>
                                            {!user.adminConfirmed ? (
                                                canExecute("CONFIRM_USER") ? (
                                                    <div className="table-actions">
                                                        <button
                                                            className="table-button button"
                                                            onClick={() =>
                                                                handleConfirmAdmin(
                                                                    user._id,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <button
                                                            className="table-button table-delete button"
                                                            onClick={() =>
                                                                onOpenDenyUserModal(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Denegar
                                                        </button>
                                                    </div>
                                                ) : null
                                            ) : (
                                                <div className="table-actions">
                                                    {canExecute(
                                                        "CHANGE_ROLE"
                                                    ) ? (
                                                        <button
                                                            className="table-button button"
                                                            onClick={() =>
                                                                onOpenChangeRoleModal(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Cambiar Rol
                                                        </button>
                                                    ) : null}
                                                    {canExecute("EDIT_USER") ? (
                                                        <a
                                                            href={`edit-user/${user._id}`}
                                                            className="table-button button"
                                                        >
                                                            Editar
                                                        </a>
                                                    ) : null}
                                                    {canExecute(
                                                        "DELETE_USER"
                                                    ) ? (
                                                        <button
                                                            onClick={() =>
                                                                onOpenDeleteUserModal(
                                                                    user
                                                                )
                                                            }
                                                            className="table-button table-delete button"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="table-actions">
                                            {canExecute("ACTIVE_USER") ? (
                                                <button
                                                    className="table-button button"
                                                    onClick={() =>
                                                        handleActive(user._id)
                                                    }
                                                >
                                                    Activar
                                                </button>
                                            ) : null}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
