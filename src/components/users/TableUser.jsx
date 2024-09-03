// CSS
import "../../css/users/list.css";

export default function TableUser({
    title,
    rolName,
    users,
    onOpenChangeRoleModal,
}) {
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
                                        <button
                                            className="button"
                                            onClick={() =>
                                                onOpenChangeRoleModal(user)
                                            }
                                        >
                                            Cambiar Rol
                                        </button>
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
