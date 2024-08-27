// CSS
import "../../css/users/list.css";
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// MODAL
import { Modal } from "react-responsive-modal";

export default function List({ user }) {
    // STATES
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState(false);

    // EFFECTS
    useEffect(() => {
        getUsers();
    }, []);

    // FUNCTIONS
    const getUsers = async () => {
        const { data } = await clientAxios.get(`/user/users/${user.id}`);

        const formattedData = data.map((userData) => {
            if (userData.role.name === "ROLE_ADMIN") {
                return {
                    ...userData,
                    role: { ...userData.role, name: "Administrador" },
                };
            }
            if (userData.role.name === "ROLE_USER") {
                return {
                    ...userData,
                    role: { ...userData.role, name: "Usuario" },
                };
            }
            return userData;
        });

        const filterAdmin = formattedData.filter(
            (userData) => userData.role.name === "Administrador"
        );
        const filterUser = formattedData.filter(
            (userData) => userData.role.name === "Usuario"
        );

        setAdmins(filterAdmin);
        setUsers(filterUser);
    };

    const onOpenModal = () => setOpen(true);

    const onCloseModal = () => setOpen(false);

    return (
        <>
            <div className="listUser">
                <h1 className="listUser-title">Listado de usuarios</h1>
                <div className="listUser-users">
                    <div className="listUser-list">
                        <h2 className="listUser-subtitle">Administradores</h2>
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
                                {admins.map((admin) => (
                                    <tr key={admin._id}>
                                        <td>{admin.name}</td>
                                        <td>{admin.lastname}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.role.name}</td>
                                        <td className="listUser-actions">
                                            <button
                                                className="button"
                                                onClick={onOpenModal}
                                            >
                                                Cambiar Rol
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="listUser-list">
                        <h2 className="listUser-subtitle">Usuarios</h2>
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
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td className="listUser-actions">
                                            <button
                                                className="button"
                                                onClick={onOpenModal}
                                            >
                                                Cambiar Rol
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={onCloseModal}
                    center
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                        closeIcon: "customCloseIcon",
                    }}
                >
                    <h2 className="listUser-modal-title">
                        Cambiar el rol del usuario
                    </h2>
                    <p className="listUser-modal-paragraph">
                        Selecciona el rol para el usuario
                    </p>
                    <select className="listUser-modal-select">
                        <option className="listUser-modal-option" value="admin">
                            Administrador
                        </option>
                        <option className="listUser-modal-option" value="user">
                            Usuario
                        </option>
                    </select>
                    <button className="listUser-modal-button button">
                        Cambiar
                    </button>
                </Modal>
            </div>
        </>
    );
}
