// MODAL
import Modal from "react-responsive-modal";

export default function DeleteCategoryModal({
    open,
    onCloseDeleteCategoryModal,
    handleDeleteCategory,
    categoryDelete,
}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseDeleteCategoryModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteCategory}>
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar la categoria?
                    </h2>
                    {categoryDelete ? (
                        <div className="modal-data">
                            <p>
                                Nombre: <span>{categoryDelete?.name}</span>
                            </p>
                            <p>
                                Descripcion:{" "}
                                <span>{categoryDelete?.description}</span>
                            </p>
                        </div>
                    ) : null}
                    <button
                        type="submit"
                        className="button form-button form-submit modal-delete"
                    >
                        Eliminar Categoria
                    </button>
                </form>
            </Modal>
        </div>
    );
}
