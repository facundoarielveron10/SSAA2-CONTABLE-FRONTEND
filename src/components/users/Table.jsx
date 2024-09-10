// CSS
import "../../css/users/users.css";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    title,
    rolName,
    users,
    onOpenChangeRoleModal,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="listUser-list">
            <h2 className="listUser-subtitle">{title}</h2>
            <table className="listUser-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        if (user.role.name === rolName) {
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.nameDescriptive}</td>
                                    <td className="listUser-actions">
                                        {canExecute("CHANGE_ROLE") ? (
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    onOpenChangeRoleModal(user)
                                                }
                                            >
                                                Cambiar Rol
                                            </button>
                                        ) : (
                                            "-"
                                        )}
                                        {canExecute("EDIT_USER") ? (
                                            <a
                                                href={`edit-user/${user._id}`}
                                                className="listUser-button-table button"
                                            >
                                                Editar
                                            </a>
                                        ) : null}
                                        {canExecute("DELETE_USER") ? (
                                            <button className="listUser-button-table listUser-delete button">
                                                Eliminar
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}
