// CSS
import "../../css/users/list.css";
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// MODAL
import { Modal } from "react-responsive-modal";

// UTILS
import { errorResponse } from "../../utils/error";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// COMPONENTS
import Spinner from "../Spinner";

export default function ListUser() {
    // ZUSTAND
    const { user, canExecute } = useLoginStore();

    // STATES
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState(false);
    const [changeRole, setChangeRole] = useState({});
    const [newRole, setNewRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // EFFECTS
    useEffect(() => {
        getUsers();
    }, []);

    // FUNCTIONS
    const getUsers = async () => {
        try {
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
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const onOpenChangeRoleModal = (user) => {
        setChangeRole(user);
        setNewRole("");
        setOpen(true);
    };

    const onCloseChangeRoleModal = () => {
        setChangeRole({});
        setNewRole("");
        setOpen(false);
    };

    const handleChangeRole = async (e) => {
        e.preventDefault();
        try {
            if (!canExecute("CHANGE_ROL")) {
                setError("No tienes permisos");
                setTimeout(() => {
                    setError("");
                }, 5000);
                return;
            }

            const { data: roleData } = await clientAxios.post(
                "/user/change-role",
                {
                    role: newRole,
                    userId: changeRole._id,
                }
            );

            setSuccess(roleData);
            onCloseChangeRoleModal();
            setTimeout(() => {
                setSuccess("");
            }, 5000);

            getUsers();
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="listUser-alert alert-container">
                {error ? <p className="alert alert-error">{error}</p> : null}
                {success ? (
                    <p className="alert alert-success">{success}</p>
                ) : null}
            </div>
            <div className="listUser">
                <h1 className="title">Listado de usuarios</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos lo usuarios registrados
                    en el sistema, donde tambien se puede cambiarle los roles a
                    los mismos
                </p>
                {users.length === 0 ? (
                    <div className="listUser-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="listUser-users">
                        <div className="listUser-list">
                            <h2 className="listUser-subtitle">
                                Administradores
                            </h2>
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
                                                    onClick={() =>
                                                        onOpenChangeRoleModal(
                                                            admin
                                                        )
                                                    }
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
                                                    onClick={() =>
                                                        onOpenChangeRoleModal(
                                                            user
                                                        )
                                                    }
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
                )}
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={onCloseChangeRoleModal}
                    center
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                        closeIcon: "customCloseIcon",
                    }}
                >
                    <form onSubmit={handleChangeRole}>
                        <h2 className="listUser-modal-title">
                            Cambiar el rol del usuario
                        </h2>
                        <p className="listUser-modal-user">
                            Usuario:{" "}
                            <span>
                                {changeRole.name} {changeRole.lastname}
                            </span>
                        </p>
                        <p className="listUser-modal-paragraph">
                            Selecciona el rol para el usuario
                        </p>
                        <select
                            className="listUser-modal-select"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option
                                disabled
                                className="listUser-modal-option"
                                value=""
                            >
                                -- Seleccionar Rol --
                            </option>
                            <option
                                disabled={
                                    changeRole?.role?.name === "Administrador"
                                }
                                className="listUser-modal-option"
                                value="ROLE_ADMIN"
                            >
                                Administrador
                            </option>
                            <option
                                disabled={changeRole?.role?.name === "Usuario"}
                                className="listUser-modal-option"
                                value="ROLE_USER"
                            >
                                Usuario
                            </option>
                        </select>
                        <button
                            type="submit"
                            className="listUser-modal-button button"
                        >
                            Cambiar
                        </button>
                    </form>
                </Modal>
            </div>
        </>
    );
}
