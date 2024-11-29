// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import Modal from "react-responsive-modal";
import Table from "./Table";
import DeleteRoleModal from "../modal/DeleteRoleModal";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [roleDelete, setRoleDelete] = useState({});

    // ZUSTAND
    const { canExecute, user, logout } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            const data = await getRoles();
            setRoles(data);
        };

        getRolesData();
    }, []);

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

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de Roles</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Roles que existen en
                    el sistema, donde tambien se puede crear nuevos roles
                </p>
                {roles.length === 0 ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <Table
                        roles={roles}
                        onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                        handleActive={handleActive}
                    />
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
