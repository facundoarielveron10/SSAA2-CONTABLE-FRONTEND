// CSS
import "../../css/roles/roles.css";
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import toast from "react-hot-toast";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import Modal from "react-responsive-modal";
import Table from "./Table";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
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
            toast.error(errorResponse(error));
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
                    <Table
                        roles={roles}
                        onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                        handleActive={handleActive}
                    />
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
            {canExecute("CREATE_ROLE") ? (
                <a href="create-role" className="roles-button button">
                    Crear Rol
                </a>
            ) : null}
        </>
    );
}
