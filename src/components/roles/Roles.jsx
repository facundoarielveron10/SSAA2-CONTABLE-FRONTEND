// CSS
import "../../css/roles/roles.css";
import "react-responsive-modal/styles.css";

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

// MODAL
import Modal from "react-responsive-modal";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [open, setOpen] = useState(false);
    const [roleDelete, setRoleDelete] = useState({});

    // ZUSTAND
    const { canExecute, user, logout } = useLoginStore();

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

    const onOpenDeleteRoleModal = (rol) => {
        setOpen(true);
        setRoleDelete(rol);
    };

    const onCloseDeleteRoleModal = () => {
        setOpen(false);
        setRoleDelete({});
    };

    const handleDeleteRole = async () => {
        try {
            const { data } = await clientAxios.post(
                "/role-action/delete-role",
                {
                    idRole: roleDelete._id,
                }
            );

            setSuccess(data);

            if (roleDelete.name === user.role.name) {
                logout();
            }

            setRoleDelete({});
            window.location.reload();
        } catch (error) {
            setError(errorResponse(error));
            setRoleDelete({});
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="roles-alert alert-container">
                {error ? <p className="alert alert-error">{error}</p> : null}
                {success ? (
                    <p className="alert alert-success">{success}</p>
                ) : null}
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
                                                <div className="roles-buttons">
                                                    {canExecute("EDIT_ROLE") ? (
                                                        <a
                                                            href={`edit-role/${rol._id}`}
                                                            className="roles-button roles-edit button"
                                                        >
                                                            Editar
                                                        </a>
                                                    ) : null}
                                                    {canExecute(
                                                        "DELETE_ROLE"
                                                    ) &&
                                                    rol.name !== "ROLE_ADMIN" &&
                                                    rol.name !== "ROLE_USER" ? (
                                                        <button
                                                            onClick={() =>
                                                                onOpenDeleteRoleModal(
                                                                    rol
                                                                )
                                                            }
                                                            className="roles-button roles-delete button"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    ) : null}
                                                </div>
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
                    onClose={onCloseDeleteRoleModal}
                    center
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                        closeIcon: "customCloseIcon",
                    }}
                >
                    <form onSubmit={handleDeleteRole}>
                        <h2 className="roles-modal-title">
                            ¿Estas seguro de eliminar el rol?
                        </h2>
                        <div className="roles-modal-rol">
                            <p>
                                Nombre: <span>{roleDelete.name}</span>
                            </p>
                            <p>
                                Nombre descriptivo:{" "}
                                <span>{roleDelete.nameDescriptive}</span>
                            </p>
                            <p>
                                Descripcion:{" "}
                                <span>{roleDelete.description}</span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="button roles-delete roles-modal-button"
                        >
                            Eliminar Rol
                        </button>
                    </form>
                </Modal>
            </div>
        </>
    );
}
