// MODAL
import Modal from "react-responsive-modal";

export default function DeleteUserModal({
    openDeleteModal,
    onCloseDeleteUserModal,
    handleDeleteUser,
    user,
}) {
    return (
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
                            Nombre: <span>{user.name}</span>
                        </p>
                        <p>
                            Apellido: <span>{user.lastname}</span>
                        </p>
                        <p>
                            Email: <span>{user.email}</span>
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
    );
}
