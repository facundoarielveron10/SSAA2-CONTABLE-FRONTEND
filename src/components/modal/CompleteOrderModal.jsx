// MODAL
import Modal from "react-responsive-modal";

export default function CompleteOrderModal({
    openCompleteOrderModal,
    onCloseCompleteOrderModal,
    handleCompleteOrder,
}) {
    return (
        <div>
            <Modal
                open={openCompleteOrderModal}
                onClose={onCloseCompleteOrderModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleCompleteOrder}>
                    <h2 className="modal-title">
                        Completar una orden de compra
                    </h2>
                    <div className="modal-data">
                        <p>¿Estas seguro de completar la orden de compra?</p>
                    </div>

                    <button
                        type="submit"
                        className="form-button form-submit button"
                    >
                        Completar
                    </button>
                </form>
            </Modal>
        </div>
    );
}
