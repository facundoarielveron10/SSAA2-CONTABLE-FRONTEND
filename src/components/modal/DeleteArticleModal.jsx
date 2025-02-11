// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { formatBalance } from "src/utils/format";

export default function DeleteArticleModal({
    open,
    onCloseDeleteArticleModal,
    handleDeleteArticle,
    articleDelete,
}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseDeleteArticleModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteArticle}>
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar el articulo?
                    </h2>
                    {articleDelete ? (
                        <div className="modal-data">
                            <p>
                                Nombre: <span>{articleDelete?.name}</span>
                            </p>
                            <p>
                                Descripcion:{" "}
                                <span>{articleDelete?.description}</span>
                            </p>
                            <p className="modal-items">
                                Categorias:{" "}
                                {articleDelete?.categories?.map(
                                    (category, index) => (
                                        <span key={index}>{category}</span>
                                    )
                                )}
                            </p>
                            <p className="modal-items">
                                Proveedor:{" "}
                                {articleDelete?.suppliers?.map(
                                    (supplier, index) => (
                                        <span key={index}>{supplier}</span>
                                    )
                                )}
                            </p>
                        </div>
                    ) : null}
                    <button
                        type="submit"
                        className="button form-button form-submit modal-delete"
                    >
                        Eliminar Articulo
                    </button>
                </form>
            </Modal>
        </div>
    );
}
