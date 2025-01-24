// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles, getUsers } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table";
import Pagination from "../Pagination";
import Search from "../Search";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import ChangeRoleModal from "../modal/ChangeRoleModal";
import DeleteUserModal from "../modal/DeleteUserModal";
import DenyUserModal from "../modal/DenyUserModal";

export default function Users() {
    // STATES
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userDelete, setUserDelete] = useState({});
    const [userDeny, setUserDeny] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openDenyModal, setOpenDenyModal] = useState(false);
    const [changeRole, setChangeRole] = useState({});
    const [newRole, setNewRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");

    // ZUSTAND
    const { user, logout, canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            setLoading(true);
            const data = await getRoles();
            setRoles(data.roles);
            setLoading(false);
        };

        getRolesData();
    }, []);

    useEffect(() => {
        const getUsersData = async () => {
            setLoading(true);
            const data = await getUsers(currentPage, limit, selectedRole);
            setUsers(data.users);
            setFilteredUsers(data.users);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getUsersData();
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
    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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

    const onOpenDenyUserModal = (user) => {
        setOpenDenyModal(true);
        setUserDeny(user);
    };

    const onCloseDenyUserModal = () => {
        setOpenDenyModal(false);
        setUserDeny({});
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

            await getUsers();
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

            await getUsers();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleConfirmAdmin = async (id, confirmUser) => {
        try {
            const { data } = await clientAxios.post("/user/confirm-admin", {
                idUser: id,
                confirmUser,
            });

            toast.success(data);

            await getUsers();
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

    const handleSearch = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                `/user/search-users?page=${currentPage}&limit=${limit}&role=${selectedRole}`,
                {
                    search,
                }
            );
            setUsers(data.users);
            setFilteredUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
            setSearch("");
        }
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de usuarios</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos los usuarios registrados
                    en el sistema, donde también se puede cambiarle los roles a
                    los mismos.
                </p>

                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="table-container">
                        <Search
                            handleSearch={handleSearch}
                            handleClean={getUsers}
                            search={search}
                            setSearch={setSearch}
                        />
                        <Table
                            users={filteredUsers}
                            onOpenChangeRoleModal={onOpenChangeRoleModal}
                            onOpenDeleteUserModal={onOpenDeleteUserModal}
                            onOpenDenyUserModal={onOpenDenyUserModal}
                            handleRoleChange={handleRoleChange}
                            handleActive={handleActive}
                            handleConfirmAdmin={handleConfirmAdmin}
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
            <ChangeRoleModal
                openChangeModal={openChangeModal}
                onCloseChangeRoleModal={onCloseChangeRoleModal}
                handleChangeRole={handleChangeRole}
                role={changeRole}
                roles={roles}
                newRole={newRole}
                setNewRole={setNewRole}
            />
            <DeleteUserModal
                openDeleteModal={openDeleteModal}
                onCloseDeleteUserModal={onCloseDeleteUserModal}
                handleDeleteUser={handleDeleteUser}
                user={userDelete}
            />
            <DenyUserModal
                openDenyModal={openDenyModal}
                onCloseDenyUserModal={onCloseDenyUserModal}
                handleConfirmAdmin={handleConfirmAdmin}
                user={userDeny}
            />
            {canExecute("CREATE_USER") ? (
                <a href="create-user" className="button-position button">
                    Crear usuario
                </a>
            ) : null}
        </>
    );
}
