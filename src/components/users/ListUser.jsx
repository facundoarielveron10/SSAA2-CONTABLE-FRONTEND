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

// COMPONENTS
import Spinner from "../Spinner";
import TableUser from "./TableUser";

export default function ListUser() {
    // STATES
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [changeRole, setChangeRole] = useState({});
    const [newRole, setNewRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // EFFECTS
    useEffect(() => {
        getUsers();
        getRoles();
    }, []);

    // FUNCTIONS
    const getUsers = async () => {
        try {
            const { data } = await clientAxios.get("/user/users");

            setUsers(data);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

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

            await getUsers();
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
                {users.length === 0 || roles.length === 0 ? (
                    <div className="listUser-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="listUser-users">
                        {roles.map((rol) => (
                            <TableUser
                                key={rol._id}
                                title={rol.nameDescriptive}
                                rolName={rol.name}
                                users={users}
                                onOpenChangeRoleModal={onOpenChangeRoleModal}
                            />
                        ))}
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
                            {roles.length > 0
                                ? roles.map((rol) => (
                                      <option
                                          key={rol._id}
                                          className="listUser-modal-option"
                                          value={rol.name}
                                      >
                                          {rol.nameDescriptive}
                                      </option>
                                  ))
                                : null}
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
