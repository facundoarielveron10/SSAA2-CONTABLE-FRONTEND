// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { formatBalance } from "src/utils/format";

export default function DeleteSupplierModal({
    open,
    onCloseDeleteSupplierModal,
    handleDeleteSupplier,
    supplierDelete,
}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseDeleteSupplierModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteSupplier}>
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar el proveedor?
                    </h2>
                    {supplierDelete ? (
                        <div className="modal-data">
                            <p>
                                Nombre: <span>{supplierDelete?.name}</span>
                            </p>
                            <p>
                                Direccion:{" "}
                                <span>{supplierDelete?.address}</span>
                            </p>
                            <p>
                                Telefono: <span>{supplierDelete?.phone}</span>
                            </p>
                            <p>
                                Email: <span>{supplierDelete?.email}</span>
                            </p>
                        </div>
                    ) : null}
                    <button
                        type="submit"
                        className="button form-button form-submit modal-delete"
                    >
                        Eliminar Proveedor
                    </button>
                </form>
            </Modal>
        </div>
    );
}
