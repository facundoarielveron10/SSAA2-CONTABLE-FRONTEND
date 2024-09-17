// MODAL
import Modal from "react-responsive-modal";

export default function DenyUserModal({
    openDenyModal,
    onCloseDenyUserModal,
    handleConfirmAdmin,
    user,
}) {
    return (
        <div>
            <Modal
                open={openDenyModal}
                onClose={onCloseDenyUserModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={() => handleConfirmAdmin(user._id, false)}>
                    <h2 className="listUser-modal-title">
                        ¿Estás seguro de denegar el Usuario?
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
                        Denegar Usuario
                    </button>
                </form>
            </Modal>
        </div>
    );
}
