// CSS
import "../../css/users/users.css";
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
import Table from "./Table";
import Pagination from "../Pagination";

// ALERTS
import toast from "react-hot-toast";
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Users() {
    // STATES
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userDelete, setUserDelete] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [changeRole, setChangeRole] = useState({});
    const [newRole, setNewRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);

    // ZUSTAND
    const { user, logout } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        getUsers(currentPage, selectedRole);
    }, [currentPage, selectedRole]);

    useEffect(() => {
        if (selectedRole) {
            const filtered = users.filter(
                (user) => user.role.name === selectedRole
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [selectedRole, users]);

    // FUNCTIONS
    const getUsers = async (page = 1, role = "") => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/user/users?page=${page}&limit=${limit}&role=${role}`
            );
            setUsers(data.users);
            setFilteredUsers(data.users);
            setTotalPages(Math.ceil(data.totalUsers / limit));
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const getRoles = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get("/role-action/roles");
            setRoles(data);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        setCurrentPage(1);
    };

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            await getUsers(nextPage);
        }
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
            await getUsers(previousPage);
        }
    };

    const onOpenChangeRoleModal = (user) => {
        setChangeRole(user);
        setNewRole("");
        setOpenChangeModal(true);
    };

    const onCloseChangeRoleModal = () => {
        setChangeRole({});
        setNewRole("");
        setOpenChangeModal(false);
    };

    const onOpenDeleteUserModal = (user) => {
        setOpenDeleteModal(true);
        setUserDelete(user);
    };

    const onCloseDeleteUserModal = () => {
        setOpenDeleteModal(false);
        setUserDelete({});
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

            toast.success(roleData);
            onCloseChangeRoleModal();

            await getUsers(currentPage, selectedRole);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleActive = async (id) => {
        try {
            const { data } = await clientAxios.post("/user/active-user", {
                idUser: id,
            });

            toast.success(data);

            await getUsers(currentPage, selectedRole);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleDeleteUser = async () => {
        try {
            const { data } = await clientAxios.post("/user/delete-user", {
                idUser: userDelete._id,
            });

            toast.success(data);
            onCloseDeleteUserModal();

            if (userDelete._id === user.id) {
                logout();
            }
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            <div className="listUser">
                <h1 className="title">Listado de usuarios</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos los usuarios registrados
                    en el sistema, donde también se puede cambiarle los roles a
                    los mismos.
                </p>

                {loading ? (
                    <div className="listUser-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="listUser-users">
                        <Table
                            users={filteredUsers}
                            onOpenChangeRoleModal={onOpenChangeRoleModal}
                            onOpenDeleteUserModal={onOpenDeleteUserModal}
                            handleRoleChange={handleRoleChange}
                            handleActive={handleActive}
                            selectedRole={selectedRole}
                            roles={roles}
                        />
                        {filteredUsers.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <div>
                <Modal
                    open={openChangeModal}
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
            <div>
                <Modal
                    open={openDeleteModal}
                    onClose={onCloseDeleteUserModal}
                    center
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                        closeIcon: "customCloseIcon",
                    }}
                >
                    <form onSubmit={handleDeleteUser}>
                        <h2 className="listUser-modal-title">
                            ¿Estás seguro de eliminar el Usuario?
                        </h2>
                        <div className="listUser-modal-user">
                            <p>
                                Nombre: <span>{userDelete.name}</span>
                            </p>
                            <p>
                                Apellido: <span>{userDelete.lastname}</span>
                            </p>
                            <p>
                                Email: <span>{userDelete.email}</span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="button listUser-delete listUser-modal-button"
                        >
                            Eliminar Usuario
                        </button>
                    </form>
                </Modal>
            </div>
            <a href="create-user" className="listUser-button button">
                Crear usuario
            </a>
        </>
    );
}
