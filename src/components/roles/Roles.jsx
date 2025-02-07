// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import Table from "./Table";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import DeleteRoleModal from "../modal/DeleteRoleModal";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [roleDelete, setRoleDelete] = useState({});
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { canExecute, user, logout } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            setLoading(true);
            const data = await getRoles(currentPage, limit);
            setRoles(data.roles);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getRolesData();
    }, [currentPage]);

    // FUNCTIONS
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

            toast.success(data);
            if (roleDelete.name === user.role.name) {
                logout();
            }

            window.location.reload();
        } catch (error) {
            toast.error(errorResponse(error));
            setRoleDelete({});
        }
    };

    const handleActive = async (id) => {
        try {
            const { data } = await clientAxios.post(
                "/role-action/active-role",
                {
                    idRole: id,
                }
            );

            toast.success(data);

            await getRoles();
        } catch (error) {
            toast.error(errorResponse(error));
        }
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

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de Roles</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Roles que existen en
                    el sistema, donde tambien se puede crear nuevos roles
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Table
                            roles={roles}
                            onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                            handleActive={handleActive}
                        />
                        {roles.length > 0 ? (
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
            <DeleteRoleModal
                open={open}
                onCloseDeleteRoleModal={onCloseDeleteRoleModal}
                handleDeleteRole={handleDeleteRole}
                roleDelete={roleDelete}
            />
            {canExecute("CREATE_ROLE") ? (
                <a href="create-role" className="button-position button">
                    Crear Rol
                </a>
            ) : null}
        </>
    );
}
