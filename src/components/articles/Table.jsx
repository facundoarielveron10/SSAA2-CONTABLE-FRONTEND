// UTILS
import { formatBalance } from "src/utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    articles,
    onOpenDeleteArticleModal,
    handleActive,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Articulos</h2>
                </div>
                {articles.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún articulo disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio Unitario</th>
                                <th>Categoria</th>
                                <th>Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article._id}>
                                    <td>{article.name}</td>
                                    <td>{article.description}</td>
                                    <td>${formatBalance(article.unitPrice)}</td>
                                    <td>{article.category.name}</td>
                                    <td>{article.supplier.name}</td>
                                    <td>
                                        {article.active ? (
                                            <div className="table-actions">
                                                {canExecute("EDIT_ARTICLES") ? (
                                                    <a
                                                        href={`edit-article/${article._id}`}
                                                        className="table-button button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                                {canExecute(
                                                    "DELETE_ARTICLES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            onOpenDeleteArticleModal(
                                                                article
                                                            )
                                                        }
                                                        className="table-button table-delete button"
                                                    >
                                                        Eliminar
                                                    </button>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="table-actions">
                                                {canExecute(
                                                    "ACTIVE_ARTICLES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleActive(
                                                                article._id
                                                            )
                                                        }
                                                        className="table-button button"
                                                    >
                                                        Activar
                                                    </button>
                                                ) : null}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
