// MODAL
import Modal from "react-responsive-modal";

export default function DeleteRoleModal({
    open,
    onCloseDeleteRoleModal,
    handleDeleteRole,
    roleDelete,
}) {
    return (
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
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar el rol?
                    </h2>
                    <div className="modal-data">
                        <p>
                            Nombre: <span>{roleDelete.name}</span>
                        </p>
                        <p>
                            Nombre descriptivo:{" "}
                            <span>{roleDelete.nameDescriptive}</span>
                        </p>
                        <p>
                            Descripcion: <span>{roleDelete.description}</span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="button form-button form-submit modal-delete"
                    >
                        Eliminar Rol
                    </button>
                </form>
            </Modal>
        </div>
    );
}
